window.NS_FORM = {
gform: {
action: "",   // https://docs.google.com/forms/d/e/FORM_ID/formResponse
fields: { name: "", email: "", phone: "", company: "", service: "", budget: "", details: "" }  // each: "entry.1234567890"
},
web3key: "",    // Web3Forms access key (free, emailed to you). Paste it between the quotes.
endpoint: "",   // e.g. https://YOUR-PROJECT.supabase.co/rest/v1/rpc/submit_inquiry
apikey: ""      // the project's publishable (anon) key
};
;
(function () {
'use strict';
function email() {
var el = document.getElementById('contact-email');
return el ? el.textContent.trim() : '';
}
document.querySelectorAll('.pre, .is-tilting').forEach(function (el) { el.classList.remove('pre', 'is-tilting'); });
var staleNav = document.getElementById('site-nav');
if (staleNav) staleNav.classList.remove('open');
var toggle = document.getElementById('nav-toggle');
var nav = document.getElementById('site-nav');
function closeNav() {
if (!nav) return;
nav.classList.remove('open');
if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'Menu'; }
}
if (toggle && nav) {
toggle.addEventListener('click', function () {
var open = nav.classList.toggle('open');
toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
toggle.textContent = open ? 'Close' : 'Menu';
});
nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
}
var header = document.getElementById('site-header');
var hero = document.getElementById('home');
if (header && hero) {
var update = function () {
var bottom = hero.getBoundingClientRect().bottom;
header.classList.toggle('solid', bottom < 72);
};
window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);
update();
}
if (hero && 'IntersectionObserver' in window) {
var links = {};
document.querySelectorAll('.nav a[href^="#"]:not(.btn)').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
var spy = new IntersectionObserver(function (entries) {
entries.forEach(function (en) {
if (en.isIntersecting && links[en.target.id]) {
Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === en.target.id); });
}
});
}, { rootMargin: '-45% 0px -50% 0px' });
Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
}
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) {
var vh = window.innerHeight;
var io = new IntersectionObserver(function (entries) {
entries.forEach(function (en) {
if (en.isIntersecting) { en.target.classList.remove('pre'); io.unobserve(en.target); }
});
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(function (el) {
if (el.getBoundingClientRect().top > vh) { el.classList.add('pre'); io.observe(el); }
});
}
function selectNode(el) {
if (!el) return;
var r = document.createRange();
r.selectNodeContents(el);
var s = window.getSelection();
s.removeAllRanges();
s.addRange(r);
}
document.querySelectorAll('[data-copy-from]').forEach(function (btn) {
btn.addEventListener('click', function () {
var source = document.getElementById(btn.getAttribute('data-copy-from'));
var text = source ? source.textContent.trim() : '';
var original = btn.textContent;
function done(ok) {
btn.textContent = ok ? 'Copied' : 'Press Ctrl+C';
if (!ok) selectNode(btn.closest('.detail').querySelector('dd'));
setTimeout(function () { btn.textContent = original; }, 1800);
}
if (navigator.clipboard && navigator.clipboard.writeText) {
navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
} else { done(false); }
});
});
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
})();
(function () {
'use strict';
var select = document.getElementById('f-service');
if (!select) return;
document.querySelectorAll('[data-service]').forEach(function (a) {
a.addEventListener('click', function () {
var want = a.getAttribute('data-service');
for (var i = 0; i < select.options.length; i++) {
if (select.options[i].text === want) { select.selectedIndex = i; break; }
}
});
});
})();
(function () {
'use strict';
var root = document.documentElement;
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.fx-curtain, .fx-cursor').forEach(function (n) { n.remove(); });
document.querySelectorAll('.mk, .wipe, .fx-line').forEach(function (n) { n.classList.remove('mk', 'wipe', 'in', 'fx-line'); });
if (reduce) return;
var curtain = document.createElement('div');
curtain.className = 'fx-curtain';
curtain.setAttribute('aria-hidden', 'true');
var isHome = !!document.getElementById('home');
curtain.innerHTML = isHome ? '<img class="fx-logo" src="https://sites.nextspacetechnologies.com/nextspacetechnologies/images/logo-white.png" alt="" width="320" height="26"><div class="fx-bar"></div>' : '';
document.body.appendChild(curtain);
setTimeout(function () { curtain.classList.add('up'); }, isHome ? 900 : 60);
setTimeout(function () { if (curtain.parentNode) curtain.classList.add('gone'); curtain.style.visibility = 'hidden'; }, isHome ? 2000 : 1100);
document.addEventListener('click', function (e) {
var a = e.target.closest && e.target.closest('a[href]');
if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
var href = a.getAttribute('href');
if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:)/i.test(href)) return;
if (!/\.html($|#|\?)/.test(href)) return;
e.preventDefault();
curtain.style.visibility = 'visible';
curtain.className = 'fx-curtain down';
void curtain.offsetWidth;
curtain.className = 'fx-curtain cover';
setTimeout(function () { window.location.href = href; }, 720);
});
window.addEventListener('pageshow', function (e) {
if (e.persisted) { curtain.className = 'fx-curtain up'; }
});
if (!('IntersectionObserver' in window)) return;
var vh = window.innerHeight;
var io = new IntersectionObserver(function (entries) {
entries.forEach(function (en) {
if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
});
}, { rootMargin: '0px 0px -10% 0px' });
function arm(sel, cls) {
document.querySelectorAll(sel).forEach(function (el) {
if (el.closest('.hero')) return;
el.classList.add(cls);
io.observe(el);
});
}
arm('main h2, .section h2, .cta-final h2, .page h1', 'mk');
arm('.studio-img, .cap-img, .brand-mark, .about-visual img', 'wipe');
if (window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
var c = document.createElement('div');
c.className = 'fx-cursor';
c.setAttribute('aria-hidden', 'true');
document.body.appendChild(c);
var x = 0, y = 0, tx = 0, ty = 0;
window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; c.classList.add('on'); }, { passive: true });
document.addEventListener('mouseleave', function () { c.classList.remove('on'); });
document.addEventListener('mouseover', function (e) {
var t = e.target.closest && e.target.closest('a, button, summary, select, label');
c.classList.toggle('big', !!t);
});
(function loop() {
x += (tx - x) * 0.2; y += (ty - y) * 0.2;
c.style.transform = 'translate(' + x + 'px,' + y + 'px)';
requestAnimationFrame(loop);
})();
}
})();
;
(function () {
'use strict';
var hero = document.getElementById('home');
var sticky = document.getElementById('hero-sticky');
var host = document.getElementById('hero-3d');
if (!hero || !sticky || !host) return;
host.classList.remove('is-3d');
host.querySelectorAll('canvas').forEach(function (c) { c.parentNode.removeChild(c); });
var items = document.querySelectorAll('.layer-index li');
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
function easeOut(t) { t = clamp(t, 0, 1); return 1 - Math.pow(1 - t, 3); }
var progress = 0;
var activeIdx = -2;
var onProgress = null;
function computeProgress() {
var rect = hero.getBoundingClientRect();
var pinned = window.getComputedStyle(sticky).position === 'sticky';
var total = pinned ? Math.max(1, hero.offsetHeight - sticky.offsetHeight) : Math.max(1, hero.offsetHeight * 0.7);
progress = clamp(-rect.top / total, 0, 1);
hero.style.setProperty('--p', progress.toFixed(3));
var idx = progress < 0.3 ? -1 : Math.min((items.length || 5) - 1, Math.floor(((progress - 0.3) / 0.7) * (items.length || 5)));
if (idx !== activeIdx) {
activeIdx = idx;
for (var i = 0; i < items.length; i++) items[i].classList.toggle('active', i <= idx && idx >= 0 && i === idx);
}
if (onProgress) onProgress();
}
var ticking = false;
function onScroll() {
if (ticking) return;
ticking = true;
requestAnimationFrame(function () { ticking = false; computeProgress(); });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
computeProgress();
var T = window.THREE;
function hasWebGL() {
try {
var c = document.createElement('canvas');
return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
} catch (e) { return false; }
}
if (!T || !hasWebGL()) return;
var renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputEncoding = T.sRGBEncoding;
renderer.setClearColor(0x000000, 0);
renderer.domElement.setAttribute('aria-hidden', 'true');
host.appendChild(renderer.domElement);
host.classList.add('is-3d');
var scene = new T.Scene();
var camera = new T.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(0, 0, 15);
var VIS_H = 2 * 15 * Math.tan((35 / 2) * Math.PI / 180);
scene.add(new T.AmbientLight(0xffffff, 0.95));
var key = new T.DirectionalLight(0xffffff, 0.8);
key.position.set(-8, 14, 12);
scene.add(key);
var fill = new T.DirectionalLight(0x5ba3ff, 0.55);
fill.position.set(10, -4, 6);
scene.add(fill);
var W = 6.4, D = 4.2, TH = 0.09;
var BLUE = 0x3b82ff, CYAN = 0xff6b6b, PALE = 0xdce8ff, DEEP = 0x14316f, HOT = 0x2f7bff;
function basic(color, opacity) {
return new T.MeshBasicMaterial({ color: color, transparent: opacity !== undefined && opacity < 1, opacity: opacity === undefined ? 1 : opacity });
}
function flat(parent, w, d, x, z, color, opacity, h) {
h = h || 0.025;
var m = new T.Mesh(new T.BoxGeometry(w, h, d), basic(color, opacity));
m.position.set(x, h / 2, z);
parent.add(m);
return m;
}
function segments(parent, pts, pairs, color, opacity) {
var arr = [];
pairs.forEach(function (p) {
arr.push(pts[p[0]][0], pts[p[0]][1], pts[p[0]][2], pts[p[1]][0], pts[p[1]][1], pts[p[1]][2]);
});
var g = new T.BufferGeometry();
g.setAttribute('position', new T.BufferAttribute(new Float32Array(arr), 3));
var l = new T.LineSegments(g, new T.LineBasicMaterial({ color: color, transparent: true, opacity: opacity }));
parent.add(l);
return l;
}
function buildUI(d) {
flat(d, 6.0, 0.36, 0, -1.82, 0x1f4aa8, 1);
[-2.8, -2.5, -2.2].forEach(function (x) { flat(d, 0.16, 0.16, x, -1.82, PALE, 1, 0.03); });
[0.6, 1.4, 2.2].forEach(function (x) { flat(d, 0.55, 0.08, x, -1.82, PALE, 0.8, 0.03); });
flat(d, 3.6, 1.55, -1.2, -0.62, HOT, 0.96);
flat(d, 2.3, 0.13, -1.85, -0.95, 0xffffff, 1, 0.03);
flat(d, 1.7, 0.13, -2.15, -0.68, 0xffffff, 0.9, 0.03);
flat(d, 0.95, 0.3, -2.5, -0.22, CYAN, 1, 0.04);
flat(d, 1.9, 1.55, 2.05, -0.62, PALE, 0.92);
flat(d, 1.4, 0.1, 2.05, -1.0, DEEP, 0.9, 0.03);
flat(d, 1.1, 0.1, 1.9, -0.72, DEEP, 0.5, 0.03);
flat(d, 1.3, 0.1, 2.0, -0.44, DEEP, 0.5, 0.03);
[-2.0, 0, 2.0].forEach(function (x, i) {
flat(d, 1.85, 1.05, x, 1.15, i === 1 ? HOT : PALE, i === 1 ? 0.9 : 0.85);
flat(d, 1.1, 0.09, x - 0.2, 0.95, i === 1 ? 0xffffff : DEEP, 0.9, 0.03);
});
}
function buildSystems(d) {
var pts = [[-2.3, 0.1, -1.0], [-0.9, 0.1, -1.4], [0.6, 0.1, -0.8], [2.2, 0.1, -1.2], [-1.6, 0.1, 0.6], [0.2, 0.1, 0.8], [2.0, 0.1, 0.9], [-0.2, 0.1, 1.6]];
var pairs = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [2, 5], [4, 5], [5, 6], [3, 6], [5, 7], [4, 7]];
segments(d, pts, pairs, PALE, 0.85);
pts.forEach(function (p, i) {
var s = new T.Mesh(new T.SphereGeometry(i === 5 ? 0.26 : 0.15, 20, 14), basic(i === 5 ? CYAN : (i % 2 ? PALE : HOT), 1));
s.position.set(p[0], 0.1, p[2]);
d.add(s);
});
var ring = new T.Mesh(new T.RingGeometry(0.34, 0.38, 40), basic(CYAN, 0.8));
ring.rotation.x = -Math.PI / 2;
ring.position.set(0.2, 0.05, 0.8);
d.add(ring);
}
function buildCreative(d) {
var specs = [[-1.2, 0.15, 1.15, HOT, 0.8, 0.012], [0.05, -0.1, 1.15, CYAN, 0.65, 0.02], [1.25, 0.2, 1.0, 0xffffff, 0.55, 0.03]];
specs.forEach(function (s) {
var c = new T.Mesh(new T.CircleGeometry(s[2], 56), basic(s[3], s[4]));
c.rotation.x = -Math.PI / 2;
c.position.set(s[0], s[5], s[1]);
d.add(c);
});
var curve = new T.CatmullRomCurve3([new T.Vector3(-2.8, 0.06, 1.5), new T.Vector3(-1.2, 0.06, -1.3), new T.Vector3(0.4, 0.06, 1.2), new T.Vector3(2.8, 0.06, -1.5)]);
d.add(new T.Line(new T.BufferGeometry().setFromPoints(curve.getPoints(60)), new T.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })));
[[-2.8, 1.5], [2.8, -1.5]].forEach(function (p) {
flat(d, 0.22, 0.22, p[0], p[1], 0xffffff, 1, 0.05);
});
}
function buildMarketing(d) {
var widths = [5.4, 4.1, 2.8, 1.5], zs = [-1.1, -0.3, 0.5, 1.3];
widths.forEach(function (w, i) {
flat(d, w, 0.5, 0, zs[i], i === 3 ? CYAN : (i === 0 ? PALE : HOT), 0.85 - i * 0.05, 0.03);
});
[[-2.2, -1.9], [-0.9, -1.8], [0.6, -1.95], [1.9, -1.85], [-1.5, -1.6], [1.2, -1.55]].forEach(function (p) {
var s = new T.Mesh(new T.SphereGeometry(0.11, 14, 10), basic(PALE, 0.95));
s.position.set(p[0], 0.12, p[1]);
d.add(s);
});
var c = new T.Mesh(new T.SphereGeometry(0.24, 20, 14), basic(CYAN, 1));
c.position.set(0, 0.2, 2.05);
d.add(c);
}
function buildStrategy(d) {
var heights = [0.25, 0.4, 0.55, 0.75, 0.95, 1.2, 1.5];
var tops = [];
heights.forEach(function (h, i) {
var x = -2.4 + i * 0.8;
var m = new T.Mesh(new T.BoxGeometry(0.42, h, 0.42), basic(i > 4 ? CYAN : HOT, i > 4 ? 1 : 0.9));
m.position.set(x, h / 2, 0.55);
d.add(m);
tops.push(new T.Vector3(x, h + 0.12, 0.55));
});
d.add(new T.Line(new T.BufferGeometry().setFromPoints(tops), new T.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })));
flat(d, 5.8, 0.04, 0, 0.95, PALE, 0.7, 0.02);
flat(d, 5.8, 0.04, 0, -0.9, PALE, 0.35, 0.02);
flat(d, 5.8, 0.04, 0, -1.6, PALE, 0.35, 0.02);
}
var builders = [buildUI, buildSystems, buildCreative, buildMarketing, buildStrategy];
var stack = new T.Group();
scene.add(stack);
var layers = builders.map(function (build) {
var g = new T.Group();
var slabGeo = new T.BoxGeometry(W, TH, D);
var slab = new T.Mesh(slabGeo, new T.MeshStandardMaterial({ color: DEEP, roughness: 0.4, metalness: 0.25, transparent: true, opacity: 0.66 }));
var edges = new T.LineSegments(new T.EdgesGeometry(slabGeo), new T.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 1 }));
var deco = new T.Group();
deco.position.y = TH / 2 + 0.01;
g.add(slab, edges, deco);
build(deco);
stack.add(g);
return { group: g, slab: slab, edges: edges, x: 0 };
});
var postGeo = new T.BufferGeometry();
var postPos = new Float32Array(4 * 2 * 3);
postGeo.setAttribute('position', new T.BufferAttribute(postPos, 3));
var posts = new T.LineSegments(postGeo, new T.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0 }));
stack.add(posts);
var corners = [[-W / 2, -D / 2], [W / 2, -D / 2], [W / 2, D / 2], [-W / 2, D / 2]];
var pointer = { x: 0, y: 0, tx: 0, ty: 0 };
if (!reduce) {
window.addEventListener('pointermove', function (e) {
pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
}, { passive: true });
}
var narrow = false;
function layout() {
var w = host.clientWidth || 800;
var h = host.clientHeight || 600;
renderer.setSize(w, h, false);
camera.aspect = w / h;
camera.updateProjectionMatrix();
var visW = VIS_H * camera.aspect;
var wide = w >= 900;
narrow = !wide;
var s;
if (wide) {
s = clamp(Math.min(visW * 0.36, VIS_H * 0.84) / 7.4, 0.55, 1.1);
stack.position.set(visW * 0.255, -0.1, 0);
} else {
var u = VIS_H / h;
s = Math.min(clamp((visW * 0.86) / 7.4, 0.35, 0.8), (260 * u) / 3.8);
stack.position.set(0, -VIS_H / 2 + 2.0 * s + 22 * u, 0);
}
stack.scale.setScalar(s);
}
var visible = true;
var start = performance.now() + 900; 
function draw(t) {
pointer.x += (pointer.tx - pointer.x) * 0.06;
pointer.y += (pointer.ty - pointer.y) * 0.06;
var intro = reduce ? 1 : easeOut(t / 2.2);
var e = smooth(0.04, 0.78, progress);
var gap = lerp(0.34, narrow ? 0.85 : 1.5, e);
var useGap = lerp(3.2, gap, intro);
var n = layers.length, mid = (n - 1) / 2;
for (var i = 0; i < n; i++) {
var L = layers[i];
var isActive = i === activeIdx;
L.group.position.y = (mid - i) * useGap;
L.x += ((isActive ? 0.6 : 0) - L.x) * 0.1;
L.group.position.x = L.x;
L.group.rotation.y = (1 - intro) * (i % 2 ? 1.1 : -1.1);
L.edges.material.color.setHex(isActive ? CYAN : BLUE);
L.slab.material.opacity += ((isActive ? 0.85 : 0.62) - L.slab.material.opacity) * 0.12;
}
var top = (mid - 0) * useGap, bottom = (mid - (n - 1)) * useGap;
for (var c = 0; c < 4; c++) {
postPos[c * 6] = corners[c][0]; postPos[c * 6 + 1] = bottom; postPos[c * 6 + 2] = corners[c][1];
postPos[c * 6 + 3] = corners[c][0]; postPos[c * 6 + 4] = top; postPos[c * 6 + 5] = corners[c][1];
}
postGeo.attributes.position.needsUpdate = true;
posts.material.opacity = smooth(0.1, 0.5, e) * 0.55;
stack.rotation.y = -0.78 + progress * 0.5 + (reduce ? 0 : t * 0.045) + pointer.x * 0.2 - (1 - intro) * 0.9;
stack.rotation.x = 0.6 - progress * 0.12 + pointer.y * 0.08;
}
layout();
if ('ResizeObserver' in window) new ResizeObserver(layout).observe(host);
else window.addEventListener('resize', layout);
if ('IntersectionObserver' in window) {
new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(hero);
}
if (reduce) {
onProgress = function () { draw(99); renderer.render(scene, camera); };
onProgress();
} else {
(function frame(now) {
if (visible && !document.hidden) {
draw(Math.max(0, (now - start) / 1000));
renderer.render(scene, camera);
}
requestAnimationFrame(frame);
})(performance.now());
}
})();