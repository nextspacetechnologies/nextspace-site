/* 07 · NEXTSPACE 360: loads the live 360 tour into the box with id "oSC3thp1i".
   A tour embed code has a <script> in it, and the page builder cannot run scripts pasted as HTML,
   so this file adds that script for it. To swap the tour, paste the new data-short value below
   (and the same value as the id of the box in 07-nextspace360.html). */
(function () {
  var TOUR_ID = 'oSC3thp1i';
  var box = document.getElementById(TOUR_ID);
  if (!box || box.querySelector('script')) return;
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.setAttribute('data-short', TOUR_ID);
  s.setAttribute('data-path', 'tours');
  s.setAttribute('data-is-self-hosted', 'false');
  s.setAttribute('width', '100%');
  s.setAttribute('height', '500px');
  s.src = 'https://tours.nextspace360.xyz/public/shareScript.js';
  box.appendChild(s);
})();
