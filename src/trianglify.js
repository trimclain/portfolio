(function (e) {
    if ('object' == typeof exports && 'undefined' != typeof module)
        module.exports = e();
    else if ('function' == typeof define && define.amd) define([], e);
    else {
        var f;
        (f =
            'undefined' == typeof window
                ? 'undefined' == typeof global
                    ? 'undefined' == typeof self
                        ? this
                        : self
                    : global
                : window),
            (f.Trianglify = e());
    }
})(function () {
    var e,
        f = Math.sqrt,
        d = Math.abs,
        a = Math.min,
        n = Math.max,
        l = Math.floor;
    return (function d(c, e, t) {
        function f(s, n) {
            if (!e[s]) {
                if (!c[s]) {
                    var i = 'function' == typeof require && require;
                    if (!n && i) return i(s, !0);
                    if (r) return r(s, !0);
                    var a = new Error("Cannot find module '" + s + "'");
                    throw ((a.code = 'MODULE_NOT_FOUND'), a);
                }
                var o = (e[s] = { exports: {} });
                c[s][0].call(
                    o.exports,
                    function (d) {
                        var e = c[s][1][d];
                        return f(e ? e : d);
                    },
                    o,
                    o.exports,
                    d,
                    c,
                    e,
                    t
                );
            }
            return e[s].exports;
        }
        for (
            var r = 'function' == typeof require && require, a = 0;
            a < t.length;
            a++
        )
            f(t[a]);
        return f;
    })(
        {
            './lib/trianglify.js': [
                function (e, f) {
                    function d(e) {
                        function f(e, f) {
                            return a(n(e, f[0]), f[1]);
                        }
                        function d(e, f, d) {
                            return (
                                ((e - f[0]) * (d[1] - d[0])) / (f[1] - f[0]) +
                                d[0]
                            );
                        }
                        function h(e) {
                            return {
                                x: (e[0][0] + e[1][0] + e[2][0]) / 3,
                                y: (e[0][1] + e[1][1] + e[2][1]) / 3,
                            };
                        }
                        function g() {
                            if (e.palette instanceof Array)
                                return e.palette[l(u() * e.palette.length)];
                            var f = Object.keys(e.palette);
                            return e.palette[f[l(u() * f.length)]];
                        }
                        var u;
                        if (
                            ((e = (function (e, f) {
                                var d = {};
                                for (var a in e) d[a] = e[a];
                                for (a in f)
                                    if (e.hasOwnProperty(a)) d[a] = f[a];
                                    else
                                        throw new Error(
                                            a +
                                                ' is not a configuration option for Trianglify. Check your spelling?'
                                        );
                                return d;
                            })(b, e)),
                            (u = t(e.seed)),
                            'random' === e.x_colors && (e.x_colors = g()),
                            'random' === e.y_colors && (e.y_colors = g()),
                            'match_x' === e.y_colors &&
                                (e.y_colors = e.x_colors),
                            !(0 < e.width && 0 < e.height))
                        )
                            throw new Error(
                                'Width and height must be numbers greater than 0'
                            );
                        if (2 > e.cell_size)
                            throw new Error(
                                'Cell size must be greater than 2.'
                            );
                        if (!e.x_colors && !e.y_colors)
                            throw new Error(
                                'X and Y colors can not be both undefined.'
                            );
                        var p;
                        if (e.color_function)
                            p = function (f, d) {
                                return s(e.color_function(f, d));
                            };
                        else if (e.x_colors && e.y_colors) {
                            var m = s.scale(e.x_colors).mode(e.color_space),
                                _ = s.scale(e.y_colors).mode(e.color_space);
                            p = function (f, d) {
                                return s.interpolate(
                                    m(f),
                                    _(d),
                                    0.5,
                                    e.color_space
                                );
                            };
                        } else {
                            var w = s
                                .scale(e.x_colors || e.y_colors)
                                .mode(e.color_space);
                            p = e.x_colors
                                ? function (e) {
                                      return w(e);
                                  }
                                : function (e, f) {
                                      return w(f);
                                  };
                        }
                        for (
                            var y = e.width,
                                x = e.height,
                                j = l((y + 4 * e.cell_size) / e.cell_size),
                                v = l((x + 4 * e.cell_size) / e.cell_size),
                                k = (j * e.cell_size - y) / 2,
                                q = (v * e.cell_size - x) / 2,
                                C = (e.cell_size * e.variance) / 2,
                                z = function (e) {
                                    return f(d(e, [0, y], [0, 1]), [0, 1]);
                                },
                                U = function (e) {
                                    return f(d(e, [0, x], [0, 1]), [0, 1]);
                                },
                                B =
                                    e.points ||
                                    o(y, x, k, q, e.cell_size, C, u),
                                G = new r(B).triangles,
                                S = [],
                                P = function (e) {
                                    return B[e];
                                },
                                R = 0;
                            R < G.length;
                            R += 3
                        ) {
                            var i = [G[R], G[R + 1], G[R + 2]].map(P),
                                A = h(i),
                                L = p(z(A.x), U(A.y)).css();
                            S.push([L, i]);
                        }
                        return c(S, e);
                    }
                    var r = e('delaunator'),
                        t = e('seedrandom'),
                        s = e('chroma-js'),
                        i = e('./colorbrewer'),
                        o = e('./points'),
                        c = e('./pattern'),
                        b = {
                            width: 600,
                            height: 400,
                            cell_size: 75,
                            variance: 0.75,
                            seed: null,
                            x_colors: 'random',
                            y_colors: 'match_x',
                            palette: i,
                            color_space: 'lab',
                            color_function: null,
                            stroke_width: 1.51,
                            points: void 0,
                        };
                    (d.colorbrewer = i), (d.defaults = b), (f.exports = d);
                },
                {
                    './colorbrewer':
                        '/Users/qrohlf/Code/trianglify/lib/colorbrewer.js',
                    './pattern': '/Users/qrohlf/Code/trianglify/lib/pattern.js',
                    './points': '/Users/qrohlf/Code/trianglify/lib/points.js',
                    'chroma-js':
                        '/Users/qrohlf/Code/trianglify/node_modules/chroma-js/chroma.js',
                    delaunator:
                        '/Users/qrohlf/Code/trianglify/node_modules/delaunator/index.js',
                    seedrandom:
                        '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/index.js',
                },
            ],
            '/Users/qrohlf/Code/trianglify/lib/colorbrewer.js': [
                function (e, f) {
                    f.exports = {
                        YlGn: [
                            '#ffffe5',
                            '#f7fcb9',
                            '#d9f0a3',
                            '#addd8e',
                            '#78c679',
                            '#41ab5d',
                            '#238443',
                            '#006837',
                            '#004529',
                        ],
                        YlGnBu: [
                            '#ffffd9',
                            '#edf8b1',
                            '#c7e9b4',
                            '#7fcdbb',
                            '#41b6c4',
                            '#1d91c0',
                            '#225ea8',
                            '#253494',
                            '#081d58',
                        ],
                        GnBu: [
                            '#f7fcf0',
                            '#e0f3db',
                            '#ccebc5',
                            '#a8ddb5',
                            '#7bccc4',
                            '#4eb3d3',
                            '#2b8cbe',
                            '#0868ac',
                            '#084081',
                        ],
                        BuGn: [
                            '#f7fcfd',
                            '#e5f5f9',
                            '#ccece6',
                            '#99d8c9',
                            '#66c2a4',
                            '#41ae76',
                            '#238b45',
                            '#006d2c',
                            '#00441b',
                        ],
                        PuBuGn: [
                            '#fff7fb',
                            '#ece2f0',
                            '#d0d1e6',
                            '#a6bddb',
                            '#67a9cf',
                            '#3690c0',
                            '#02818a',
                            '#016c59',
                            '#014636',
                        ],
                        PuBu: [
                            '#fff7fb',
                            '#ece7f2',
                            '#d0d1e6',
                            '#a6bddb',
                            '#74a9cf',
                            '#3690c0',
                            '#0570b0',
                            '#045a8d',
                            '#023858',
                        ],
                        BuPu: [
                            '#f7fcfd',
                            '#e0ecf4',
                            '#bfd3e6',
                            '#9ebcda',
                            '#8c96c6',
                            '#8c6bb1',
                            '#88419d',
                            '#810f7c',
                            '#4d004b',
                        ],
                        RdPu: [
                            '#fff7f3',
                            '#fde0dd',
                            '#fcc5c0',
                            '#fa9fb5',
                            '#f768a1',
                            '#dd3497',
                            '#ae017e',
                            '#7a0177',
                            '#49006a',
                        ],
                        PuRd: [
                            '#f7f4f9',
                            '#e7e1ef',
                            '#d4b9da',
                            '#c994c7',
                            '#df65b0',
                            '#e7298a',
                            '#ce1256',
                            '#980043',
                            '#67001f',
                        ],
                        OrRd: [
                            '#fff7ec',
                            '#fee8c8',
                            '#fdd49e',
                            '#fdbb84',
                            '#fc8d59',
                            '#ef6548',
                            '#d7301f',
                            '#b30000',
                            '#7f0000',
                        ],
                        YlOrRd: [
                            '#ffffcc',
                            '#ffeda0',
                            '#fed976',
                            '#feb24c',
                            '#fd8d3c',
                            '#fc4e2a',
                            '#e31a1c',
                            '#bd0026',
                            '#800026',
                        ],
                        YlOrBr: [
                            '#ffffe5',
                            '#fff7bc',
                            '#fee391',
                            '#fec44f',
                            '#fe9929',
                            '#ec7014',
                            '#cc4c02',
                            '#993404',
                            '#662506',
                        ],
                        Purples: [
                            '#fcfbfd',
                            '#efedf5',
                            '#dadaeb',
                            '#bcbddc',
                            '#9e9ac8',
                            '#807dba',
                            '#6a51a3',
                            '#54278f',
                            '#3f007d',
                        ],
                        Blues: [
                            '#f7fbff',
                            '#deebf7',
                            '#c6dbef',
                            '#9ecae1',
                            '#6baed6',
                            '#4292c6',
                            '#2171b5',
                            '#08519c',
                            '#08306b',
                        ],
                        Greens: [
                            '#f7fcf5',
                            '#e5f5e0',
                            '#c7e9c0',
                            '#a1d99b',
                            '#74c476',
                            '#41ab5d',
                            '#238b45',
                            '#006d2c',
                            '#00441b',
                        ],
                        Oranges: [
                            '#fff5eb',
                            '#fee6ce',
                            '#fdd0a2',
                            '#fdae6b',
                            '#fd8d3c',
                            '#f16913',
                            '#d94801',
                            '#a63603',
                            '#7f2704',
                        ],
                        Reds: [
                            '#fff5f0',
                            '#fee0d2',
                            '#fcbba1',
                            '#fc9272',
                            '#fb6a4a',
                            '#ef3b2c',
                            '#cb181d',
                            '#a50f15',
                            '#67000d',
                        ],
                        Greys: [
                            '#ffffff',
                            '#f0f0f0',
                            '#d9d9d9',
                            '#bdbdbd',
                            '#969696',
                            '#737373',
                            '#525252',
                            '#252525',
                            '#000000',
                        ],
                        PuOr: [
                            '#7f3b08',
                            '#b35806',
                            '#e08214',
                            '#fdb863',
                            '#fee0b6',
                            '#f7f7f7',
                            '#d8daeb',
                            '#b2abd2',
                            '#8073ac',
                            '#542788',
                            '#2d004b',
                        ],
                        BrBG: [
                            '#543005',
                            '#8c510a',
                            '#bf812d',
                            '#dfc27d',
                            '#f6e8c3',
                            '#f5f5f5',
                            '#c7eae5',
                            '#80cdc1',
                            '#35978f',
                            '#01665e',
                            '#003c30',
                        ],
                        PRGn: [
                            '#40004b',
                            '#762a83',
                            '#9970ab',
                            '#c2a5cf',
                            '#e7d4e8',
                            '#f7f7f7',
                            '#d9f0d3',
                            '#a6dba0',
                            '#5aae61',
                            '#1b7837',
                            '#00441b',
                        ],
                        PiYG: [
                            '#8e0152',
                            '#c51b7d',
                            '#de77ae',
                            '#f1b6da',
                            '#fde0ef',
                            '#f7f7f7',
                            '#e6f5d0',
                            '#b8e186',
                            '#7fbc41',
                            '#4d9221',
                            '#276419',
                        ],
                        RdBu: [
                            '#67001f',
                            '#b2182b',
                            '#d6604d',
                            '#f4a582',
                            '#fddbc7',
                            '#f7f7f7',
                            '#d1e5f0',
                            '#92c5de',
                            '#4393c3',
                            '#2166ac',
                            '#053061',
                        ],
                        RdGy: [
                            '#67001f',
                            '#b2182b',
                            '#d6604d',
                            '#f4a582',
                            '#fddbc7',
                            '#ffffff',
                            '#e0e0e0',
                            '#bababa',
                            '#878787',
                            '#4d4d4d',
                            '#1a1a1a',
                        ],
                        RdYlBu: [
                            '#a50026',
                            '#d73027',
                            '#f46d43',
                            '#fdae61',
                            '#fee090',
                            '#ffffbf',
                            '#e0f3f8',
                            '#abd9e9',
                            '#74add1',
                            '#4575b4',
                            '#313695',
                        ],
                        Spectral: [
                            '#9e0142',
                            '#d53e4f',
                            '#f46d43',
                            '#fdae61',
                            '#fee08b',
                            '#ffffbf',
                            '#e6f598',
                            '#abdda4',
                            '#66c2a5',
                            '#3288bd',
                            '#5e4fa2',
                        ],
                        RdYlGn: [
                            '#a50026',
                            '#d73027',
                            '#f46d43',
                            '#fdae61',
                            '#fee08b',
                            '#ffffbf',
                            '#d9ef8b',
                            '#a6d96a',
                            '#66bd63',
                            '#1a9850',
                            '#006837',
                        ],
                    };
                },
                {},
            ],
            '/Users/qrohlf/Code/trianglify/lib/pattern.js': [
                function (e, f) {
                    (function (d) {
                        var a =
                            'undefined' == typeof document
                                ? e('jsdom').jsdom('<html/>')
                                : document;
                        f.exports = function (f, r) {
                            function t(t) {
                                var n;
                                if (
                                    'object' == typeof d &&
                                    'object' == typeof d.versions &&
                                    'undefined' != typeof d.versions.node
                                )
                                    try {
                                        e('canvas');
                                    } catch (f) {
                                        throw Error(
                                            'The optional node-canvas dependency is needed for Trianglify to render using canvas in node.'
                                        );
                                    }
                                return (
                                    t || (t = a.createElement('canvas')),
                                    t.setAttribute('width', r.width),
                                    t.setAttribute('height', r.height),
                                    (n = t.getContext('2d')),
                                    (n.canvas.width = r.width),
                                    (n.canvas.height = r.height),
                                    f.forEach(function (e) {
                                        (n.fillStyle = n.strokeStyle = e[0]),
                                            (n.lineWidth = r.stroke_width),
                                            n.beginPath(),
                                            n.moveTo.apply(n, e[1][0]),
                                            n.lineTo.apply(n, e[1][1]),
                                            n.lineTo.apply(n, e[1][2]),
                                            n.fill(),
                                            n.stroke();
                                    }),
                                    t
                                );
                            }
                            return {
                                polys: f,
                                opts: r,
                                svg: function (e) {
                                    var d = a.createElementNS(
                                        'http://www.w3.org/2000/svg',
                                        'svg'
                                    );
                                    return (
                                        d.setAttribute('width', r.width),
                                        d.setAttribute('height', r.height),
                                        e &&
                                            e.includeNamespace &&
                                            d.setAttribute(
                                                'xmlns',
                                                'http://www.w3.org/2000/svg'
                                            ),
                                        f.forEach(function (e) {
                                            var f = a.createElementNS(
                                                'http://www.w3.org/2000/svg',
                                                'path'
                                            );
                                            f.setAttribute(
                                                'd',
                                                'M' + e[1].join('L') + 'Z'
                                            ),
                                                f.setAttribute('fill', e[0]),
                                                f.setAttribute('stroke', e[0]),
                                                f.setAttribute(
                                                    'stroke-width',
                                                    r.stroke_width
                                                ),
                                                d.appendChild(f);
                                        }),
                                        d
                                    );
                                },
                                canvas: t,
                                png: function () {
                                    return t().toDataURL('image/png');
                                },
                            };
                        };
                    }.call(this, e('_process')));
                },
                {
                    _process:
                        '/Users/qrohlf/Code/trianglify/node_modules/process/browser.js',
                    canvas: '/Users/qrohlf/Code/trianglify/node_modules/browser-resolve/empty.js',
                    jsdom: '/Users/qrohlf/Code/trianglify/node_modules/browser-resolve/empty.js',
                },
            ],
            '/Users/qrohlf/Code/trianglify/lib/points.js': [
                function (e, f) {
                    f.exports = function (e, f, d, a, r, t, n) {
                        for (
                            var s = 0.5 * r, o = 2 * t, c = -t, b = [], h = -d;
                            h < e + d;
                            h += r
                        )
                            for (var i = -a; i < f + a; i += r) {
                                var g = h + s + (n() * o + c),
                                    u = i + s + (n() * o + c);
                                b.push([l(g), l(u)]);
                            }
                        return b;
                    };
                },
                {},
            ],
            '/Users/qrohlf/Code/trianglify/node_modules/browser-resolve/empty.js':
                [function () {}, {}],
            '/Users/qrohlf/Code/trianglify/node_modules/chroma-js/chroma.js': [
                function (r, t, s) {
                    (function () {
                        var o,
                            r,
                            c,
                            u,
                            i,
                            h,
                            p,
                            b,
                            g,
                            y,
                            _,
                            m,
                            x,
                            w,
                            j,
                            v,
                            k,
                            q,
                            C,
                            U,
                            B,
                            z,
                            G,
                            S,
                            P,
                            R,
                            A,
                            L,
                            Y,
                            E,
                            T,
                            O,
                            N,
                            X,
                            D,
                            K,
                            M,
                            V,
                            W,
                            F = Number.MAX_VALUE,
                            I = Math.cos,
                            Z = Math.pow,
                            J = Math.PI,
                            H = Number.NaN,
                            $ = Math.round;
                        (y = function (e, f, d, a) {
                            return new o(e, f, d, a);
                        }),
                            'undefined' != typeof t &&
                                null !== t &&
                                null != t.exports &&
                                (t.exports = y),
                            'function' == typeof e && e.amd
                                ? e([], function () {
                                      return y;
                                  })
                                : ((X =
                                      'undefined' != typeof s && null !== s
                                          ? s
                                          : this),
                                  (X.chroma = y)),
                            (y.color = function (e, f, d, a) {
                                return new o(e, f, d, a);
                            }),
                            (y.hsl = function (e, f, d, r) {
                                return new o(e, f, d, r, 'hsl');
                            }),
                            (y.hsv = function (e, f, d, r) {
                                return new o(e, f, d, r, 'hsv');
                            }),
                            (y.rgb = function (e, f, d, r) {
                                return new o(e, f, d, r, 'rgb');
                            }),
                            (y.hex = function (e) {
                                return new o(e);
                            }),
                            (y.css = function (e) {
                                return new o(e);
                            }),
                            (y.lab = function (e, f, d) {
                                return new o(e, f, d, 'lab');
                            }),
                            (y.lch = function (e, f, d) {
                                return new o(e, f, d, 'lch');
                            }),
                            (y.hsi = function (e, f, d) {
                                return new o(e, f, d, 'hsi');
                            }),
                            (y.gl = function (e, f, d, r) {
                                return new o(
                                    255 * e,
                                    255 * f,
                                    255 * d,
                                    r,
                                    'gl'
                                );
                            }),
                            (y.interpolate = function (e, d, a, f) {
                                return null == e || null == d
                                    ? '#000'
                                    : ('string' === D(e) && (e = new o(e)),
                                      'string' === D(d) && (d = new o(d)),
                                      e.interpolate(a, d, f));
                            }),
                            (y.mix = y.interpolate),
                            (y.contrast = function (e, f) {
                                var d, a;
                                return (
                                    'string' === D(e) && (e = new o(e)),
                                    'string' === D(f) && (f = new o(f)),
                                    (d = e.luminance()),
                                    (a = f.luminance()),
                                    d > a
                                        ? (d + 0.05) / (a + 0.05)
                                        : (a + 0.05) / (d + 0.05)
                                );
                            }),
                            (y.luminance = function (e) {
                                return y(e).luminance();
                            }),
                            (y._Color = o),
                            (o = (function () {
                                function e() {
                                    var e,
                                        f,
                                        d,
                                        a,
                                        r,
                                        t,
                                        n,
                                        l,
                                        s,
                                        i,
                                        o,
                                        c,
                                        b,
                                        h,
                                        g,
                                        u;
                                    for (
                                        r = this,
                                            d = [],
                                            ((i = 0), (o = arguments.length));
                                        i < o;
                                        i++
                                    )
                                        (f = arguments[i]),
                                            null != f && d.push(f);
                                    if (0 === d.length)
                                        (c = [255, 0, 255, 1, 'rgb']),
                                            (n = c[0]),
                                            (l = c[1]),
                                            (s = c[2]),
                                            (e = c[3]),
                                            (a = c[4]);
                                    else if ('array' === D(d[0])) {
                                        if (3 === d[0].length)
                                            (b = d[0]),
                                                (n = b[0]),
                                                (l = b[1]),
                                                (s = b[2]),
                                                (e = 1);
                                        else if (4 === d[0].length)
                                            (h = d[0]),
                                                (n = h[0]),
                                                (l = h[1]),
                                                (s = h[2]),
                                                (e = h[3]);
                                        else throw 'unknown input argument';
                                        a = null == (g = d[1]) ? 'rgb' : g;
                                    } else
                                        'string' === D(d[0])
                                            ? ((n = d[0]), (a = 'hex'))
                                            : 'object' === D(d[0])
                                            ? ((u = d[0]._rgb),
                                              (n = u[0]),
                                              (l = u[1]),
                                              (s = u[2]),
                                              (e = u[3]),
                                              (a = 'rgb'))
                                            : 3 <= d.length &&
                                              ((n = d[0]),
                                              (l = d[1]),
                                              (s = d[2]));
                                    3 === d.length
                                        ? ((a = 'rgb'), (e = 1))
                                        : 4 === d.length
                                        ? 'string' === D(d[3])
                                            ? ((a = d[3]), (e = 1))
                                            : 'number' === D(d[3]) &&
                                              ((a = 'rgb'), (e = d[3]))
                                        : 5 === d.length &&
                                          ((e = d[3]), (a = d[4])),
                                        null == e && (e = 1),
                                        'rgb' === a
                                            ? (r._rgb = [n, l, s, e])
                                            : 'gl' === a
                                            ? (r._rgb = [
                                                  255 * n,
                                                  255 * l,
                                                  255 * s,
                                                  e,
                                              ])
                                            : 'hsl' === a
                                            ? ((r._rgb = k(n, l, s)),
                                              (r._rgb[3] = e))
                                            : 'hsv' === a
                                            ? ((r._rgb = q(n, l, s)),
                                              (r._rgb[3] = e))
                                            : 'hex' === a
                                            ? (r._rgb = j(n))
                                            : 'lab' === a
                                            ? ((r._rgb = U(n, l, s)),
                                              (r._rgb[3] = e))
                                            : 'lch' === a
                                            ? ((r._rgb = G(n, l, s)),
                                              (r._rgb[3] = e))
                                            : 'hsi' === a &&
                                              ((r._rgb = v(n, l, s)),
                                              (r._rgb[3] = e)),
                                        (t = _(r._rgb));
                                }
                                return (
                                    (e.prototype.rgb = function () {
                                        return this._rgb.slice(0, 3);
                                    }),
                                    (e.prototype.rgba = function () {
                                        return this._rgb;
                                    }),
                                    (e.prototype.hex = function () {
                                        return A(this._rgb);
                                    }),
                                    (e.prototype.toString = function () {
                                        return this.name();
                                    }),
                                    (e.prototype.hsl = function () {
                                        return Y(this._rgb);
                                    }),
                                    (e.prototype.hsv = function () {
                                        return E(this._rgb);
                                    }),
                                    (e.prototype.lab = function () {
                                        return T(this._rgb);
                                    }),
                                    (e.prototype.lch = function () {
                                        return O(this._rgb);
                                    }),
                                    (e.prototype.hsi = function () {
                                        return L(this._rgb);
                                    }),
                                    (e.prototype.gl = function () {
                                        return [
                                            this._rgb[0] / 255,
                                            this._rgb[1] / 255,
                                            this._rgb[2] / 255,
                                            this._rgb[3],
                                        ];
                                    }),
                                    (e.prototype.luminance = function (f, a) {
                                        var r, t, n, s;
                                        return (null == a && (a = 'rgb'),
                                        !arguments.length)
                                            ? P(this._rgb)
                                            : (0 === f &&
                                                  (this._rgb = [
                                                      0,
                                                      0,
                                                      0,
                                                      this._rgb[3],
                                                  ]),
                                              1 === f &&
                                                  (this._rgb = [
                                                      255,
                                                      255,
                                                      255,
                                                      this._rgb[3],
                                                  ]),
                                              (r = P(this._rgb)),
                                              (t = 1e-7),
                                              (n = 20),
                                              (s = function (e, r) {
                                                  var l, i;
                                                  return (
                                                      (i = e.interpolate(
                                                          0.5,
                                                          r,
                                                          a
                                                      )),
                                                      (l = i.luminance()),
                                                      d(f - l) < t || !n--
                                                          ? i
                                                          : l > f
                                                          ? s(e, i)
                                                          : s(i, r)
                                                  );
                                              }),
                                              (this._rgb = (
                                                  r > f
                                                      ? s(new e('black'), this)
                                                      : s(this, new e('white'))
                                              ).rgba()),
                                              this);
                                    }),
                                    (e.prototype.name = function () {
                                        var e, f;
                                        for (f in ((e = this.hex()), y.colors))
                                            if (e === y.colors[f]) return f;
                                        return e;
                                    }),
                                    (e.prototype.alpha = function (e) {
                                        return arguments.length
                                            ? ((this._rgb[3] = e), this)
                                            : this._rgb[3];
                                    }),
                                    (e.prototype.css = function (e) {
                                        var f, d, a, r;
                                        return (null == e && (e = 'rgb'),
                                        (d = this),
                                        (a = d._rgb),
                                        3 === e.length &&
                                            1 > a[3] &&
                                            (e += 'a'),
                                        'rgb' === e)
                                            ? e +
                                                  '(' +
                                                  a
                                                      .slice(0, 3)
                                                      .map(Math.round)
                                                      .join(',') +
                                                  ')'
                                            : 'rgba' === e
                                            ? e +
                                              '(' +
                                              a
                                                  .slice(0, 3)
                                                  .map(Math.round)
                                                  .join(',') +
                                              ',' +
                                              a[3] +
                                              ')'
                                            : 'hsl' === e || 'hsla' === e
                                            ? ((f = d.hsl()),
                                              (r = function (e) {
                                                  return $(100 * e) / 100;
                                              }),
                                              (f[0] = r(f[0])),
                                              (f[1] = r(100 * f[1]) + '%'),
                                              (f[2] = r(100 * f[2]) + '%'),
                                              4 === e.length && (f[3] = a[3]),
                                              e + '(' + f.join(',') + ')')
                                            : void 0;
                                    }),
                                    (e.prototype.interpolate = function (
                                        d,
                                        f,
                                        a
                                    ) {
                                        var r,
                                            t,
                                            n,
                                            l,
                                            s,
                                            i,
                                            o,
                                            c,
                                            b,
                                            h,
                                            g,
                                            u,
                                            p,
                                            m;
                                        if (
                                            ((c = this),
                                            null == a && (a = 'rgb'),
                                            'string' === D(f) && (f = new e(f)),
                                            'hsl' === a ||
                                                'hsv' === a ||
                                                'lch' === a ||
                                                'hsi' === a)
                                        )
                                            'hsl' === a
                                                ? ((p = c.hsl()), (m = f.hsl()))
                                                : 'hsv' === a
                                                ? ((p = c.hsv()), (m = f.hsv()))
                                                : 'hsi' === a
                                                ? ((p = c.hsi()), (m = f.hsi()))
                                                : 'lch' === a &&
                                                  ((p = c.lch()),
                                                  (m = f.lch())),
                                                'h' === a.substr(0, 1)
                                                    ? ((n = p[0]),
                                                      (g = p[1]),
                                                      (i = p[2]),
                                                      (l = m[0]),
                                                      (u = m[1]),
                                                      (o = m[2]))
                                                    : ((i = p[0]),
                                                      (g = p[1]),
                                                      (n = p[2]),
                                                      (o = m[0]),
                                                      (u = m[1]),
                                                      (l = m[2])),
                                                isNaN(n) || isNaN(l)
                                                    ? isNaN(n)
                                                        ? isNaN(l)
                                                            ? (t = H)
                                                            : ((t = l),
                                                              (1 === i ||
                                                                  0 === i) &&
                                                                  'hsv' !== a &&
                                                                  (h = u))
                                                        : ((t = n),
                                                          (1 === o ||
                                                              0 === o) &&
                                                              'hsv' !== a &&
                                                              (h = g))
                                                    : ((r =
                                                          l > n && 180 < l - n
                                                              ? l - (n + 360)
                                                              : l < n &&
                                                                180 < n - l
                                                              ? l + 360 - n
                                                              : l - n),
                                                      (t = n + d * r)),
                                                null == h &&
                                                    (h = g + d * (u - g)),
                                                (s = i + d * (o - i)),
                                                (b =
                                                    'h' === a.substr(0, 1)
                                                        ? new e(t, h, s, a)
                                                        : new e(s, h, t, a));
                                        else if ('rgb' === a)
                                            (p = c._rgb),
                                                (m = f._rgb),
                                                (b = new e(
                                                    p[0] + d * (m[0] - p[0]),
                                                    p[1] + d * (m[1] - p[1]),
                                                    p[2] + d * (m[2] - p[2]),
                                                    a
                                                ));
                                        else if ('lab' === a)
                                            (p = c.lab()),
                                                (m = f.lab()),
                                                (b = new e(
                                                    p[0] + d * (m[0] - p[0]),
                                                    p[1] + d * (m[1] - p[1]),
                                                    p[2] + d * (m[2] - p[2]),
                                                    a
                                                ));
                                        else
                                            throw (
                                                'color mode ' +
                                                a +
                                                ' is not supported'
                                            );
                                        return (
                                            b.alpha(
                                                c.alpha() +
                                                    d * (f.alpha() - c.alpha())
                                            ),
                                            b
                                        );
                                    }),
                                    (e.prototype.premultiply = function () {
                                        var e, f;
                                        return (
                                            (f = this.rgb()),
                                            (e = this.alpha()),
                                            y(f[0] * e, f[1] * e, f[2] * e, e)
                                        );
                                    }),
                                    (e.prototype.darken = function (e) {
                                        var f, d;
                                        return (
                                            null == e && (e = 20),
                                            (d = this),
                                            (f = d.lch()),
                                            (f[0] -= e),
                                            y.lch(f).alpha(d.alpha())
                                        );
                                    }),
                                    (e.prototype.darker = function (e) {
                                        return this.darken(e);
                                    }),
                                    (e.prototype.brighten = function (e) {
                                        return (
                                            null == e && (e = 20),
                                            this.darken(-e)
                                        );
                                    }),
                                    (e.prototype.brighter = function (e) {
                                        return this.brighten(e);
                                    }),
                                    (e.prototype.saturate = function (e) {
                                        var f, d;
                                        return (
                                            null == e && (e = 20),
                                            (d = this),
                                            (f = d.lch()),
                                            (f[1] += e),
                                            y.lch(f).alpha(d.alpha())
                                        );
                                    }),
                                    (e.prototype.desaturate = function (e) {
                                        return (
                                            null == e && (e = 20),
                                            this.saturate(-e)
                                        );
                                    }),
                                    e
                                );
                            })()),
                            (_ = function (e) {
                                for (var f in e)
                                    3 > f
                                        ? (0 > e[f] && (e[f] = 0),
                                          255 < e[f] && (e[f] = 255))
                                        : 3 === f &&
                                          (0 > e[f] && (e[f] = 0),
                                          1 < e[f] && (e[f] = 1));
                                return e;
                            }),
                            (w = function (e) {
                                var f, d, a, r, t, n, l, s;
                                if (
                                    ((e = e.toLowerCase()),
                                    null != y.colors && y.colors[e])
                                )
                                    return j(y.colors[e]);
                                if (
                                    (a = e.match(
                                        /rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/
                                    ))
                                ) {
                                    for (
                                        r = a.slice(1, 4), d = t = 0;
                                        2 >= t;
                                        d = ++t
                                    )
                                        r[d] = +r[d];
                                    r[3] = 1;
                                } else if (
                                    (a = e.match(
                                        /rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/
                                    ))
                                )
                                    for (
                                        r = a.slice(1, 5), d = n = 0;
                                        3 >= n;
                                        d = ++n
                                    )
                                        r[d] = +r[d];
                                else if (
                                    (a = e.match(
                                        /rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/
                                    ))
                                ) {
                                    for (
                                        r = a.slice(1, 4), d = l = 0;
                                        2 >= l;
                                        d = ++l
                                    )
                                        r[d] = $(2.55 * r[d]);
                                    r[3] = 1;
                                } else if (
                                    (a = e.match(
                                        /rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/
                                    ))
                                ) {
                                    for (
                                        r = a.slice(1, 5), d = s = 0;
                                        2 >= s;
                                        d = ++s
                                    )
                                        r[d] = $(2.55 * r[d]);
                                    r[3] = +r[3];
                                } else
                                    (a = e.match(
                                        /hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/
                                    ))
                                        ? ((f = a.slice(1, 4)),
                                          (f[1] *= 0.01),
                                          (f[2] *= 0.01),
                                          (r = k(f)),
                                          (r[3] = 1))
                                        : (a = e.match(
                                              /hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/
                                          )) &&
                                          ((f = a.slice(1, 4)),
                                          (f[1] *= 0.01),
                                          (f[2] *= 0.01),
                                          (r = k(f)),
                                          (r[3] = +a[4]));
                                return r;
                            }),
                            (j = function (e) {
                                var f, d, a, t, r, n;
                                if (
                                    e.match(
                                        /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                                    )
                                )
                                    return (
                                        (4 === e.length || 7 === e.length) &&
                                            (e = e.substr(1)),
                                        3 === e.length &&
                                            ((e = e.split('')),
                                            (e =
                                                e[0] +
                                                e[0] +
                                                e[1] +
                                                e[1] +
                                                e[2] +
                                                e[2])),
                                        (n = parseInt(e, 16)),
                                        (t = n >> 16),
                                        (a = 255 & (n >> 8)),
                                        (d = 255 & n),
                                        [t, a, d, 1]
                                    );
                                if (e.match(/^#?([A-Fa-f0-9]{8})$/))
                                    return (
                                        9 === e.length && (e = e.substr(1)),
                                        (n = parseInt(e, 16)),
                                        (t = 255 & (n >> 24)),
                                        (a = 255 & (n >> 16)),
                                        (d = 255 & (n >> 8)),
                                        (f = 255 & n),
                                        [t, a, d, f]
                                    );
                                if ((r = w(e))) return r;
                                throw 'unknown color: ' + e;
                            }),
                            (v = function (e, f, d) {
                                var a, t, n, r;
                                return (
                                    (r = K(arguments)),
                                    (e = r[0]),
                                    (f = r[1]),
                                    (d = r[2]),
                                    (e /= 360),
                                    e < 1 / 3
                                        ? ((a = (1 - f) / 3),
                                          (n =
                                              (1 +
                                                  (f * x(u * e)) /
                                                      x(c - u * e)) /
                                              3),
                                          (t = 1 - (a + n)))
                                        : e < 2 / 3
                                        ? ((e -= 1 / 3),
                                          (n = (1 - f) / 3),
                                          (t =
                                              (1 +
                                                  (f * x(u * e)) /
                                                      x(c - u * e)) /
                                              3),
                                          (a = 1 - (n + t)))
                                        : ((e -= 2 / 3),
                                          (t = (1 - f) / 3),
                                          (a =
                                              (1 +
                                                  (f * x(u * e)) /
                                                      x(c - u * e)) /
                                              3),
                                          (n = 1 - (t + a))),
                                    (n = S(3 * (d * n))),
                                    (t = S(3 * (d * t))),
                                    (a = S(3 * (d * a))),
                                    [255 * n, 255 * t, 255 * a]
                                );
                            }),
                            (k = function () {
                                var e, f, d, a, t, n, l, r, s, i, o, c, b, h;
                                if (
                                    ((b = K(arguments)),
                                    (a = b[0]),
                                    (r = b[1]),
                                    (n = b[2]),
                                    0 === r)
                                )
                                    l = d = e = 255 * n;
                                else {
                                    for (
                                        o = [0, 0, 0],
                                            f = [0, 0, 0],
                                            i =
                                                0.5 > n
                                                    ? n * (1 + r)
                                                    : n + r - n * r,
                                            s = 2 * n - i,
                                            a /= 360,
                                            o[0] = a + 1 / 3,
                                            o[1] = a,
                                            o[2] = a - 1 / 3,
                                            t = c = 0;
                                        2 >= c;
                                        t = ++c
                                    )
                                        0 > o[t] && (o[t] += 1),
                                            1 < o[t] && (o[t] -= 1),
                                            (f[t] =
                                                1 > 6 * o[t]
                                                    ? s + 6 * (i - s) * o[t]
                                                    : 1 > 2 * o[t]
                                                    ? i
                                                    : 2 > 3 * o[t]
                                                    ? s +
                                                      6 *
                                                          ((i - s) *
                                                              (2 / 3 - o[t]))
                                                    : s);
                                    (h = [
                                        $(255 * f[0]),
                                        $(255 * f[1]),
                                        $(255 * f[2]),
                                    ]),
                                        (l = h[0]),
                                        (d = h[1]),
                                        (e = h[2]);
                                }
                                return [l, d, e];
                            }),
                            (q = function () {
                                var e,
                                    d,
                                    f,
                                    a,
                                    n,
                                    i,
                                    o,
                                    c,
                                    r,
                                    s,
                                    t,
                                    b,
                                    h,
                                    g,
                                    u,
                                    p,
                                    m,
                                    y;
                                return (
                                    (b = K(arguments)),
                                    (a = b[0]),
                                    (r = b[1]),
                                    (t = b[2]),
                                    (t *= 255),
                                    0 === r
                                        ? (c = f = e = t)
                                        : (360 === a && (a = 0),
                                          360 < a && (a -= 360),
                                          0 > a && (a += 360),
                                          (a /= 60),
                                          (n = l(a)),
                                          (d = a - n),
                                          (i = t * (1 - r)),
                                          (o = t * (1 - r * d)),
                                          (s = t * (1 - r * (1 - d))),
                                          0 === n
                                              ? ((h = [t, s, i]),
                                                (c = h[0]),
                                                (f = h[1]),
                                                (e = h[2]))
                                              : 1 === n
                                              ? ((g = [o, t, i]),
                                                (c = g[0]),
                                                (f = g[1]),
                                                (e = g[2]))
                                              : 2 === n
                                              ? ((u = [i, t, s]),
                                                (c = u[0]),
                                                (f = u[1]),
                                                (e = u[2]))
                                              : 3 === n
                                              ? ((p = [i, o, t]),
                                                (c = p[0]),
                                                (f = p[1]),
                                                (e = p[2]))
                                              : 4 === n
                                              ? ((m = [s, i, t]),
                                                (c = m[0]),
                                                (f = m[1]),
                                                (e = m[2]))
                                              : 5 === n
                                              ? ((y = [t, i, o]),
                                                (c = y[0]),
                                                (f = y[1]),
                                                (e = y[2]))
                                              : void 0),
                                    ((c = $(c)),
                                    (f = $(f)),
                                    (e = $(e)),
                                    [c, f, e])
                                );
                            }),
                            (r = 18),
                            (i = 0.95047),
                            (h = 1),
                            (p = 1.08883),
                            (C = function () {
                                var e, d, a, r, t, n;
                                return (
                                    (n = K(arguments)),
                                    (t = n[0]),
                                    (e = n[1]),
                                    (d = n[2]),
                                    (a = f(e * e + d * d)),
                                    (r = 180 * (Math.atan2(d, e) / J)),
                                    [t, a, r]
                                );
                            }),
                            (U = function (e, f, d) {
                                var a, t, r, n, l, s, o;
                                return (
                                    void 0 !== e &&
                                        3 === e.length &&
                                        ((s = e),
                                        (e = s[0]),
                                        (f = s[1]),
                                        (d = s[2])),
                                    void 0 !== e &&
                                        3 === e.length &&
                                        ((o = e),
                                        (e = o[0]),
                                        (f = o[1]),
                                        (d = o[2])),
                                    (n = (e + 16) / 116),
                                    (r = n + f / 500),
                                    (l = n - d / 200),
                                    (r = B(r) * i),
                                    (n = B(n) * h),
                                    (l = B(l) * p),
                                    (t = V(
                                        3.2404542 * r -
                                            1.5371385 * n -
                                            0.4985314 * l
                                    )),
                                    (a = V(
                                        -0.969266 * r +
                                            1.8760108 * n +
                                            0.041556 * l
                                    )),
                                    (d = V(
                                        0.0556434 * r -
                                            0.2040259 * n +
                                            1.0572252 * l
                                    )),
                                    [
                                        S(t, 0, 255),
                                        S(a, 0, 255),
                                        S(d, 0, 255),
                                        1,
                                    ]
                                );
                            }),
                            (B = function (e) {
                                return 0.206893034 < e
                                    ? e * e * e
                                    : (e - 4 / 29) / 7.787037;
                            }),
                            (V = function (e) {
                                return $(
                                    255 *
                                        (0.00304 >= e
                                            ? 12.92 * e
                                            : 1.055 * Z(e, 1 / 2.4) - 0.055)
                                );
                            }),
                            (z = function () {
                                var e, f, d, a;
                                return (
                                    (a = K(arguments)),
                                    (d = a[0]),
                                    (e = a[1]),
                                    (f = a[2]),
                                    (f = (f * J) / 180),
                                    [d, I(f) * e, Math.sin(f) * e]
                                );
                            }),
                            (G = function (e, f, d) {
                                var t, n, a, l, s, r, i;
                                return (
                                    (r = z(e, f, d)),
                                    (t = r[0]),
                                    (n = r[1]),
                                    (a = r[2]),
                                    (i = U(t, n, a)),
                                    (s = i[0]),
                                    (l = i[1]),
                                    (a = i[2]),
                                    [S(s, 0, 255), S(l, 0, 255), S(a, 0, 255)]
                                );
                            }),
                            (P = function (e, f, d) {
                                var a;
                                return (
                                    (a = K(arguments)),
                                    (e = a[0]),
                                    (f = a[1]),
                                    (d = a[2]),
                                    (e = R(e)),
                                    (f = R(f)),
                                    (d = R(d)),
                                    0.2126 * e + 0.7152 * f + 0.0722 * d
                                );
                            }),
                            (R = function (e) {
                                return (
                                    (e /= 255),
                                    0.03928 >= e
                                        ? e / 12.92
                                        : Z((e + 0.055) / 1.055, 2.4)
                                );
                            }),
                            (A = function () {
                                var e, f, d, a, r, t;
                                return (
                                    (t = K(arguments)),
                                    (d = t[0]),
                                    (f = t[1]),
                                    (e = t[2]),
                                    (r = (d << 16) | (f << 8) | e),
                                    (a = '000000' + r.toString(16)),
                                    '#' + a.substr(a.length - 6)
                                );
                            }),
                            (L = function () {
                                var e, d, t, n, l, i, o, r, s;
                                return (
                                    (s = K(arguments)),
                                    (o = s[0]),
                                    (t = s[1]),
                                    (d = s[2]),
                                    (e = 2 * J),
                                    (o /= 255),
                                    (t /= 255),
                                    (d /= 255),
                                    (i = a(o, t, d)),
                                    (l = (o + t + d) / 3),
                                    (r = 1 - i / l),
                                    0 === r
                                        ? (n = 0)
                                        : ((n = (o - t + (o - d)) / 2),
                                          (n /= f(
                                              (o - t) * (o - t) +
                                                  (o - d) * (t - d)
                                          )),
                                          (n = Math.acos(n)),
                                          d > t && (n = e - n),
                                          (n /= e)),
                                    [360 * n, r, l]
                                );
                            }),
                            (Y = function (e, f, d) {
                                var r, t, l, i, o, s;
                                return (
                                    void 0 !== e &&
                                        3 <= e.length &&
                                        ((s = e),
                                        (e = s[0]),
                                        (f = s[1]),
                                        (d = s[2])),
                                    (e /= 255),
                                    (f /= 255),
                                    (d /= 255),
                                    (i = a(e, f, d)),
                                    (l = n(e, f, d)),
                                    (t = (l + i) / 2),
                                    l === i
                                        ? ((o = 0), (r = H))
                                        : (o =
                                              0.5 > t
                                                  ? (l - i) / (l + i)
                                                  : (l - i) / (2 - l - i)),
                                    e === l
                                        ? (r = (f - d) / (l - i))
                                        : f === l
                                        ? (r = 2 + (d - e) / (l - i))
                                        : d === l &&
                                          (r = 4 + (e - f) / (l - i)),
                                    (r *= 60),
                                    0 > r && (r += 360),
                                    [r, o, t]
                                );
                            }),
                            (E = function () {
                                var e, f, d, t, l, i, o, r, s, c;
                                return (
                                    (c = K(arguments)),
                                    (o = c[0]),
                                    (d = c[1]),
                                    (e = c[2]),
                                    (i = a(o, d, e)),
                                    (l = n(o, d, e)),
                                    (f = l - i),
                                    (s = l / 255),
                                    0 === l
                                        ? ((t = H), (r = 0))
                                        : ((r = f / l),
                                          o === l && (t = (d - e) / f),
                                          d === l && (t = 2 + (e - o) / f),
                                          e === l && (t = 4 + (o - d) / f),
                                          (t *= 60),
                                          0 > t && (t += 360)),
                                    [t, r, s]
                                );
                            }),
                            (T = function () {
                                var e, f, d, a, r, t, n;
                                return (
                                    (n = K(arguments)),
                                    (d = n[0]),
                                    (f = n[1]),
                                    (e = n[2]),
                                    (d = N(d)),
                                    (f = N(f)),
                                    (e = N(e)),
                                    (a = M(
                                        (0.4124564 * d +
                                            0.3575761 * f +
                                            0.1804375 * e) /
                                            i
                                    )),
                                    (r = M(
                                        (0.2126729 * d +
                                            0.7151522 * f +
                                            0.072175 * e) /
                                            h
                                    )),
                                    (t = M(
                                        (0.0193339 * d +
                                            0.119192 * f +
                                            0.9503041 * e) /
                                            p
                                    )),
                                    [116 * r - 16, 500 * (a - r), 200 * (r - t)]
                                );
                            }),
                            (N = function (e) {
                                return 0.04045 >= (e /= 255)
                                    ? e / 12.92
                                    : Z((e + 0.055) / 1.055, 2.4);
                            }),
                            (M = function (e) {
                                return 0.008856 < e
                                    ? Z(e, 1 / 3)
                                    : 7.787037 * e + 4 / 29;
                            }),
                            (O = function () {
                                var e, f, d, a, t, r, n;
                                return (
                                    (r = K(arguments)),
                                    (t = r[0]),
                                    (d = r[1]),
                                    (f = r[2]),
                                    (n = T(t, d, f)),
                                    (a = n[0]),
                                    (e = n[1]),
                                    (f = n[2]),
                                    C(a, e, f)
                                );
                            }),
                            (y.scale = function (e, r) {
                                var t,
                                    s,
                                    f,
                                    i,
                                    o,
                                    c,
                                    b,
                                    h,
                                    g,
                                    u,
                                    p,
                                    m,
                                    x,
                                    _,
                                    w,
                                    j,
                                    v,
                                    q,
                                    k,
                                    C,
                                    z;
                                return (
                                    (j = 'rgb'),
                                    (v = y('#ccc')),
                                    (z = 0),
                                    (x = !1),
                                    (m = [0, 1]),
                                    (u = []),
                                    (k = !1),
                                    (C = []),
                                    (w = 0),
                                    (_ = 1),
                                    (p = !1),
                                    (q = 0),
                                    (g = {}),
                                    (c = function (e, f) {
                                        var d, a, r, t, n, l, s;
                                        if (
                                            (null == e &&
                                                (e = ['#ddd', '#222']),
                                            null != e &&
                                                'string' === D(e) &&
                                                null !=
                                                    (null == (n = y.brewer)
                                                        ? void 0
                                                        : n[e]) &&
                                                (e = y.brewer[e]),
                                            'array' === D(e))
                                        ) {
                                            for (
                                                e = e.slice(0),
                                                    d = r = 0,
                                                    l = e.length - 1;
                                                0 <= l ? r <= l : r >= l;
                                                d = 0 <= l ? ++r : --r
                                            )
                                                (a = e[d]),
                                                    'string' === D(a) &&
                                                        (e[d] = y(a));
                                            if (null != f) C = f;
                                            else
                                                for (
                                                    C = [],
                                                        d = t = 0,
                                                        s = e.length - 1;
                                                    0 <= s ? t <= s : t >= s;
                                                    d = 0 <= s ? ++t : --t
                                                )
                                                    C.push(d / (e.length - 1));
                                        }
                                        return o(), (u = e);
                                    }),
                                    (b = function (e) {
                                        return (
                                            null == e && (e = []),
                                            (m = e),
                                            (w = e[0]),
                                            (_ = e[e.length - 1]),
                                            o(),
                                            (q =
                                                2 === e.length
                                                    ? 0
                                                    : e.length - 1)
                                        );
                                    }),
                                    (f = function (e) {
                                        var f, d;
                                        if (null != m) {
                                            for (
                                                d = m.length - 1, f = 0;
                                                f < d && e >= m[f];

                                            )
                                                f++;
                                            return f - 1;
                                        }
                                        return 0;
                                    }),
                                    (h = function (e) {
                                        return e;
                                    }),
                                    (t = function (e) {
                                        var d, a, r, t, n;
                                        return (
                                            (n = e),
                                            2 < m.length &&
                                                ((t = m.length - 1),
                                                (d = f(e)),
                                                (r =
                                                    m[0] +
                                                    (m[1] - m[0]) *
                                                        (0 + 0.5 * z)),
                                                (a =
                                                    m[t - 1] +
                                                    (m[t] - m[t - 1]) *
                                                        (1 - 0.5 * z)),
                                                (n =
                                                    w +
                                                    ((m[d] +
                                                        0.5 *
                                                            (m[d + 1] - m[d]) -
                                                        r) /
                                                        (a - r)) *
                                                        (_ - w))),
                                            n
                                        );
                                    }),
                                    (i = function (e, d) {
                                        var r, s, o, c, i, b, p, t, x;
                                        if ((null == d && (d = !1), isNaN(e)))
                                            return v;
                                        if (
                                            (d
                                                ? (p = e)
                                                : 2 < m.length
                                                ? ((r = f(e)),
                                                  (p = r / (q - 1)))
                                                : ((p = o =
                                                      w === _
                                                          ? 0
                                                          : (e - w) / (_ - w)),
                                                  (p = o = (e - w) / (_ - w)),
                                                  (p = a(1, n(0, p)))),
                                            d || (p = h(p)),
                                            (i = l(1e4 * p)),
                                            g[i])
                                        )
                                            s = g[i];
                                        else {
                                            if ('array' === D(u))
                                                for (
                                                    c = t = 0, x = C.length - 1;
                                                    0 <= x ? t <= x : t >= x;
                                                    c = 0 <= x ? ++t : --t
                                                ) {
                                                    if (((b = C[c]), p <= b)) {
                                                        s = u[c];
                                                        break;
                                                    }
                                                    if (
                                                        p >= b &&
                                                        c === C.length - 1
                                                    ) {
                                                        s = u[c];
                                                        break;
                                                    }
                                                    if (p > b && p < C[c + 1]) {
                                                        (p =
                                                            (p - b) /
                                                            (C[c + 1] - b)),
                                                            (s = y.interpolate(
                                                                u[c],
                                                                u[c + 1],
                                                                p,
                                                                j
                                                            ));
                                                        break;
                                                    }
                                                }
                                            else
                                                'function' === D(u) &&
                                                    (s = u(p));
                                            g[i] = s;
                                        }
                                        return s;
                                    }),
                                    (o = function () {
                                        return (g = {});
                                    }),
                                    c(e, r),
                                    (s = function (e) {
                                        var f;
                                        return (
                                            (f = i(e)), k && f[k] ? f[k]() : f
                                        );
                                    }),
                                    (s.domain = function (e, f, a, r) {
                                        var t;
                                        return (null == a && (a = 'e'),
                                        !arguments.length)
                                            ? m
                                            : (null != f &&
                                                  ((t = y.analyze(e, r)),
                                                  (e =
                                                      0 === f
                                                          ? [t.min, t.max]
                                                          : y.limits(t, a, f))),
                                              b(e),
                                              s);
                                    }),
                                    (s.mode = function (e) {
                                        return arguments.length
                                            ? ((j = e), o(), s)
                                            : j;
                                    }),
                                    (s.range = function (e, f) {
                                        return c(e, f), s;
                                    }),
                                    (s.out = function (e) {
                                        return (k = e), s;
                                    }),
                                    (s.spread = function (e) {
                                        return arguments.length
                                            ? ((z = e), s)
                                            : z;
                                    }),
                                    (s.correctLightness = function (e) {
                                        return arguments.length
                                            ? ((p = e),
                                              o(),
                                              (h = p
                                                  ? function (e) {
                                                        var f,
                                                            a,
                                                            r,
                                                            t,
                                                            n,
                                                            l,
                                                            s,
                                                            o,
                                                            c;
                                                        for (
                                                            f = i(
                                                                0,
                                                                !0
                                                            ).lab()[0],
                                                                a = i(
                                                                    1,
                                                                    !0
                                                                ).lab()[0],
                                                                s = f > a,
                                                                r = i(
                                                                    e,
                                                                    !0
                                                                ).lab()[0],
                                                                n =
                                                                    f +
                                                                    (a - f) * e,
                                                                t = r - n,
                                                                o = 0,
                                                                c = 1,
                                                                l = 20;
                                                            0.01 < d(t) &&
                                                            0 < l--;

                                                        )
                                                            (function () {
                                                                return (
                                                                    s &&
                                                                        (t *=
                                                                            -1),
                                                                    0 > t
                                                                        ? ((o =
                                                                              e),
                                                                          (e +=
                                                                              0.5 *
                                                                              (c -
                                                                                  e)))
                                                                        : ((c =
                                                                              e),
                                                                          (e +=
                                                                              0.5 *
                                                                              (o -
                                                                                  e))),
                                                                    (r = i(
                                                                        e,
                                                                        !0
                                                                    ).lab()[0]),
                                                                    (t = r - n)
                                                                );
                                                            })();
                                                        return e;
                                                    }
                                                  : function (e) {
                                                        return e;
                                                    }),
                                              s)
                                            : p;
                                    }),
                                    (s.colors = function (f) {
                                        var d, a, r, t, n, l;
                                        if (
                                            (null == f && (f = 'hex'),
                                            (e = []),
                                            (a = []),
                                            2 < m.length)
                                        )
                                            for (
                                                d = r = 1, l = m.length;
                                                1 <= l ? r < l : r > l;
                                                d = 1 <= l ? ++r : --r
                                            )
                                                a.push(0.5 * (m[d - 1] + m[d]));
                                        else a = m;
                                        for (t = 0, n = a.length; t < n; t++)
                                            (d = a[t]), e.push(s(d)[f]());
                                        return e;
                                    }),
                                    s
                                );
                            }),
                            null == (W = y.scales) && (y.scales = {}),
                            (y.scales.cool = function () {
                                return y.scale([
                                    y.hsl(180, 1, 0.9),
                                    y.hsl(250, 0.7, 0.4),
                                ]);
                            }),
                            (y.scales.hot = function () {
                                return y
                                    .scale(
                                        ['#000', '#f00', '#ff0', '#fff'],
                                        [0, 0.25, 0.75, 1]
                                    )
                                    .mode('rgb');
                            }),
                            (y.analyze = function (e, f, d) {
                                var a, t, n, r, l, s, i;
                                if (
                                    ((n = {
                                        min: F,
                                        max: -1 * F,
                                        sum: 0,
                                        values: [],
                                        count: 0,
                                    }),
                                    null == d &&
                                        (d = function () {
                                            return !0;
                                        }),
                                    (a = function (e) {
                                        null == e ||
                                            isNaN(e) ||
                                            (n.values.push(e),
                                            (n.sum += e),
                                            e < n.min && (n.min = e),
                                            e > n.max && (n.max = e),
                                            (n.count += 1));
                                    }),
                                    (l = function (e, r) {
                                        if (d(e, r))
                                            return null != f &&
                                                'function' === D(f)
                                                ? a(f(e))
                                                : (null != f &&
                                                      'string' === D(f)) ||
                                                  'number' === D(f)
                                                ? a(e[f])
                                                : a(e);
                                    }),
                                    'array' === D(e))
                                )
                                    for (s = 0, i = e.length; s < i; s++)
                                        (r = e[s]), l(r);
                                else for (t in e) (r = e[t]), l(r, t);
                                return (
                                    (n.domain = [n.min, n.max]),
                                    (n.limits = function (e, f) {
                                        return y.limits(n, e, f);
                                    }),
                                    n
                                );
                            }),
                            (y.limits = function (e, f, a) {
                                var r,
                                    t,
                                    s,
                                    o,
                                    c,
                                    b,
                                    h,
                                    i,
                                    g,
                                    u,
                                    m,
                                    x,
                                    _,
                                    w,
                                    j,
                                    v,
                                    n,
                                    k,
                                    q,
                                    p,
                                    C,
                                    z,
                                    U,
                                    B,
                                    G,
                                    S,
                                    P,
                                    R,
                                    A,
                                    L,
                                    Y,
                                    E,
                                    T,
                                    O,
                                    N,
                                    X,
                                    K,
                                    M,
                                    V,
                                    W,
                                    I,
                                    J,
                                    H,
                                    $,
                                    Q,
                                    ee,
                                    fe,
                                    de,
                                    ae,
                                    re,
                                    te,
                                    ne,
                                    le,
                                    se,
                                    ie,
                                    oe,
                                    ce = Math.log,
                                    be = Math.LOG10E;
                                if (
                                    (null == f && (f = 'equal'),
                                    null == a && (a = 7),
                                    'array' === D(e) && (e = y.analyze(e)),
                                    (_ = e.min),
                                    (m = e.max),
                                    (U = e.sum),
                                    (S = e.values.sort(function (e, f) {
                                        return e - f;
                                    })),
                                    (u = []),
                                    'c' === f.substr(0, 1) &&
                                        (u.push(_), u.push(m)),
                                    'e' === f.substr(0, 1))
                                ) {
                                    for (
                                        u.push(_), h = P = 1, K = a - 1;
                                        1 <= K ? P <= K : P >= K;
                                        h = 1 <= K ? ++P : --P
                                    )
                                        u.push(_ + (h / a) * (m - _));
                                    u.push(m);
                                } else if ('l' === f.substr(0, 1)) {
                                    if (0 >= _)
                                        throw 'Logarithmic scales are only possible for values > 0';
                                    for (
                                        w = be * ce(_),
                                            x = be * ce(m),
                                            u.push(_),
                                            ((h = R = 1), ($ = a - 1));
                                        1 <= $ ? R <= $ : R >= $;
                                        h = 1 <= $ ? ++R : --R
                                    )
                                        u.push(Z(10, w + (h / a) * (x - w)));
                                    u.push(m);
                                } else if ('q' === f.substr(0, 1)) {
                                    for (
                                        u.push(_), h = A = 1, Q = a - 1;
                                        1 <= Q ? A <= Q : A >= Q;
                                        h = 1 <= Q ? ++A : --A
                                    )
                                        (q = (S.length * h) / a),
                                            (p = l(q)),
                                            p === q
                                                ? u.push(S[p])
                                                : ((C = q - p),
                                                  u.push(
                                                      S[p] * C +
                                                          S[p + 1] * (1 - C)
                                                  ));
                                    u.push(m);
                                } else if ('k' === f.substr(0, 1)) {
                                    for (
                                        v = S.length,
                                            r = Array(v),
                                            c = Array(a),
                                            z = !0,
                                            n = 0,
                                            s = null,
                                            s = [],
                                            s.push(_),
                                            ((h = L = 1), (ee = a - 1));
                                        1 <= ee ? L <= ee : L >= ee;
                                        h = 1 <= ee ? ++L : --L
                                    )
                                        s.push(_ + (h / a) * (m - _));
                                    for (s.push(m); z; ) {
                                        for (
                                            i = Y = 0, fe = a - 1;
                                            0 <= fe ? Y <= fe : Y >= fe;
                                            i = 0 <= fe ? ++Y : --Y
                                        )
                                            c[i] = 0;
                                        for (
                                            h = E = 0, de = v - 1;
                                            0 <= de ? E <= de : E >= de;
                                            h = 0 <= de ? ++E : --E
                                        ) {
                                            for (
                                                G = S[h],
                                                    j = F,
                                                    ((i = T = 0), (ae = a - 1));
                                                0 <= ae ? T <= ae : T >= ae;
                                                i = 0 <= ae ? ++T : --T
                                            )
                                                (b = d(s[i] - G)),
                                                    b < j && ((j = b), (t = i));
                                            c[t]++, (r[h] = t);
                                        }
                                        for (
                                            k = Array(a), i = O = 0, re = a - 1;
                                            0 <= re ? O <= re : O >= re;
                                            i = 0 <= re ? ++O : --O
                                        )
                                            k[i] = null;
                                        for (
                                            h = N = 0, te = v - 1;
                                            0 <= te ? N <= te : N >= te;
                                            h = 0 <= te ? ++N : --N
                                        )
                                            (o = r[h]),
                                                null === k[o]
                                                    ? (k[o] = S[h])
                                                    : (k[o] += S[h]);
                                        for (
                                            i = X = 0, M = a - 1;
                                            0 <= M ? X <= M : X >= M;
                                            i = 0 <= M ? ++X : --X
                                        )
                                            k[i] *= 1 / c[i];
                                        for (
                                            z = !1, i = ne = 0, V = a - 1;
                                            0 <= V ? ne <= V : ne >= V;
                                            i = 0 <= V ? ++ne : --ne
                                        )
                                            if (k[i] !== s[h]) {
                                                z = !0;
                                                break;
                                            }
                                        (s = k), n++, 200 < n && (z = !1);
                                    }
                                    for (
                                        g = {}, i = le = 0, W = a - 1;
                                        0 <= W ? le <= W : le >= W;
                                        i = 0 <= W ? ++le : --le
                                    )
                                        g[i] = [];
                                    for (
                                        h = se = 0, I = v - 1;
                                        0 <= I ? se <= I : se >= I;
                                        h = 0 <= I ? ++se : --se
                                    )
                                        (o = r[h]), g[o].push(S[h]);
                                    for (
                                        B = [], i = ie = 0, J = a - 1;
                                        0 <= J ? ie <= J : ie >= J;
                                        i = 0 <= J ? ++ie : --ie
                                    )
                                        B.push(g[i][0]),
                                            B.push(g[i][g[i].length - 1]);
                                    for (
                                        B = B.sort(function (e, f) {
                                            return e - f;
                                        }),
                                            u.push(B[0]),
                                            ((h = oe = 1), (H = B.length - 1));
                                        oe <= H;
                                        h = oe += 2
                                    )
                                        isNaN(B[h]) || u.push(B[h]);
                                }
                                return u;
                            }),
                            (y.brewer = g =
                                {
                                    OrRd: [
                                        '#fff7ec',
                                        '#fee8c8',
                                        '#fdd49e',
                                        '#fdbb84',
                                        '#fc8d59',
                                        '#ef6548',
                                        '#d7301f',
                                        '#b30000',
                                        '#7f0000',
                                    ],
                                    PuBu: [
                                        '#fff7fb',
                                        '#ece7f2',
                                        '#d0d1e6',
                                        '#a6bddb',
                                        '#74a9cf',
                                        '#3690c0',
                                        '#0570b0',
                                        '#045a8d',
                                        '#023858',
                                    ],
                                    BuPu: [
                                        '#f7fcfd',
                                        '#e0ecf4',
                                        '#bfd3e6',
                                        '#9ebcda',
                                        '#8c96c6',
                                        '#8c6bb1',
                                        '#88419d',
                                        '#810f7c',
                                        '#4d004b',
                                    ],
                                    Oranges: [
                                        '#fff5eb',
                                        '#fee6ce',
                                        '#fdd0a2',
                                        '#fdae6b',
                                        '#fd8d3c',
                                        '#f16913',
                                        '#d94801',
                                        '#a63603',
                                        '#7f2704',
                                    ],
                                    BuGn: [
                                        '#f7fcfd',
                                        '#e5f5f9',
                                        '#ccece6',
                                        '#99d8c9',
                                        '#66c2a4',
                                        '#41ae76',
                                        '#238b45',
                                        '#006d2c',
                                        '#00441b',
                                    ],
                                    YlOrBr: [
                                        '#ffffe5',
                                        '#fff7bc',
                                        '#fee391',
                                        '#fec44f',
                                        '#fe9929',
                                        '#ec7014',
                                        '#cc4c02',
                                        '#993404',
                                        '#662506',
                                    ],
                                    YlGn: [
                                        '#ffffe5',
                                        '#f7fcb9',
                                        '#d9f0a3',
                                        '#addd8e',
                                        '#78c679',
                                        '#41ab5d',
                                        '#238443',
                                        '#006837',
                                        '#004529',
                                    ],
                                    Reds: [
                                        '#fff5f0',
                                        '#fee0d2',
                                        '#fcbba1',
                                        '#fc9272',
                                        '#fb6a4a',
                                        '#ef3b2c',
                                        '#cb181d',
                                        '#a50f15',
                                        '#67000d',
                                    ],
                                    RdPu: [
                                        '#fff7f3',
                                        '#fde0dd',
                                        '#fcc5c0',
                                        '#fa9fb5',
                                        '#f768a1',
                                        '#dd3497',
                                        '#ae017e',
                                        '#7a0177',
                                        '#49006a',
                                    ],
                                    Greens: [
                                        '#f7fcf5',
                                        '#e5f5e0',
                                        '#c7e9c0',
                                        '#a1d99b',
                                        '#74c476',
                                        '#41ab5d',
                                        '#238b45',
                                        '#006d2c',
                                        '#00441b',
                                    ],
                                    YlGnBu: [
                                        '#ffffd9',
                                        '#edf8b1',
                                        '#c7e9b4',
                                        '#7fcdbb',
                                        '#41b6c4',
                                        '#1d91c0',
                                        '#225ea8',
                                        '#253494',
                                        '#081d58',
                                    ],
                                    Purples: [
                                        '#fcfbfd',
                                        '#efedf5',
                                        '#dadaeb',
                                        '#bcbddc',
                                        '#9e9ac8',
                                        '#807dba',
                                        '#6a51a3',
                                        '#54278f',
                                        '#3f007d',
                                    ],
                                    GnBu: [
                                        '#f7fcf0',
                                        '#e0f3db',
                                        '#ccebc5',
                                        '#a8ddb5',
                                        '#7bccc4',
                                        '#4eb3d3',
                                        '#2b8cbe',
                                        '#0868ac',
                                        '#084081',
                                    ],
                                    Greys: [
                                        '#ffffff',
                                        '#f0f0f0',
                                        '#d9d9d9',
                                        '#bdbdbd',
                                        '#969696',
                                        '#737373',
                                        '#525252',
                                        '#252525',
                                        '#000000',
                                    ],
                                    YlOrRd: [
                                        '#ffffcc',
                                        '#ffeda0',
                                        '#fed976',
                                        '#feb24c',
                                        '#fd8d3c',
                                        '#fc4e2a',
                                        '#e31a1c',
                                        '#bd0026',
                                        '#800026',
                                    ],
                                    PuRd: [
                                        '#f7f4f9',
                                        '#e7e1ef',
                                        '#d4b9da',
                                        '#c994c7',
                                        '#df65b0',
                                        '#e7298a',
                                        '#ce1256',
                                        '#980043',
                                        '#67001f',
                                    ],
                                    Blues: [
                                        '#f7fbff',
                                        '#deebf7',
                                        '#c6dbef',
                                        '#9ecae1',
                                        '#6baed6',
                                        '#4292c6',
                                        '#2171b5',
                                        '#08519c',
                                        '#08306b',
                                    ],
                                    PuBuGn: [
                                        '#fff7fb',
                                        '#ece2f0',
                                        '#d0d1e6',
                                        '#a6bddb',
                                        '#67a9cf',
                                        '#3690c0',
                                        '#02818a',
                                        '#016c59',
                                        '#014636',
                                    ],
                                    Spectral: [
                                        '#9e0142',
                                        '#d53e4f',
                                        '#f46d43',
                                        '#fdae61',
                                        '#fee08b',
                                        '#ffffbf',
                                        '#e6f598',
                                        '#abdda4',
                                        '#66c2a5',
                                        '#3288bd',
                                        '#5e4fa2',
                                    ],
                                    RdYlGn: [
                                        '#a50026',
                                        '#d73027',
                                        '#f46d43',
                                        '#fdae61',
                                        '#fee08b',
                                        '#ffffbf',
                                        '#d9ef8b',
                                        '#a6d96a',
                                        '#66bd63',
                                        '#1a9850',
                                        '#006837',
                                    ],
                                    RdBu: [
                                        '#67001f',
                                        '#b2182b',
                                        '#d6604d',
                                        '#f4a582',
                                        '#fddbc7',
                                        '#f7f7f7',
                                        '#d1e5f0',
                                        '#92c5de',
                                        '#4393c3',
                                        '#2166ac',
                                        '#053061',
                                    ],
                                    PiYG: [
                                        '#8e0152',
                                        '#c51b7d',
                                        '#de77ae',
                                        '#f1b6da',
                                        '#fde0ef',
                                        '#f7f7f7',
                                        '#e6f5d0',
                                        '#b8e186',
                                        '#7fbc41',
                                        '#4d9221',
                                        '#276419',
                                    ],
                                    PRGn: [
                                        '#40004b',
                                        '#762a83',
                                        '#9970ab',
                                        '#c2a5cf',
                                        '#e7d4e8',
                                        '#f7f7f7',
                                        '#d9f0d3',
                                        '#a6dba0',
                                        '#5aae61',
                                        '#1b7837',
                                        '#00441b',
                                    ],
                                    RdYlBu: [
                                        '#a50026',
                                        '#d73027',
                                        '#f46d43',
                                        '#fdae61',
                                        '#fee090',
                                        '#ffffbf',
                                        '#e0f3f8',
                                        '#abd9e9',
                                        '#74add1',
                                        '#4575b4',
                                        '#313695',
                                    ],
                                    BrBG: [
                                        '#543005',
                                        '#8c510a',
                                        '#bf812d',
                                        '#dfc27d',
                                        '#f6e8c3',
                                        '#f5f5f5',
                                        '#c7eae5',
                                        '#80cdc1',
                                        '#35978f',
                                        '#01665e',
                                        '#003c30',
                                    ],
                                    RdGy: [
                                        '#67001f',
                                        '#b2182b',
                                        '#d6604d',
                                        '#f4a582',
                                        '#fddbc7',
                                        '#ffffff',
                                        '#e0e0e0',
                                        '#bababa',
                                        '#878787',
                                        '#4d4d4d',
                                        '#1a1a1a',
                                    ],
                                    PuOr: [
                                        '#7f3b08',
                                        '#b35806',
                                        '#e08214',
                                        '#fdb863',
                                        '#fee0b6',
                                        '#f7f7f7',
                                        '#d8daeb',
                                        '#b2abd2',
                                        '#8073ac',
                                        '#542788',
                                        '#2d004b',
                                    ],
                                    Set2: [
                                        '#66c2a5',
                                        '#fc8d62',
                                        '#8da0cb',
                                        '#e78ac3',
                                        '#a6d854',
                                        '#ffd92f',
                                        '#e5c494',
                                        '#b3b3b3',
                                    ],
                                    Accent: [
                                        '#7fc97f',
                                        '#beaed4',
                                        '#fdc086',
                                        '#ffff99',
                                        '#386cb0',
                                        '#f0027f',
                                        '#bf5b17',
                                        '#666666',
                                    ],
                                    Set1: [
                                        '#e41a1c',
                                        '#377eb8',
                                        '#4daf4a',
                                        '#984ea3',
                                        '#ff7f00',
                                        '#ffff33',
                                        '#a65628',
                                        '#f781bf',
                                        '#999999',
                                    ],
                                    Set3: [
                                        '#8dd3c7',
                                        '#ffffb3',
                                        '#bebada',
                                        '#fb8072',
                                        '#80b1d3',
                                        '#fdb462',
                                        '#b3de69',
                                        '#fccde5',
                                        '#d9d9d9',
                                        '#bc80bd',
                                        '#ccebc5',
                                        '#ffed6f',
                                    ],
                                    Dark2: [
                                        '#1b9e77',
                                        '#d95f02',
                                        '#7570b3',
                                        '#e7298a',
                                        '#66a61e',
                                        '#e6ab02',
                                        '#a6761d',
                                        '#666666',
                                    ],
                                    Paired: [
                                        '#a6cee3',
                                        '#1f78b4',
                                        '#b2df8a',
                                        '#33a02c',
                                        '#fb9a99',
                                        '#e31a1c',
                                        '#fdbf6f',
                                        '#ff7f00',
                                        '#cab2d6',
                                        '#6a3d9a',
                                        '#ffff99',
                                        '#b15928',
                                    ],
                                    Pastel2: [
                                        '#b3e2cd',
                                        '#fdcdac',
                                        '#cbd5e8',
                                        '#f4cae4',
                                        '#e6f5c9',
                                        '#fff2ae',
                                        '#f1e2cc',
                                        '#cccccc',
                                    ],
                                    Pastel1: [
                                        '#fbb4ae',
                                        '#b3cde3',
                                        '#ccebc5',
                                        '#decbe4',
                                        '#fed9a6',
                                        '#ffffcc',
                                        '#e5d8bd',
                                        '#fddaec',
                                        '#f2f2f2',
                                    ],
                                }),
                            (y.colors = m =
                                {
                                    indigo: '#4b0082',
                                    gold: '#ffd700',
                                    hotpink: '#ff69b4',
                                    firebrick: '#b22222',
                                    indianred: '#cd5c5c',
                                    yellow: '#ffff00',
                                    mistyrose: '#ffe4e1',
                                    darkolivegreen: '#556b2f',
                                    olive: '#808000',
                                    darkseagreen: '#8fbc8f',
                                    pink: '#ffc0cb',
                                    tomato: '#ff6347',
                                    lightcoral: '#f08080',
                                    orangered: '#ff4500',
                                    navajowhite: '#ffdead',
                                    lime: '#00ff00',
                                    palegreen: '#98fb98',
                                    darkslategrey: '#2f4f4f',
                                    greenyellow: '#adff2f',
                                    burlywood: '#deb887',
                                    seashell: '#fff5ee',
                                    mediumspringgreen: '#00fa9a',
                                    fuchsia: '#ff00ff',
                                    papayawhip: '#ffefd5',
                                    blanchedalmond: '#ffebcd',
                                    chartreuse: '#7fff00',
                                    dimgray: '#696969',
                                    black: '#000000',
                                    peachpuff: '#ffdab9',
                                    springgreen: '#00ff7f',
                                    aquamarine: '#7fffd4',
                                    white: '#ffffff',
                                    orange: '#ffa500',
                                    lightsalmon: '#ffa07a',
                                    darkslategray: '#2f4f4f',
                                    brown: '#a52a2a',
                                    ivory: '#fffff0',
                                    dodgerblue: '#1e90ff',
                                    peru: '#cd853f',
                                    lawngreen: '#7cfc00',
                                    chocolate: '#d2691e',
                                    crimson: '#dc143c',
                                    forestgreen: '#228b22',
                                    darkgrey: '#a9a9a9',
                                    lightseagreen: '#20b2aa',
                                    cyan: '#00ffff',
                                    mintcream: '#f5fffa',
                                    silver: '#c0c0c0',
                                    antiquewhite: '#faebd7',
                                    mediumorchid: '#ba55d3',
                                    skyblue: '#87ceeb',
                                    gray: '#808080',
                                    darkturquoise: '#00ced1',
                                    goldenrod: '#daa520',
                                    darkgreen: '#006400',
                                    floralwhite: '#fffaf0',
                                    darkviolet: '#9400d3',
                                    darkgray: '#a9a9a9',
                                    moccasin: '#ffe4b5',
                                    saddlebrown: '#8b4513',
                                    grey: '#808080',
                                    darkslateblue: '#483d8b',
                                    lightskyblue: '#87cefa',
                                    lightpink: '#ffb6c1',
                                    mediumvioletred: '#c71585',
                                    slategrey: '#708090',
                                    red: '#ff0000',
                                    deeppink: '#ff1493',
                                    limegreen: '#32cd32',
                                    darkmagenta: '#8b008b',
                                    palegoldenrod: '#eee8aa',
                                    plum: '#dda0dd',
                                    turquoise: '#40e0d0',
                                    lightgrey: '#d3d3d3',
                                    lightgoldenrodyellow: '#fafad2',
                                    darkgoldenrod: '#b8860b',
                                    lavender: '#e6e6fa',
                                    maroon: '#800000',
                                    yellowgreen: '#9acd32',
                                    sandybrown: '#f4a460',
                                    thistle: '#d8bfd8',
                                    violet: '#ee82ee',
                                    navy: '#000080',
                                    magenta: '#ff00ff',
                                    dimgrey: '#696969',
                                    tan: '#d2b48c',
                                    rosybrown: '#bc8f8f',
                                    olivedrab: '#6b8e23',
                                    blue: '#0000ff',
                                    lightblue: '#add8e6',
                                    ghostwhite: '#f8f8ff',
                                    honeydew: '#f0fff0',
                                    cornflowerblue: '#6495ed',
                                    slateblue: '#6a5acd',
                                    linen: '#faf0e6',
                                    darkblue: '#00008b',
                                    powderblue: '#b0e0e6',
                                    seagreen: '#2e8b57',
                                    darkkhaki: '#bdb76b',
                                    snow: '#fffafa',
                                    sienna: '#a0522d',
                                    mediumblue: '#0000cd',
                                    royalblue: '#4169e1',
                                    lightcyan: '#e0ffff',
                                    green: '#008000',
                                    mediumpurple: '#9370db',
                                    midnightblue: '#191970',
                                    cornsilk: '#fff8dc',
                                    paleturquoise: '#afeeee',
                                    bisque: '#ffe4c4',
                                    slategray: '#708090',
                                    darkcyan: '#008b8b',
                                    khaki: '#f0e68c',
                                    wheat: '#f5deb3',
                                    teal: '#008080',
                                    darkorchid: '#9932cc',
                                    deepskyblue: '#00bfff',
                                    salmon: '#fa8072',
                                    darkred: '#8b0000',
                                    steelblue: '#4682b4',
                                    palevioletred: '#db7093',
                                    lightslategray: '#778899',
                                    aliceblue: '#f0f8ff',
                                    lightslategrey: '#778899',
                                    lightgreen: '#90ee90',
                                    orchid: '#da70d6',
                                    gainsboro: '#dcdcdc',
                                    mediumseagreen: '#3cb371',
                                    lightgray: '#d3d3d3',
                                    mediumturquoise: '#48d1cc',
                                    lemonchiffon: '#fffacd',
                                    cadetblue: '#5f9ea0',
                                    lightyellow: '#ffffe0',
                                    lavenderblush: '#fff0f5',
                                    coral: '#ff7f50',
                                    purple: '#800080',
                                    aqua: '#00ffff',
                                    whitesmoke: '#f5f5f5',
                                    mediumslateblue: '#7b68ee',
                                    darkorange: '#ff8c00',
                                    mediumaquamarine: '#66cdaa',
                                    darksalmon: '#e9967a',
                                    beige: '#f5f5dc',
                                    blueviolet: '#8a2be2',
                                    azure: '#f0ffff',
                                    lightsteelblue: '#b0c4de',
                                    oldlace: '#fdf5e6',
                                }),
                            (D = (function () {
                                var e, f, d, a, r;
                                for (
                                    e = {},
                                        r = [
                                            'Boolean',
                                            'Number',
                                            'String',
                                            'Function',
                                            'Array',
                                            'Date',
                                            'RegExp',
                                            'Undefined',
                                            'Null',
                                        ],
                                        ((d = 0), (a = r.length));
                                    d < a;
                                    d++
                                )
                                    (f = r[d]),
                                        (e['[object ' + f + ']'] =
                                            f.toLowerCase());
                                return function (f) {
                                    var d;
                                    return (
                                        (d = Object.prototype.toString.call(f)),
                                        e[d] || 'object'
                                    );
                                };
                            })()),
                            (S = function (e, f, d) {
                                return (
                                    null == f && (f = 0),
                                    null == d && (d = 1),
                                    e < f && (e = f),
                                    e > d && (e = d),
                                    e
                                );
                            }),
                            (K = function (e) {
                                return 3 <= e.length ? e : e[0];
                            }),
                            (u = 2 * J),
                            (c = J / 3),
                            (x = I),
                            (b = function (e) {
                                var f, d, a, r, n, l, s, o, t, i, c;
                                return (
                                    (e = (function () {
                                        var f, d, a;
                                        for (
                                            a = [], f = 0, d = e.length;
                                            f < d;
                                            f++
                                        )
                                            (r = e[f]), a.push(y(r));
                                        return a;
                                    })()),
                                    2 === e.length
                                        ? ((t = (function () {
                                              var f, d, a;
                                              for (
                                                  a = [], f = 0, d = e.length;
                                                  f < d;
                                                  f++
                                              )
                                                  (r = e[f]), a.push(r.lab());
                                              return a;
                                          })()),
                                          (n = t[0]),
                                          (l = t[1]),
                                          (f = function (e) {
                                              var f, d;
                                              return (
                                                  (d = (function () {
                                                      var d, a;
                                                      for (
                                                          a = [], f = d = 0;
                                                          2 >= d;
                                                          f = ++d
                                                      )
                                                          a.push(
                                                              n[f] +
                                                                  e *
                                                                      (l[f] -
                                                                          n[f])
                                                          );
                                                      return a;
                                                  })()),
                                                  y.lab.apply(y, d)
                                              );
                                          }))
                                        : 3 === e.length
                                        ? ((i = (function () {
                                              var f, d, a;
                                              for (
                                                  a = [], f = 0, d = e.length;
                                                  f < d;
                                                  f++
                                              )
                                                  (r = e[f]), a.push(r.lab());
                                              return a;
                                          })()),
                                          (n = i[0]),
                                          (l = i[1]),
                                          (s = i[2]),
                                          (f = function (e) {
                                              var f, d;
                                              return (
                                                  (d = (function () {
                                                      var d, a;
                                                      for (
                                                          a = [], f = d = 0;
                                                          2 >= d;
                                                          f = ++d
                                                      )
                                                          a.push(
                                                              (1 - e) *
                                                                  (1 - e) *
                                                                  n[f] +
                                                                  2 *
                                                                      (1 - e) *
                                                                      e *
                                                                      l[f] +
                                                                  e * e * s[f]
                                                          );
                                                      return a;
                                                  })()),
                                                  y.lab.apply(y, d)
                                              );
                                          }))
                                        : 4 === e.length
                                        ? ((c = (function () {
                                              var f, d, a;
                                              for (
                                                  a = [], f = 0, d = e.length;
                                                  f < d;
                                                  f++
                                              )
                                                  (r = e[f]), a.push(r.lab());
                                              return a;
                                          })()),
                                          (n = c[0]),
                                          (l = c[1]),
                                          (s = c[2]),
                                          (o = c[3]),
                                          (f = function (e) {
                                              var f, d;
                                              return (
                                                  (d = (function () {
                                                      var d, a;
                                                      for (
                                                          a = [], f = d = 0;
                                                          2 >= d;
                                                          f = ++d
                                                      )
                                                          a.push(
                                                              (1 - e) *
                                                                  (1 - e) *
                                                                  (1 - e) *
                                                                  n[f] +
                                                                  3 *
                                                                      (1 - e) *
                                                                      (1 - e) *
                                                                      e *
                                                                      l[f] +
                                                                  3 *
                                                                      (1 - e) *
                                                                      e *
                                                                      e *
                                                                      s[f] +
                                                                  e *
                                                                      e *
                                                                      e *
                                                                      o[f]
                                                          );
                                                      return a;
                                                  })()),
                                                  y.lab.apply(y, d)
                                              );
                                          }))
                                        : 5 === e.length &&
                                          ((d = b(e.slice(0, 3))),
                                          (a = b(e.slice(2, 5))),
                                          (f = function (e) {
                                              return 0.5 > e
                                                  ? d(2 * e)
                                                  : a(2 * (e - 0.5));
                                          })),
                                    f
                                );
                            }),
                            (y.interpolate.bezier = b);
                    }.call(this));
                },
                {},
            ],
            '/Users/qrohlf/Code/trianglify/node_modules/delaunator/index.js': [
                function (e, a) {
                    'use strict';
                    function r(a, l, s) {
                        l || (l = m), s || (s = _);
                        for (
                            var u = Infinity,
                                w = Infinity,
                                j = -Infinity,
                                v = -Infinity,
                                C = (this.coords = []),
                                z = (this.ids = new Uint32Array(a.length)),
                                U = 0;
                            U < a.length;
                            U++
                        ) {
                            var i = a[U],
                                p = l(i),
                                x = s(i);
                            (z[U] = U),
                                (C[2 * U] = p),
                                (C[2 * U + 1] = x),
                                p < u && (u = p),
                                x < w && (w = x),
                                p > j && (j = p),
                                x > v && (v = x);
                        }
                        var y,
                            B,
                            G,
                            S = (u + j) / 2,
                            P = (w + v) / 2,
                            R = Infinity;
                        for (U = 0; U < a.length; U++) {
                            var A = t(S, P, C[2 * U], C[2 * U + 1]);
                            A < R && ((y = U), (R = A));
                        }
                        for (R = Infinity, U = 0; U < a.length; U++)
                            U !== y &&
                                ((A = t(
                                    C[2 * y],
                                    C[2 * y + 1],
                                    C[2 * U],
                                    C[2 * U + 1]
                                )),
                                A < R && 0 < A && ((B = U), (R = A)));
                        var d = Infinity;
                        for (U = 0; U < a.length; U++)
                            if (U !== y && U !== B) {
                                var L = o(
                                    C[2 * y],
                                    C[2 * y + 1],
                                    C[2 * B],
                                    C[2 * B + 1],
                                    C[2 * U],
                                    C[2 * U + 1]
                                );
                                L < d && ((G = U), (d = L));
                            }
                        if (d === Infinity)
                            throw new Error(
                                'No Delaunay triangulation exists for this input.'
                            );
                        if (
                            0 >
                            n(
                                C[2 * y],
                                C[2 * y + 1],
                                C[2 * B],
                                C[2 * B + 1],
                                C[2 * G],
                                C[2 * G + 1]
                            )
                        ) {
                            var r = B;
                            (B = G), (G = r);
                        }
                        var Y = C[2 * y],
                            E = C[2 * y + 1],
                            T = C[2 * B],
                            O = C[2 * B + 1],
                            N = C[2 * G],
                            X = C[2 * G + 1],
                            D = c(Y, E, T, O, N, X);
                        for (
                            this._cx = D.x,
                                this._cy = D.y,
                                g(z, C, 0, z.length - 1, D.x, D.y),
                                this._hashSize = Math.ceil(f(a.length)),
                                this._hash = [],
                                U = 0;
                            U < this._hashSize;
                            U++
                        )
                            this._hash[U] = null;
                        var K = (this.hull = b(C, y));
                        this._hashEdge(K),
                            (K.t = 0),
                            (K = b(C, B, K)),
                            this._hashEdge(K),
                            (K.t = 1),
                            (K = b(C, G, K)),
                            this._hashEdge(K),
                            (K.t = 2);
                        var e = 2 * a.length - 5,
                            M = (this.triangles = new Uint32Array(3 * e)),
                            V = (this.halfedges = new Int32Array(3 * e));
                        (this.trianglesLen = 0),
                            this._addTriangle(y, B, G, -1, -1, -1);
                        for (var W, F, I = 0; I < z.length; I++)
                            if (
                                ((U = z[I]),
                                (p = C[2 * U]),
                                (x = C[2 * U + 1]),
                                (p !== W || x !== F) &&
                                    ((W = p),
                                    (F = x),
                                    (p !== Y || x !== E) &&
                                        (p !== T || x !== O) &&
                                        (p !== N || x !== X)))
                            ) {
                                var k,
                                    Z = this._hashKey(p, x),
                                    J = Z;
                                do
                                    (k = this._hash[J]),
                                        (J = (J + 1) % this._hashSize);
                                while ((!k || k.removed) && J !== Z);
                                for (
                                    K = k;
                                    0 <= n(p, x, K.x, K.y, K.next.x, K.next.y);

                                )
                                    if (((K = K.next), K === k))
                                        throw new Error(
                                            'Something is wrong with the input points.'
                                        );
                                var H = K === k,
                                    $ = this._addTriangle(
                                        K.i,
                                        U,
                                        K.next.i,
                                        -1,
                                        -1,
                                        K.t
                                    );
                                (K.t = $),
                                    (K = b(C, U, K)),
                                    (K.t = this._legalize($ + 2)),
                                    K.prev.prev.t === V[$ + 1] &&
                                        (K.prev.prev.t = $ + 2);
                                for (
                                    var Q = K.next;
                                    0 > n(p, x, Q.x, Q.y, Q.next.x, Q.next.y);

                                )
                                    ($ = this._addTriangle(
                                        Q.i,
                                        U,
                                        Q.next.i,
                                        Q.prev.t,
                                        -1,
                                        Q.t
                                    )),
                                        (Q.prev.t = this._legalize($ + 2)),
                                        (this.hull = h(Q)),
                                        (Q = Q.next);
                                if (H)
                                    for (
                                        Q = K.prev;
                                        0 >
                                        n(p, x, Q.prev.x, Q.prev.y, Q.x, Q.y);

                                    )
                                        ($ = this._addTriangle(
                                            Q.prev.i,
                                            U,
                                            Q.i,
                                            -1,
                                            Q.t,
                                            Q.prev.t
                                        )),
                                            this._legalize($ + 2),
                                            (Q.prev.t = $),
                                            (this.hull = h(Q)),
                                            (Q = Q.prev);
                                this._hashEdge(K), this._hashEdge(K.prev);
                            }
                        (this.triangles = M.subarray(0, this.trianglesLen)),
                            (this.halfedges = V.subarray(0, this.trianglesLen));
                    }
                    function t(e, f, d, a) {
                        var r = e - d,
                            t = f - a;
                        return r * r + t * t;
                    }
                    function n(e, f, d, a, r, t) {
                        return (a - f) * (r - d) - (d - e) * (t - a);
                    }
                    function s(e, f, d, a, r, t, n, l) {
                        (e -= n),
                            (f -= l),
                            (d -= n),
                            (a -= l),
                            (r -= n),
                            (t -= l);
                        var s = e * e + f * f,
                            i = d * d + a * a,
                            o = r * r + t * t;
                        return (
                            0 >
                            e * (a * o - i * t) -
                                f * (d * o - i * r) +
                                s * (d * t - a * r)
                        );
                    }
                    function o(e, f, a, r, t, n) {
                        (a -= e), (r -= f), (t -= e), (n -= f);
                        var l = a * a + r * r,
                            s = t * t + n * n;
                        if (0 == l || 0 == s) return Infinity;
                        var i = a * n - r * t;
                        if (0 == i) return Infinity;
                        var d = (0.5 * (n * l - r * s)) / i,
                            o = (0.5 * (a * s - t * l)) / i;
                        return d * d + o * o;
                    }
                    function c(e, f, a, r, t, n) {
                        (a -= e), (r -= f), (t -= e), (n -= f);
                        var l = a * a + r * r,
                            s = t * t + n * n,
                            i = a * n - r * t,
                            d = (0.5 * (n * l - r * s)) / i,
                            o = (0.5 * (a * s - t * l)) / i;
                        return { x: e + d, y: f + o };
                    }
                    function b(e, f, d) {
                        var a = {
                            i: f,
                            x: e[2 * f],
                            y: e[2 * f + 1],
                            t: 0,
                            prev: null,
                            next: null,
                            removed: !1,
                        };
                        return (
                            d
                                ? ((a.next = d.next),
                                  (a.prev = d),
                                  (d.next.prev = a),
                                  (d.next = a))
                                : ((a.prev = a), (a.next = a)),
                            a
                        );
                    }
                    function h(e) {
                        return (
                            (e.prev.next = e.next),
                            (e.next.prev = e.prev),
                            (e.removed = !0),
                            e.prev
                        );
                    }
                    function g(e, f, d, a, r, t) {
                        var n, l, s;
                        if (20 >= a - d)
                            for (n = d + 1; n <= a; n++) {
                                for (
                                    s = e[n], l = n - 1;
                                    l >= d && 0 < u(f, e[l], s, r, t);

                                )
                                    e[l + 1] = e[l--];
                                e[l + 1] = s;
                            }
                        else {
                            for (
                                n = d + 1,
                                    l = a,
                                    p(e, (d + a) >> 1, n),
                                    0 < u(f, e[d], e[a], r, t) && p(e, d, a),
                                    0 < u(f, e[n], e[a], r, t) && p(e, n, a),
                                    0 < u(f, e[d], e[n], r, t) && p(e, d, n),
                                    s = e[n];
                                ;

                            ) {
                                do n++;
                                while (0 > u(f, e[n], s, r, t));
                                do l--;
                                while (0 < u(f, e[l], s, r, t));
                                if (l < n) break;
                                p(e, n, l);
                            }
                            (e[d + 1] = e[l]),
                                (e[l] = s),
                                a - n + 1 >= l - d
                                    ? (g(e, f, n, a, r, t),
                                      g(e, f, d, l - 1, r, t))
                                    : (g(e, f, d, l - 1, r, t),
                                      g(e, f, n, a, r, t));
                        }
                    }
                    function u(e, f, d, a, r) {
                        var n = t(e[2 * f], e[2 * f + 1], a, r),
                            l = t(e[2 * d], e[2 * d + 1], a, r);
                        return (
                            n - l ||
                            e[2 * f] - e[2 * d] ||
                            e[2 * f + 1] - e[2 * d + 1]
                        );
                    }
                    function p(e, f, d) {
                        var a = e[f];
                        (e[f] = e[d]), (e[d] = a);
                    }
                    function m(e) {
                        return e[0];
                    }
                    function _(e) {
                        return e[1];
                    }
                    (a.exports = r),
                        (r.prototype = {
                            _hashEdge: function (f) {
                                this._hash[this._hashKey(f.x, f.y)] = f;
                            },
                            _hashKey: function (e, f) {
                                var a = e - this._cx,
                                    r = f - this._cy,
                                    t = 1 - a / (d(a) + d(r));
                                return l(
                                    ((2 + (0 > r ? -t : t)) / 4) *
                                        this._hashSize
                                );
                            },
                            _legalize: function (e) {
                                var f = this.triangles,
                                    d = this.coords,
                                    a = this.halfedges,
                                    r = a[e],
                                    t = e - (e % 3),
                                    n = r - (r % 3),
                                    l = t + ((e + 2) % 3),
                                    i = n + ((r + 2) % 3),
                                    o = f[l],
                                    c = f[e],
                                    b = f[t + ((e + 1) % 3)],
                                    h = f[i],
                                    g = s(
                                        d[2 * o],
                                        d[2 * o + 1],
                                        d[2 * c],
                                        d[2 * c + 1],
                                        d[2 * b],
                                        d[2 * b + 1],
                                        d[2 * h],
                                        d[2 * h + 1]
                                    );
                                return g
                                    ? ((f[e] = h),
                                      (f[r] = o),
                                      this._link(e, a[i]),
                                      this._link(r, a[l]),
                                      this._link(l, i),
                                      this._legalize(e),
                                      this._legalize(n + ((r + 1) % 3)))
                                    : l;
                            },
                            _link: function (e, f) {
                                (this.halfedges[e] = f),
                                    -1 !== f && (this.halfedges[f] = e);
                            },
                            _addTriangle: function (e, f, d, r, a, n) {
                                var l = this.trianglesLen;
                                return (
                                    (this.triangles[l] = e),
                                    (this.triangles[l + 1] = f),
                                    (this.triangles[l + 2] = d),
                                    this._link(l, r),
                                    this._link(l + 1, a),
                                    this._link(l + 2, n),
                                    (this.trianglesLen += 3),
                                    l
                                );
                            },
                        });
                },
                {},
            ],
            '/Users/qrohlf/Code/trianglify/node_modules/process/browser.js': [
                function (e, f) {
                    function d() {
                        if (!n) {
                            n = !0;
                            for (var e, f = t.length; f; ) {
                                (e = t), (t = []);
                                for (var d = -1; ++d < f; ) e[d]();
                                f = t.length;
                            }
                            n = !1;
                        }
                    }
                    function a() {}
                    var r = (f.exports = {}),
                        t = [],
                        n = !1;
                    (r.nextTick = function (e) {
                        t.push(e), n || setTimeout(d, 0);
                    }),
                        (r.title = 'browser'),
                        (r.browser = !0),
                        (r.env = {}),
                        (r.argv = []),
                        (r.version = ''),
                        (r.versions = {}),
                        (r.on = a),
                        (r.addListener = a),
                        (r.once = a),
                        (r.off = a),
                        (r.removeListener = a),
                        (r.removeAllListeners = a),
                        (r.emit = a),
                        (r.binding = function () {
                            throw new Error('process.binding is not supported');
                        }),
                        (r.cwd = function () {
                            return '/';
                        }),
                        (r.chdir = function () {
                            throw new Error('process.chdir is not supported');
                        }),
                        (r.umask = function () {
                            return 0;
                        });
                },
                {},
            ],
            '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/index.js': [
                function (e, f) {
                    var d = e('./lib/alea'),
                        a = e('./lib/xor128'),
                        r = e('./lib/xorwow'),
                        t = e('./lib/xorshift7'),
                        n = e('./lib/xor4096'),
                        l = e('./lib/tychei'),
                        s = e('./seedrandom');
                    (s.alea = d),
                        (s.xor128 = a),
                        (s.xorwow = r),
                        (s.xorshift7 = t),
                        (s.xor4096 = n),
                        (s.tychei = l),
                        (f.exports = s);
                },
                {
                    './lib/alea':
                        '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/alea.js',
                    './lib/tychei':
                        '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/tychei.js',
                    './lib/xor128':
                        '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor128.js',
                    './lib/xor4096':
                        '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor4096.js',
                    './lib/xorshift7':
                        '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorshift7.js',
                    './lib/xorwow':
                        '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorwow.js',
                    './seedrandom':
                        '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/seedrandom.js',
                },
            ],
            '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/alea.js':
                [
                    function (f, d) {
                        (function (e, f, d) {
                            function a(e) {
                                var f = this,
                                    d = n();
                                (f.next = function () {
                                    var e =
                                        2091639 * f.s0 +
                                        2.3283064365386963e-10 * f.c;
                                    return (
                                        (f.s0 = f.s1),
                                        (f.s1 = f.s2),
                                        (f.s2 = e - (f.c = 0 | e))
                                    );
                                }),
                                    (f.c = 1),
                                    (f.s0 = d(' ')),
                                    (f.s1 = d(' ')),
                                    (f.s2 = d(' ')),
                                    (f.s0 -= d(e)),
                                    0 > f.s0 && (f.s0 += 1),
                                    (f.s1 -= d(e)),
                                    0 > f.s1 && (f.s1 += 1),
                                    (f.s2 -= d(e)),
                                    0 > f.s2 && (f.s2 += 1),
                                    (d = null);
                            }
                            function r(e, f) {
                                return (
                                    (f.c = e.c),
                                    (f.s0 = e.s0),
                                    (f.s1 = e.s1),
                                    (f.s2 = e.s2),
                                    f
                                );
                            }
                            function t(e, f) {
                                var d = new a(e),
                                    t = f && f.state,
                                    n = d.next;
                                return (
                                    (n.int32 = function () {
                                        return 0 | (4294967296 * d.next());
                                    }),
                                    (n.double = function () {
                                        return (
                                            n() +
                                            1.1102230246251565e-16 *
                                                (0 | (2097152 * n()))
                                        );
                                    }),
                                    (n.quick = n),
                                    t &&
                                        ('object' == typeof t && r(t, d),
                                        (n.state = function () {
                                            return r(d, {});
                                        })),
                                    n
                                );
                            }
                            function n() {
                                var e = 4022871197;
                                return function (f) {
                                    f = f.toString();
                                    for (var d = 0; d < f.length; d++) {
                                        e += f.charCodeAt(d);
                                        var a = 0.02519603282416938 * e;
                                        (e = a >>> 0),
                                            (a -= e),
                                            (a *= e),
                                            (e = a >>> 0),
                                            (a -= e),
                                            (e += 4294967296 * a);
                                    }
                                    return 2.3283064365386963e-10 * (e >>> 0);
                                };
                            }
                            f && f.exports
                                ? (f.exports = t)
                                : d && d.amd
                                ? d(function () {
                                      return t;
                                  })
                                : (this.alea = t);
                        })(
                            this,
                            'object' == typeof d && d,
                            'function' == typeof e && e
                        );
                    },
                    {},
                ],
            '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/tychei.js':
                [
                    function (f, d) {
                        (function (e, f, d) {
                            function a(e) {
                                var f = this,
                                    d = '';
                                (f.next = function () {
                                    var e = f.b,
                                        r = f.c,
                                        t = f.d,
                                        d = f.a;
                                    return (
                                        (e = (e << 25) ^ (e >>> 7) ^ r),
                                        (r = 0 | (r - t)),
                                        (t = (t << 24) ^ (t >>> 8) ^ d),
                                        (d = 0 | (d - e)),
                                        (f.b = e = (e << 20) ^ (e >>> 12) ^ r),
                                        (f.c = r = 0 | (r - t)),
                                        (f.d = (t << 16) ^ (r >>> 16) ^ d),
                                        (f.a = 0 | (d - e))
                                    );
                                }),
                                    (f.a = 0),
                                    (f.b = 0),
                                    (f.c = -1640531527),
                                    (f.d = 1367130551),
                                    e === l(e)
                                        ? ((f.a = 0 | (e / 4294967296)),
                                          (f.b = 0 | e))
                                        : (d += e);
                                for (var a = 0; a < d.length + 20; a++)
                                    (f.b ^= 0 | d.charCodeAt(a)), f.next();
                            }
                            function r(e, f) {
                                return (
                                    (f.a = e.a),
                                    (f.b = e.b),
                                    (f.c = e.c),
                                    (f.d = e.d),
                                    f
                                );
                            }
                            function t(e, f) {
                                var d = new a(e),
                                    t = f && f.state,
                                    n = function () {
                                        return (d.next() >>> 0) / 4294967296;
                                    };
                                return (
                                    (n.double = function () {
                                        do
                                            var e = d.next() >>> 11,
                                                f =
                                                    (d.next() >>> 0) /
                                                    4294967296,
                                                a = (e + f) / 2097152;
                                        while (0 === a);
                                        return a;
                                    }),
                                    (n.int32 = d.next),
                                    (n.quick = n),
                                    t &&
                                        ('object' == typeof t && r(t, d),
                                        (n.state = function () {
                                            return r(d, {});
                                        })),
                                    n
                                );
                            }
                            f && f.exports
                                ? (f.exports = t)
                                : d && d.amd
                                ? d(function () {
                                      return t;
                                  })
                                : (this.tychei = t);
                        })(
                            this,
                            'object' == typeof d && d,
                            'function' == typeof e && e
                        );
                    },
                    {},
                ],
            '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor128.js':
                [
                    function (f, d) {
                        (function (e, f, d) {
                            function a(e) {
                                var f = this,
                                    d = '';
                                (f.x = 0),
                                    (f.y = 0),
                                    (f.z = 0),
                                    (f.w = 0),
                                    (f.next = function () {
                                        var e = f.x ^ (f.x << 11);
                                        return (
                                            (f.x = f.y),
                                            (f.y = f.z),
                                            (f.z = f.w),
                                            (f.w ^=
                                                (f.w >>> 19) ^ e ^ (e >>> 8))
                                        );
                                    }),
                                    e === (0 | e) ? (f.x = e) : (d += e);
                                for (var a = 0; a < d.length + 64; a++)
                                    (f.x ^= 0 | d.charCodeAt(a)), f.next();
                            }
                            function r(e, f) {
                                return (
                                    (f.x = e.x),
                                    (f.y = e.y),
                                    (f.z = e.z),
                                    (f.w = e.w),
                                    f
                                );
                            }
                            function t(e, f) {
                                var d = new a(e),
                                    t = f && f.state,
                                    n = function () {
                                        return (d.next() >>> 0) / 4294967296;
                                    };
                                return (
                                    (n.double = function () {
                                        do
                                            var e = d.next() >>> 11,
                                                f =
                                                    (d.next() >>> 0) /
                                                    4294967296,
                                                a = (e + f) / 2097152;
                                        while (0 === a);
                                        return a;
                                    }),
                                    (n.int32 = d.next),
                                    (n.quick = n),
                                    t &&
                                        ('object' == typeof t && r(t, d),
                                        (n.state = function () {
                                            return r(d, {});
                                        })),
                                    n
                                );
                            }
                            f && f.exports
                                ? (f.exports = t)
                                : d && d.amd
                                ? d(function () {
                                      return t;
                                  })
                                : (this.xor128 = t);
                        })(
                            this,
                            'object' == typeof d && d,
                            'function' == typeof e && e
                        );
                    },
                    {},
                ],
            '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor4096.js':
                [
                    function (f, d) {
                        (function (e, f, d) {
                            function a(e) {
                                var f = this;
                                (f.next = function () {
                                    var e,
                                        d,
                                        a = f.w,
                                        r = f.X,
                                        t = f.i;
                                    return (
                                        (f.w = a = 0 | (a + 1640531527)),
                                        (d = r[127 & (t + 34)]),
                                        (e = r[(t = 127 & (t + 1))]),
                                        (d ^= d << 13),
                                        (e ^= e << 17),
                                        (d ^= d >>> 15),
                                        (e ^= e >>> 12),
                                        (d = r[t] = d ^ e),
                                        (f.i = t),
                                        0 | (d + (a ^ (a >>> 16)))
                                    );
                                }),
                                    (function (e, f) {
                                        var d,
                                            a,
                                            r,
                                            t,
                                            l,
                                            s = [],
                                            i = 128;
                                        for (
                                            f === (0 | f)
                                                ? ((a = f), (f = null))
                                                : ((f += '\0'),
                                                  (a = 0),
                                                  (i = n(i, f.length))),
                                                r = 0,
                                                t = -32;
                                            t < i;
                                            ++t
                                        )
                                            f &&
                                                (a ^= f.charCodeAt(
                                                    (t + 32) % f.length
                                                )),
                                                0 === t && (l = a),
                                                (a ^= a << 10),
                                                (a ^= a >>> 15),
                                                (a ^= a << 4),
                                                (a ^= a >>> 13),
                                                0 <= t &&
                                                    ((l = 0 | (l + 1640531527)),
                                                    (d = s[127 & t] ^= a + l),
                                                    (r = 0 == d ? r + 1 : 0));
                                        for (
                                            128 <= r &&
                                                (s[
                                                    127 & ((f && f.length) || 0)
                                                ] = -1),
                                                r = 127,
                                                t = 512;
                                            0 < t;
                                            --t
                                        )
                                            (a = s[127 & (r + 34)]),
                                                (d = s[(r = 127 & (r + 1))]),
                                                (a ^= a << 13),
                                                (d ^= d << 17),
                                                (a ^= a >>> 15),
                                                (d ^= d >>> 12),
                                                (s[r] = a ^ d);
                                        (e.w = l), (e.X = s), (e.i = r);
                                    })(f, e);
                            }
                            function r(e, f) {
                                return (
                                    (f.i = e.i),
                                    (f.w = e.w),
                                    (f.X = e.X.slice()),
                                    f
                                );
                            }
                            function t(e, f) {
                                null == e && (e = +new Date());
                                var d = new a(e),
                                    t = f && f.state,
                                    n = function () {
                                        return (d.next() >>> 0) / 4294967296;
                                    };
                                return (
                                    (n.double = function () {
                                        do
                                            var e = d.next() >>> 11,
                                                f =
                                                    (d.next() >>> 0) /
                                                    4294967296,
                                                a = (e + f) / 2097152;
                                        while (0 === a);
                                        return a;
                                    }),
                                    (n.int32 = d.next),
                                    (n.quick = n),
                                    t &&
                                        (t.X && r(t, d),
                                        (n.state = function () {
                                            return r(d, {});
                                        })),
                                    n
                                );
                            }
                            f && f.exports
                                ? (f.exports = t)
                                : d && d.amd
                                ? d(function () {
                                      return t;
                                  })
                                : (this.xor4096 = t);
                        })(
                            this,
                            'object' == typeof d && d,
                            'function' == typeof e && e
                        );
                    },
                    {},
                ],
            '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorshift7.js':
                [
                    function (f, d) {
                        (function (e, f, d) {
                            function a(e) {
                                var f = this;
                                (f.next = function () {
                                    var e,
                                        d,
                                        a = f.x,
                                        r = f.i;
                                    return (
                                        (e = a[r]),
                                        (e ^= e >>> 7),
                                        (d = e ^ (e << 24)),
                                        (e = a[7 & (r + 1)]),
                                        (d ^= e ^ (e >>> 10)),
                                        (e = a[7 & (r + 3)]),
                                        (d ^= e ^ (e >>> 3)),
                                        (e = a[7 & (r + 4)]),
                                        (d ^= e ^ (e << 7)),
                                        (e = a[7 & (r + 7)]),
                                        (e ^= e << 13),
                                        (d ^= e ^ (e << 9)),
                                        (a[r] = d),
                                        (f.i = 7 & (r + 1)),
                                        d
                                    );
                                }),
                                    (function (e, f) {
                                        var d,
                                            a,
                                            r = [];
                                        if (f === (0 | f)) a = r[0] = f;
                                        else
                                            for (
                                                f = '' + f, d = 0;
                                                d < f.length;
                                                ++d
                                            )
                                                r[7 & d] =
                                                    (r[7 & d] << 15) ^
                                                    ((f.charCodeAt(d) +
                                                        r[7 & (d + 1)]) <<
                                                        13);
                                        for (; 8 > r.length; ) r.push(0);
                                        for (d = 0; 8 > d && 0 === r[d]; ++d);
                                        for (
                                            a = 8 == d ? (r[7] = -1) : r[d],
                                                e.x = r,
                                                e.i = 0,
                                                d = 256;
                                            0 < d;
                                            --d
                                        )
                                            e.next();
                                    })(f, e);
                            }
                            function r(e, f) {
                                return (f.x = e.x.slice()), (f.i = e.i), f;
                            }
                            function t(e, f) {
                                null == e && (e = +new Date());
                                var d = new a(e),
                                    t = f && f.state,
                                    n = function () {
                                        return (d.next() >>> 0) / 4294967296;
                                    };
                                return (
                                    (n.double = function () {
                                        do
                                            var e = d.next() >>> 11,
                                                f =
                                                    (d.next() >>> 0) /
                                                    4294967296,
                                                a = (e + f) / 2097152;
                                        while (0 === a);
                                        return a;
                                    }),
                                    (n.int32 = d.next),
                                    (n.quick = n),
                                    t &&
                                        (t.x && r(t, d),
                                        (n.state = function () {
                                            return r(d, {});
                                        })),
                                    n
                                );
                            }
                            f && f.exports
                                ? (f.exports = t)
                                : d && d.amd
                                ? d(function () {
                                      return t;
                                  })
                                : (this.xorshift7 = t);
                        })(
                            this,
                            'object' == typeof d && d,
                            'function' == typeof e && e
                        );
                    },
                    {},
                ],
            '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorwow.js':
                [
                    function (f, d) {
                        (function (e, f, d) {
                            function a(e) {
                                var f = this,
                                    d = '';
                                (f.next = function () {
                                    var e = f.x ^ (f.x >>> 2);
                                    return (
                                        (f.x = f.y),
                                        (f.y = f.z),
                                        (f.z = f.w),
                                        (f.w = f.v),
                                        0 |
                                            ((f.d = 0 | (f.d + 362437)) +
                                                (f.v =
                                                    f.v ^
                                                    (f.v << 4) ^
                                                    (e ^ (e << 1))))
                                    );
                                }),
                                    (f.x = 0),
                                    (f.y = 0),
                                    (f.z = 0),
                                    (f.w = 0),
                                    (f.v = 0),
                                    e === (0 | e) ? (f.x = e) : (d += e);
                                for (var a = 0; a < d.length + 64; a++)
                                    (f.x ^= 0 | d.charCodeAt(a)),
                                        a == d.length &&
                                            (f.d = (f.x << 10) ^ (f.x >>> 4)),
                                        f.next();
                            }
                            function r(e, f) {
                                return (
                                    (f.x = e.x),
                                    (f.y = e.y),
                                    (f.z = e.z),
                                    (f.w = e.w),
                                    (f.v = e.v),
                                    (f.d = e.d),
                                    f
                                );
                            }
                            function t(e, f) {
                                var d = new a(e),
                                    t = f && f.state,
                                    n = function () {
                                        return (d.next() >>> 0) / 4294967296;
                                    };
                                return (
                                    (n.double = function () {
                                        do
                                            var e = d.next() >>> 11,
                                                f =
                                                    (d.next() >>> 0) /
                                                    4294967296,
                                                a = (e + f) / 2097152;
                                        while (0 === a);
                                        return a;
                                    }),
                                    (n.int32 = d.next),
                                    (n.quick = n),
                                    t &&
                                        ('object' == typeof t && r(t, d),
                                        (n.state = function () {
                                            return r(d, {});
                                        })),
                                    n
                                );
                            }
                            f && f.exports
                                ? (f.exports = t)
                                : d && d.amd
                                ? d(function () {
                                      return t;
                                  })
                                : (this.xorwow = t);
                        })(
                            this,
                            'object' == typeof d && d,
                            'function' == typeof e && e
                        );
                    },
                    {},
                ],
            '/Users/qrohlf/Code/trianglify/node_modules/seedrandom/seedrandom.js':
                [
                    function (f, d) {
                        (function (a, r) {
                            function t(e, f, d) {
                                var t = [];
                                f = !0 == f ? { entropy: !0 } : f || {};
                                var b = i(
                                        s(
                                            f.entropy
                                                ? [e, c(a)]
                                                : null == e
                                                ? o()
                                                : e,
                                            3
                                        ),
                                        t
                                    ),
                                    h = new n(t),
                                    x = function () {
                                        for (
                                            var e = h.g(u), f = m, d = 0;
                                            e < y;

                                        )
                                            (e = (e + d) * g),
                                                (f *= g),
                                                (d = h.g(1));
                                        for (; e >= _; )
                                            (e /= 2), (f /= 2), (d >>>= 1);
                                        return (e + d) / f;
                                    };
                                return (
                                    (x.int32 = function () {
                                        return 0 | h.g(4);
                                    }),
                                    (x.quick = function () {
                                        return h.g(4) / 4294967296;
                                    }),
                                    (x.double = x),
                                    i(c(h.S), a),
                                    (
                                        f.pass ||
                                        d ||
                                        function (e, f, d, a) {
                                            return (
                                                a &&
                                                    (a.S && l(a, h),
                                                    (e.state = function () {
                                                        return l(h, {});
                                                    })),
                                                d ? ((r[p] = e), f) : e
                                            );
                                        }
                                    )(
                                        x,
                                        b,
                                        'global' in f ? f.global : this == r,
                                        f.state
                                    )
                                );
                            }
                            function n(e) {
                                var f,
                                    d = e.length,
                                    a = this,
                                    r = 0,
                                    t = (a.i = a.j = 0),
                                    n = (a.S = []);
                                for (d || (e = [d++]); r < g; ) n[r] = r++;
                                for (r = 0; r < g; r++)
                                    (n[r] =
                                        n[
                                            (t =
                                                x & (t + e[r % d] + (f = n[r])))
                                        ]),
                                        (n[t] = f);
                                (a.g = function (e) {
                                    for (
                                        var f, d = 0, r = a.i, t = a.j, n = a.S;
                                        e--;

                                    )
                                        (f = n[(r = x & (r + 1))]),
                                            (d =
                                                d * g +
                                                n[
                                                    x &
                                                        ((n[r] =
                                                            n[
                                                                (t =
                                                                    x & (t + f))
                                                            ]) +
                                                            (n[t] = f))
                                                ]);
                                    return (a.i = r), (a.j = t), d;
                                })(g);
                            }
                            function l(e, f) {
                                return (
                                    (f.i = e.i),
                                    (f.j = e.j),
                                    (f.S = e.S.slice()),
                                    f
                                );
                            }
                            function s(e, f) {
                                var d,
                                    a = [],
                                    r = typeof e;
                                if (f && 'object' == r)
                                    for (d in e)
                                        try {
                                            a.push(s(e[d], f - 1));
                                        } catch (f) {}
                                return a.length
                                    ? a
                                    : 'string' == r
                                    ? e
                                    : e + '\0';
                            }
                            function i(e, f) {
                                for (var d, a = e + '', r = 0; r < a.length; )
                                    f[x & r] =
                                        x &
                                        ((d ^= 19 * f[x & r]) +
                                            a.charCodeAt(r++));
                                return c(f);
                            }
                            function o() {
                                try {
                                    var e;
                                    return (
                                        b && (e = b.randomBytes)
                                            ? (e = e(g))
                                            : ((e = new Uint8Array(g)),
                                              (
                                                  h.crypto || h.msCrypto
                                              ).getRandomValues(e)),
                                        c(e)
                                    );
                                } catch (r) {
                                    var f = h.navigator,
                                        d = f && f.plugins;
                                    return [+new Date(), h, d, h.screen, c(a)];
                                }
                            }
                            function c(e) {
                                return String.fromCharCode.apply(0, e);
                            }
                            var b,
                                h = this,
                                g = 256,
                                u = 6,
                                p = 'random',
                                m = r.pow(g, u),
                                y = r.pow(2, 52),
                                _ = 2 * y,
                                x = g - 1;
                            if (
                                ((r['seed' + p] = t),
                                i(r.random(), a),
                                'object' == typeof d && d.exports)
                            ) {
                                d.exports = t;
                                try {
                                    b = f('crypto');
                                } catch (e) {}
                            } else
                                'function' == typeof e &&
                                    e.amd &&
                                    e(function () {
                                        return t;
                                    });
                        })([], Math);
                    },
                    { crypto: !1 },
                ],
        },
        {},
        ['./lib/trianglify.js']
    )('./lib/trianglify.js');
});
