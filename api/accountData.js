let config   =  require("../config.json"),
    { neon } = require('@neondatabase/serverless'),
    data     = {};

module.exports = function(request, response) {
  /** may be replaced with the functionality of dotenv.config for a .env file */
  let { PGDATABASE, PGHOST, PGPASSWORD, PGUSER } = config;
  let { pooled, query } = request.body;

  data.result='', data.errors = [], pooled&&(PGHOST=PGHOST.replace('.', '-pooler.'));
  let sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`), i=0;
    
  if(query = query.replace(/\++/g, '\t')) sql(query).then(arr=>{
    data.result = arr
  }).catch(err=>data.errors[0] = [`Query: \`${query.split(/\s/).shift()}\`, severity: ${err.severity} at position \`${err.position}\` for operation \`${err.routine}\` - ${err.message}`, 'Be sure that the fields and/or tables you try to run queries on are created prior'])
  .finally(_=>response.json(data));

  else 
    ['version', 'inet_server_addr', 'inet_server_port'].forEach((query, _, a)=>{
      sql(`select ${query}()`).then(arr=>{
        data[query.replace('inet_', '')] = arr[0][query]
      })
      .catch(err=>data.errors[0] = ['::DATABASE CONNECTION:: '+(data.version=err.message), 'Connect to the internet and remove typos in the environment variables for connecting the database'])
      .finally(_=>{
        if(++i==a.length) data.version = "VERSION • " + data.version,
          ['PGHOST', 'PGPASSWORD', 'PGDATABASE', 'PGUSER'].forEach(field=>(!/password/i.test(field)&&(data[field] = config[field]), config[field])
          ||data.errors.push([`::${field}:: No ${field.replace('PG','').toLowerCase()} specified in server config.json`, `Provide a valid value for the \`${field}\` variable`])),
          response.json(data)
      })
    })
}