import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../../content.styles.css';

import BreaksNotification from './notification';
import { ACKNOWLEDGED_BREAKS, DECLINED_BREAKS } from '../../types';
import {
  addListenerChromeStorageSettingsValue,
  addListenerChromeStorageSettingsValues,
  getStorageSettingsKeysValue,
  updateStorageSettingsKeyValue,
} from '../../../../lib/utils/chrome-storage';
import {
  APP_SETTINGS_STORAGE_KEY,
  AppSettings,
} from '../../../../lib/context/App/storage';
import {
  BREAKS_SETTINGS_STORAGE_KEY,
  BREAKS_VIDEO_FILE,
  BREAK_ACTIVE,
  BreaksSettings,
} from '../../../../lib/context/Breaks/storage';

import BreaksModal from './breaksPayer/breaksVideoPlayer';

export const BREATHING_AI_CONTAINER_ID = 'bai-container';

export const InjectBreaks = () => {
  // initial settings
  getStorageSettingsKeysValue(
    [
      BREAKS_SETTINGS_STORAGE_KEY,
      APP_SETTINGS_STORAGE_KEY,
      BREAKS_VIDEO_FILE,
      BREAK_ACTIVE,
    ],
    (settings) => {
      if (settings) {
        CreateNotificationContainer(settings);
      }
    }
  );
};

const CreateNotificationContainer = (initialSettings: {
  breaks: BreaksSettings;
  app: AppSettings;
  videoFile: { url: string; name: string; description: string };
  breakActive: boolean;
}) => {
  const app = document.createElement('div');
  const link1 = document.createElement('link');
  link1.rel = 'preconnect';
  link1.href = 'https://fonts.googleapis.com';

  const link2 = document.createElement('link');
  link2.rel = 'preconnect';
  link2.href = 'https://fonts.gstatic.com';
  link2.crossOrigin = 'true';

  const link3 = document.createElement('link');
  link3.rel = 'stylesheet';
  link3.href =
    'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap';

  const link4 = document.createElement('link');
  link4.rel = 'stylesheet';
  link4.href =
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap';

  document.head.append(link1);
  document.head.append(link2);
  document.head.append(link3);
  document.head.append(link4);

  app.setAttribute('id', BREATHING_AI_CONTAINER_ID);
  app.style.position = 'fixed';
  app.style.top = '0';
  app.style.left = '0';
  app.style.width = '100%';
  app.style.height = '100%';
  app.style.margin = '0';
  app.style.borderRadius = '0';
  app.style.pointerEvents = 'none';
  app.style.zIndex = '2147483646'; // MAX z-index -1

  const ContentReact = () => {
    const [openBreaksModel, setOpenBreaksModal] = useState(false);
    const [notify, setNotify] = useState(false);
    const [active, setActive] = useState(initialSettings.breakActive ?? false);
    const [activeTime, setActiveTime] = useState(
      initialSettings.app.activeTime
    );
    const [alert, setAlert] = useState(initialSettings.breaks.alert ?? false);
    const [videoFile, setVideoFile] = useState(initialSettings.videoFile);
    const [disable, setDisable] = useState(
      !initialSettings?.breaks?.enabled || initialSettings?.app?.paused
    );
    const [breaksInterval, setBreaksInterval] = useState(
      initialSettings?.breaks?.frequency ?? 0
    );

    const [language, setLanguage] = useState(initialSettings?.app?.language);

    useEffect(() => {
      var currentTimeInSeconds = new Date().getHours() * 3600;

      const realFrom =
        activeTime.from > activeTime.to ? activeTime.to : activeTime.from;
      const realTo =
        activeTime.from < activeTime.to ? activeTime.to : activeTime.from;

      const isAllowedToExecute =
        realFrom <= currentTimeInSeconds &&
        realTo >= currentTimeInSeconds &&
        !notify &&
        !openBreaksModel &&
        active;

      console.log(
        '🚀 ~ file: index.tsx:111 ~ useEffect ~ isAllowedToExecute:',
        isAllowedToExecute,
        {
          disable: disable,
          active: active,
          notify: notify,
          openBreaksModel: openBreaksModel,
          schedule:
            realFrom <= currentTimeInSeconds && realTo >= currentTimeInSeconds,
        }
      );

      if (
        !notify &&
        !openBreaksModel &&
        isAllowedToExecute &&
        active &&
        !disable
      ) {
        setNotify(true);
        if (alert) {
          chrome.runtime.sendMessage({
            type: 'alert',
          });
        }
      }

      if (!active) {
        setNotify(false);
      }
    }, [alert, breaksInterval, videoFile, activeTime, active]);

    addListenerChromeStorageSettingsValue(BREAK_ACTIVE, (value) => {
      console.log('content script', 'break active', value);
      setActive(value);
    });

    addListenerChromeStorageSettingsValues(
      [
        BREAKS_SETTINGS_STORAGE_KEY,
        APP_SETTINGS_STORAGE_KEY,
        BREAKS_VIDEO_FILE,
      ],
      (settings) => {
        if (settings) {
          const { app, breaks, videoFile } = settings;

          if (breaks) {
            setDisable(!breaks.enabled);
            setBreaksInterval(breaks.frequency);
            setAlert(breaks.alert);
          }

          if (app) {
            setLanguage(app.language);
            setDisable(app.paused);
            setActiveTime(app.activeTime);
            if (app.pauseDuration) {
              setTimeout(async () => {
                setDisable(false);
              }, app.pauseDuration * 1000);
            }
          }
          if (videoFile) {
            setVideoFile(settings.videoFile ?? initialSettings.videoFile);
          }
        }
      }
    );

    const breakCompleted = () => {
      chrome.runtime.sendMessage({
        type: ACKNOWLEDGED_BREAKS,
        payload: {
          contentId: videoFile.url,
        },
      });
      setOpenBreaksModal(false);
      updateStorageSettingsKeyValue(BREAK_ACTIVE, false);
    };

    const declineBreak = () => {
      chrome.runtime.sendMessage({ type: DECLINED_BREAKS });
      setNotify(false);
      setOpenBreaksModal(false);
      updateStorageSettingsKeyValue(BREAK_ACTIVE, false);
    };

    const acknowledgeBreak = () => {
      setNotify(false);
      setOpenBreaksModal(true);
    };

    return disable ? null : (
      <div>
        <BreaksNotification
          lang={language}
          notify={notify}
          acknowledgeBreak={acknowledgeBreak}
          declineBreak={declineBreak}
        />
        <BreaksModal
          language={language}
          videoFile={videoFile}
          open={openBreaksModel}
          breakCompleted={breakCompleted}
        />
      </div>
    );
  };

  ReactDOM.render(<ContentReact />, app);

  document.body.appendChild(app);

  return app;
};

export default InjectBreaks;
