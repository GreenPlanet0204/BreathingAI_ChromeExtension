import { ROUTING_SETTINGS_STORAGE_KEY } from '../../lib/context/App/storage';
import {
  ResetChromeStorage,
  updateStorageSettingsKeyValue,
} from '../../lib/utils/chrome-storage';
import { AVAILABLE_OPTIONS_ROUTES } from '../Options/routing/types';
import { AVAILABLE_POPUP_ROUTES } from '../Popup/routing/types';
import { BreaksListener } from './breaks';
import { Offscreen } from './offscreen';

const install = () => {
  chrome.runtime.onStartup.addListener(function () {
    BreaksListener();
    Offscreen();
  });

  chrome.runtime.onInstalled.addListener(async function (details) {
    console.log(details.reason);
    /* other 'reason's include 'update' */
    if (details.reason === 'install' || details.reason === 'update') {
      if (details.reason === 'install') {
        await updateStorageSettingsKeyValue(ROUTING_SETTINGS_STORAGE_KEY, {
          currentOptionsTab: AVAILABLE_OPTIONS_ROUTES.INTRO,
          currentPopupTab: AVAILABLE_POPUP_ROUTES.SPLASH,
        });
        //check if onboarding was done or not
        chrome.runtime.openOptionsPage();
      }

      if (details.reason === 'update') {
        reset();
        // restart break analytics tracker interval when extension updates
        chrome.storage.local.get(
          ['loggedIn', 'breakSettings'],
          ({ loggedIn, breakSettings }) => {
            if (loggedIn) {
              // reset break modal states incase they were left open during update
              chrome.storage.local.set({ modalActive: false });
              chrome.storage.local.set({ modalOpen: false });

              if (breakSettings.run_breaks) {
              }
            }
          }
        );
      }
      /* If first install, set uninstall URL */
      var uninstallUrlLink =
        'https://docs.google.com/forms/d/e/1FAIpQLSeH1GDFfOCEUYoHFvmY3lAtaBJKK9V61AFMa8bQtfl9M6d0sA/viewform';
      /* If Chrome version supports it... */
      if (chrome.runtime.setUninstallURL) {
        chrome.runtime.setUninstallURL(uninstallUrlLink);
      }
    }
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    //   if (
    //     window?.localStorage.theme === 'dark' ||
    //     (!('theme' in   window?.localStorage) &&
    //       window.matchMedia('(prefers-color-scheme: dark)').matches)
    //   ) {
    //     document.documentElement.classList.add('dark');
    //   } else {
    //     document.documentElement.classList.remove('dark');
    //   }

    //   // Whenever the user explicitly chooses light mode
    //      window?.localStorage.theme = 'light';

    //   // Whenever the user explicitly chooses dark mode
    //      window?localStorage.theme = 'dark';

    //   // Whenever the user explicitly chooses to respect the OS preference
    //   localStorage.removeItem('theme');
  });

  const reset = () => {
    ResetChromeStorage();
  };
};

export default install;
