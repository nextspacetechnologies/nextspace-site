/* 01 · HEADER: mobile menu, solid header after the hero, active-link highlight */
(function () {
'use strict';
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
})();
