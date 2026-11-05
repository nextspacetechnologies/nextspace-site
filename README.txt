NEXTSPACE TECHNOLOGIES WEBSITE: WHERE THINGS ARE

Each section of the home page has its own files (same number and name):
  NN-name.html  = the words and layout of that section
  NN-name.css   = the look of that section (colors, spacing)
  NN-name.js    = small behaviors (only some sections have one)

The numbers are file names only. The ORDER ON THE PAGE is set in site.js (the SECTIONS list).

Current page order (top to bottom):
  01-header     menu at the top (edit menu links here)
  02-hero       first screen with the 3D graphic
  07-nextspace360  NextSpace 360 section + live 360 tour (tour code is in 07-nextspace360.js)
  03-brands     "One company. Three brands."
  04-about      About
  05-what       What we do
  06-services   Services (360 Virtual Tours is the first, main service)
  08-products   Products (NextSpace Tap only)
  09-studio     NextSpace Studio (coming soon)
  10-work       Work
  11-why        Why NextSpace
  12-faq        FAQ
  13-contact    Contact form
  14-footer     Footer

Shared:  00-base.css/.js (fonts, colors, buttons), 15-legal.css, 99-motion.css (animations)
Pages:   home.html (loader shell), privacy.html, terms.html
Do not edit: site.js unless you want to reorder or add a section; site.css is just the list of CSS files.

After you edit a file on GitHub, refresh the cached copy by opening
https://purge.jsdelivr.net/gh/nextspacetechnologies/nextspace-site@main/FILENAME
then reload the site with Ctrl+Shift+R.
