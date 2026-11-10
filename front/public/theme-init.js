// Applies the saved theme before the first paint (avoids a dark flash for light-mode visitors).
// Kept as a separate file (not inline) so it is allowed by the server's Content-Security-Policy.
(function () {
  try {
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.dataset.theme = 'light';
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = '#f7f5fb';
    }
  } catch (e) {
    /* storage unavailable: stay in dark mode */
  }
})();
