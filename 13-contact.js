/* 13 · CONTACT: Copy buttons for email and phone */
(function () {
'use strict';
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
})();
