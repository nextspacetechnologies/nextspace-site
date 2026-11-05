/* NextSpace Technologies: page builder.
   Loaded by the DashNex loader page (after three.js). It:
   1. fetches every section's HTML (NN-name.html) and assembles the page, then
   2. runs each section's JS (NN-name.js) in order.

   TO ADD / REMOVE / REORDER A SECTION: edit the SECTIONS list below.
     id   = file name without extension (04-about -> 04-about.html / .css / .js)
     zone = 'top' (before <main>), 'main', or 'bottom' (after <main>)
     js   = true if the section has a .js file
   A new section's CSS also needs one @import line in site.css. */
(function () {
'use strict';
var cs = document.currentScript;
var BASE = cs && cs.src ? cs.src.replace(/[^\/]*(\?.*)?$/, '') : 'https://cdn.jsdelivr.net/gh/nextspacetechnologies/nextspace-site@main/';
/* PIN: normally leave as ''. If the site shows an old version of a section after you edit it (the CDN cache is slow),
   put the latest GitHub commit code here (first 7 characters, e.g. '32b5556') to load exactly that version. */
var PIN = '32b5556';
if (PIN) BASE = BASE.replace('@main/', '@' + PIN + '/');
var SECTIONS = [
{ id: '01-header',        zone: 'top',    js: true },
{ id: '02-hero',          zone: 'main',   js: true },
{ id: '07-nextspace360',  zone: 'main',   js: true },
{ id: '03-brands',        zone: 'main' },
{ id: '04-about',         zone: 'main' },
{ id: '05-what',          zone: 'main' },
{ id: '06-services',      zone: 'main' },
{ id: '08-products',      zone: 'main' },
{ id: '09-studio',        zone: 'main' },
{ id: '10-work',          zone: 'main' },
{ id: '11-why',           zone: 'main' },
{ id: '12-faq',           zone: 'main' },
{ id: '13-contact',       zone: 'main',   js: true },
{ id: '14-footer',        zone: 'bottom', js: true }
];
var SHARED_JS = ['00-base'];
/* Privacy and Terms pages already contain their own header and footer, so they only need these scripts. */
var LEGAL_JS = ['00-base', '01-header', '14-footer'];

function loadScript(name) {
return new Promise(function (resolve) {
var s = document.createElement('script');
s.src = BASE + name + '.js';
s.onload = resolve;
s.onerror = resolve;
document.body.appendChild(s);
});
}
function runScripts(names) {
return names.reduce(function (p, n) { return p.then(function () { return loadScript(n); }); }, Promise.resolve());
}
function fetchText(id) {
return fetch(BASE + id + '.html').then(function (r) {
if (!r.ok) throw new Error(id + ' ' + r.status);
return r.text();
}).catch(function () { return ''; });
}

var shell = document.getElementById('ns-sections');
if (!shell) { runScripts(LEGAL_JS); return; }

Promise.all(SECTIONS.map(function (s) { return fetchText(s.id); })).then(function (parts) {
var zones = { top: '', main: '', bottom: '' };
SECTIONS.forEach(function (s, i) { zones[s.zone] += parts[i] + '\n'; });
var root = document.getElementById('ns-root') || shell.parentNode;
root.innerHTML = zones.top + '<main id="main">' + zones.main + '</main>' + zones.bottom;
var names = SHARED_JS.concat(SECTIONS.filter(function (s) { return s.js; }).map(function (s) { return s.id; }));
return runScripts(names);
});
})();
