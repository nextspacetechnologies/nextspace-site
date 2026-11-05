/* 00 · BASE: effects shared by the whole page
   - clears leftover classes, scroll-reveal (.reveal)
   - page curtain, custom cursor, heading wipe effects */
(function () {
'use strict';
document.querySelectorAll('.pre, .is-tilting').forEach(function (el) { el.classList.remove('pre', 'is-tilting'); });
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
