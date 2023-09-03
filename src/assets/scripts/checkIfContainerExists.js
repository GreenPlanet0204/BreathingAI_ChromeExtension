var unusableUrls = [
  /^chrome:\/\//,
  /https:\/\/chrome./,
  /chrome-extensions/,
  /https:\/\/docs.google./,
];
/* global chrome */
(() => {
  if (document) {
    const BreaksListenerElement = document.getElementById('bai-container');
    const ColorsListenerElement = document.getElementById('bai-color-shader');

    if (BreaksListenerElement && ColorsListenerElement) return;

    const validUrl = unusableUrls.every(
      (url) => url.test(document.URL) === false
    );

    if (!validUrl) return;

    window.location.reload();
  }
})();
