import { Offscreen } from './offscreen';
import install from './install';
import { unusable_urls } from './types';
import ScreenTimeMeasuremnt from './screenTimeMeasurment';

// add listeners and add scriupts
install();

// Reload old tabs that get focused on if they don't have the <breathing> element injected
chrome.tabs.onActivated.addListener(({ tabId }) => {
  ScreenTimeMeasuremnt();
  Offscreen();
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    for (let tab of tabs) {
      if (tab.id === tabId) {
        const tabURL = tab.pendingUrl || tab.url;
        if (tabURL) {
          const validUrl = unusable_urls.every((url) => {
            return url.test(tabURL) !== true;
          });

          if (validUrl) {
            console.log('Checking tab for listener element ');
            chrome.scripting.executeScript({
              injectImmediately: true,
              target: { tabId, allFrames: true },
              files: ['src/assets/scripts/checkIfContainerExists.js'],
            });
          }
        }
      }
    }
  });
});
