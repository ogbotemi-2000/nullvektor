!function() {
    "use strict";
    function e(e, n) {
        return function(e) {
            if (Array.isArray(e))
                return e
        }(e) || function(e, t) {
            var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null == n)
                return;
            var i, r, a = [], o = !0, s = !1;
            try {
                for (n = n.call(e); !(o = (i = n.next()).done) && (a.push(i.value),
                !t || a.length !== t); o = !0)
                    ;
            } catch (e) {
                s = !0,
                r = e
            } finally {
                try {
                    o || null == n.return || n.return()
                } finally {
                    if (s)
                        throw r
                }
            }
            return a
        }(e, n) || function(e, n) {
            if (!e)
                return;
            if ("string" == typeof e)
                return t(e, n);
            var i = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === i && e.constructor && (i = e.constructor.name);
            if ("Map" === i || "Set" === i)
                return Array.from(e);
            if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
                return t(e, n)
        }(e, n) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function t(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, i = new Array(t); n < t; n++)
            i[n] = e[n];
        return i
    }
    function n(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    var a = function() {
        function t(e, i, a) {
            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            n(this, t),
            r(this, "gl", void 0),
            r(this, "type", void 0),
            r(this, "value", void 0),
            r(this, "typeFn", void 0),
            r(this, "_typeMap", {
                float: "1f",
                int: "1i",
                vec2: "2fv",
                vec3: "3fv",
                vec4: "4fv",
                mat4: "Matrix4fv"
            }),
            Object.assign(this, o),
            this.gl = e,
            this.type = i,
            this.value = a,
            this.typeFn = this._typeMap[this.type] || this._typeMap.float,
            this.update()
        }
        var a, o, s;
        return a = t,
        (o = [{
            key: "update",
            value: function(e) {
                if (this.value) {
                    var t = this.value
                      , n = null;
                    0 === this.typeFn.indexOf("Matrix") && (t = this.transpose,
                    n = this.value),
                    this.gl.getContext()["uniform".concat(this.typeFn)](e, t, n)
                }
            }
        }, {
            key: "getDeclaration",
            value: function(t, n, i) {
                if (this.excludeFrom !== n) {
                    if ("array" === this.type)
                        return "".concat(this.value[0].getDeclaration(t, n, this.value.length), "\nconst int ").concat(t, "_length = ").concat(this.value.length, ";");
                    if ("struct" === this.type) {
                        var r = t.replace("u_", "");
                        r = r.charAt(0).toUpperCase() + r.slice(1);
                        var a = Object.entries(this.value).map((function(t) {
                            var i = e(t, 2)
                              , r = i[0];
                            return i[1].getDeclaration(r, n).replace(/^uniform/, "")
                        }
                        )).join("");
                        return "uniform struct ".concat(r, " {\n    ").concat(a, "\n} ").concat(t).concat(i > 0 ? "[".concat(i, "]") : "", ";")
                    }
                    return "uniform ".concat(this.type, " ").concat(t).concat(i > 0 ? "[".concat(i, "]") : "", ";")
                }
            }
        }]) && i(a.prototype, o),
        s && i(a, s),
        Object.defineProperty(a, "prototype", {
            writable: !1
        }),
        t
    }();
    function o(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    function s(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    var l = function() {
        function e(t, n, i) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            s(this, "_class", e),
            s(this, "_canvas", void 0),
            s(this, "_context", void 0),
            s(this, "commonUniforms", {}),
            s(this, "meshes", []),
            this.setCanvas(t);
            var r = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            this.commonUniforms = {
                projectionMatrix: new a(this,"mat4",r),
                modelViewMatrix: new a(this,"mat4",r),
                resolution: new a(this,"vec2",[1, 1]),
                aspectRatio: new a(this,"float",1)
            },
            this.setSize(n, i)
        }
        var t, n, i;
        return t = e,
        n = [{
            key: "setCanvas",
            value: function(e) {
                this._canvas = e,
                this._context = e.getContext("webgl", {
                    antialias: !0
                })
            }
        }, {
            key: "getCanvas",
            value: function() {
                return this._canvas
            }
        }, {
            key: "getContext",
            value: function() {
                return this._context
            }
        }, {
            key: "setSize",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 640
                  , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 480;
                this.getCanvas().width = e,
                this.getCanvas().height = t,
                this.getContext().viewport(0, 0, e, t),
                this.commonUniforms.resolution.value = [e, t],
                this.commonUniforms.aspectRatio.value = e / t
            }
        }, {
            key: "setOrthographicCamera",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                  , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                  , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                  , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -2e3
                  , r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2e3;
                this.commonUniforms.projectionMatrix.value = [2 / this.getCanvas().width, 0, 0, 0, 0, 2 / this.getCanvas().height, 0, 0, 0, 0, 2 / (i - r), 0, e, t, n, 1]
            }
        }, {
            key: "render",
            value: function() {
                this.getContext().clearColor(0, 0, 0, 0),
                this.getContext().clearDepth(1),
                this.meshes.forEach((function(e) {
                    e.draw()
                }
                ))
            }
        }],
        n && o(t.prototype, n),
        i && o(t, i),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    function c(e, t) {
        return function(e) {
            if (Array.isArray(e))
                return e
        }(e) || function(e, t) {
            var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null == n)
                return;
            var i, r, a = [], o = !0, s = !1;
            try {
                for (n = n.call(e); !(o = (i = n.next()).done) && (a.push(i.value),
                !t || a.length !== t); o = !0)
                    ;
            } catch (e) {
                s = !0,
                r = e
            } finally {
                try {
                    o || null == n.return || n.return()
                } finally {
                    if (s)
                        throw r
                }
            }
            return a
        }(e, t) || function(e, t) {
            if (!e)
                return;
            if ("string" == typeof e)
                return u(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n)
                return Array.from(e);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return u(e, t)
        }(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function u(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, i = new Array(t); n < t; n++)
            i[n] = e[n];
        return i
    }
    function h(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function v(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    function b(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    var d = function() {
        function e(t, n, i) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
              , a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
            h(this, e),
            b(this, "gl", void 0),
            b(this, "uniformInstances", []),
            Object.assign(this, a),
            this.gl = t,
            this.uniforms = r;
            var o = this.gl.getContext()
              , s = "\n            precision highp float;\n        ";
            this.vertexSource = "\n            ".concat(s, "\n            attribute vec4 position;\n            attribute vec2 uv;\n            attribute vec2 uvNorm;\n            ").concat(this._getUniformVariableDeclarations(this.gl.commonUniforms, "vertex"), "\n            ").concat(this._getUniformVariableDeclarations(r, "vertex"), "\n            ").concat(n, "\n        "),
            this.Source = "\n            ".concat(s, "\n            ").concat(this._getUniformVariableDeclarations(this.gl.commonUniforms, "fragment"), "\n            ").concat(this._getUniformVariableDeclarations(r, "fragment"), "\n            ").concat(i, "\n        "),
            this.vertexShader = this._getShaderByType(o.VERTEX_SHADER, this.vertexSource),
            this.fragmentShader = this._getShaderByType(o.FRAGMENT_SHADER, this.Source),
            this.program = o.createProgram(),
            o.attachShader(this.program, this.vertexShader),
            o.attachShader(this.program, this.fragmentShader),
            o.linkProgram(this.program),
            o.getProgramParameter(this.program, o.LINK_STATUS) || console.error(o.getProgramInfoLog(this.program)),
            o.useProgram(this.program),
            this.attachUniforms(void 0, this.gl.commonUniforms),
            this.attachUniforms(void 0, this.uniforms)
        }
        var t, n, i;
        return t = e,
        (n = [{
            key: "_getShaderByType",
            value: function(e, t) {
                var n = this.gl.getContext()
                  , i = n.createShader(e);
                return n.shaderSource(i, t),
                n.compileShader(i),
                n.getShaderParameter(i, n.COMPILE_STATUS) || console.error(n.getShaderInfoLog(i)),
                i
            }
        }, {
            key: "_getUniformVariableDeclarations",
            value: function(e, t) {
                return Object.entries(e).map((function(e) {
                    var n = c(e, 2)
                      , i = n[0];
                    return n[1].getDeclaration(i, t)
                }
                )).join("\n")
            }
        }, {
            key: "attachUniforms",
            value: function(e, t) {
                var n = this;
                e ? "array" === t.type ? t.value.forEach((function(t, i) {
                    n.attachUniforms("".concat(e, "[").concat(i, "]"), t)
                }
                )) : "struct" === t.type ? Object.entries(t.value).forEach((function(t) {
                    var i = c(t, 2)
                      , r = i[0]
                      , a = i[1];
                    n.attachUniforms("".concat(e, ".").concat(r), a)
                }
                )) : this.uniformInstances.push({
                    uniform: t,
                    location: this.gl.getContext().getUniformLocation(this.program, e)
                }) : Object.entries(t).forEach((function(e) {
                    var t = c(e, 2)
                      , i = t[0]
                      , r = t[1];
                    n.attachUniforms(i, r)
                }
                ))
            }
        }]) && v(t.prototype, n),
        i && v(t, i),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    function f(e, t) {
        return function(e) {
            if (Array.isArray(e))
                return e
        }(e) || function(e, t) {
            var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null == n)
                return;
            var i, r, a = [], o = !0, s = !1;
            try {
                for (n = n.call(e); !(o = (i = n.next()).done) && (a.push(i.value),
                !t || a.length !== t); o = !0)
                    ;
            } catch (e) {
                s = !0,
                r = e
            } finally {
                try {
                    o || null == n.return || n.return()
                } finally {
                    if (s)
                        throw r
                }
            }
            return a
        }(e, t) || function(e, t) {
            if (!e)
                return;
            if ("string" == typeof e)
                return g(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n)
                return Array.from(e);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return g(e, t)
        }(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function g(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, i = new Array(t); n < t; n++)
            i[n] = e[n];
        return i
    }
    function m(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function y(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    function p(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    var x = function() {
        function e(t, n, i) {
            var r = this
              , a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            m(this, e),
            p(this, "gl", void 0),
            p(this, "wireframe", !1),
            p(this, "attributeInstances", []),
            Object.assign(this, a),
            this.geometry = n,
            this.material = i,
            this.gl = t,
            Object.entries(this.geometry.attributes).forEach((function(e) {
                var t = f(e, 2)
                  , n = t[0]
                  , i = t[1];
                r.attributeInstances.push({
                    attribute: i,
                    location: i.attach(n, r.material.program)
                })
            }
            )),
            this.gl.meshes.push(this)
        }
        var t, n, i;
        return t = e,
        (n = [{
            key: "draw",
            value: function() {
                var e = this.gl.getContext();
                e.useProgram(this.material.program),
                this.material.uniformInstances.forEach((function(e) {
                    var t = e.uniform
                      , n = e.location;
                    t.update(n)
                }
                )),
                this.attributeInstances.forEach((function(e) {
                    var t = e.attribute
                      , n = e.location;
                    t.use(n)
                }
                ));
                var t = this.wireframe ? e.LINES : e.TRIANGLES;
                e.drawElements(t, this.geometry.attributes.index.values.length, e.UNSIGNED_SHORT, 0)
            }
        }, {
            key: "remove",
            value: function() {
                var e = this;
                this.gl.meshes = this.gl.meshes.filter((function(t) {
                    return t != e
                }
                ))
            }
        }]) && y(t.prototype, n),
        i && y(t, i),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    function w(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function C(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    function _(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    var S = function() {
        function e(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            w(this, e),
            _(this, "gl", void 0),
 
