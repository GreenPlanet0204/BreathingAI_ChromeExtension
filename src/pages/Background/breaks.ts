import { BreakEvent } from '../../lib/api/breaks/types';
import { fetchVideos } from '../../lib/api/content/contentful';
import {
  APP_SETTINGS_STORAGE_KEY,
  AVAILABLE_LANGUAGES,
} from '../../lib/context/App/storage';
import {
  BREAKS_SETTINGS_STORAGE_KEY,
  BREAKS_VIDEO_FILE,
  BREAK_ACTIVE,
} from '../../lib/context/Breaks/storage';
import {
  addListenerChromeStorageSettingsValue,
  getStorageSettingsKeyValue,
} from '../../lib/utils/chrome-storage';
import { updateStorageSettingsKeyValue } from '../../lib/utils/chrome-storage';
import services from '../../lib/utils/services';

import { ACKNOWLEDGED_BREAKS, DECLINED_BREAKS } from '../Content/types';

export const BREAK_NOTIFIER = 'breakNotifier';

const videoTypes = {
  type1: 'meditation',
  type2: 'breathwork',
  type3: 'movement',
  type4: 'esp',
  type5: 'spanishBreathing',
  type6: 'spanishMeditation',
  type7: 'spanishMovement',
};
const Filters = {
  [AVAILABLE_LANGUAGES.EN]: ['movement', 'breathwork', 'meditation'],
  [AVAILABLE_LANGUAGES.ES]: [
    'spanishBreathing',
    'spanishMeditation',
    'spanishMovement',
  ],
};

const setVideo = async () => {
  await getStorageSettingsKeyValue(
    APP_SETTINGS_STORAGE_KEY,
    async (settings) => {
      let videos = await fetchVideos(
        Filters[
          (settings?.language as AVAILABLE_LANGUAGES) ?? AVAILABLE_LANGUAGES.EN
        ][0],
        Filters[
          (settings?.language as AVAILABLE_LANGUAGES) ?? AVAILABLE_LANGUAGES.EN
        ][1],
        Filters[
          (settings?.language as AVAILABLE_LANGUAGES) ?? AVAILABLE_LANGUAGES.EN
        ][2]
      );
      if (videos) {
        const shuffledArray = videos?.items.sort(() => 0.5 - Math.random());

        const videoFile = {
          url: shuffledArray
            ? shuffledArray[0].fields?.file.url
            : videos?.items[0].fields?.file.url,
          name: shuffledArray
            ? shuffledArray[0].fields?.title
            : videos?.items[0].fields?.title,
          description: shuffledArray
            ? shuffledArray[0].fields?.description
            : videos?.items[0].fields?.description,
        };
        await updateStorageSettingsKeyValue(BREAKS_VIDEO_FILE, videoFile);
      }
    }
  );
};

export const BreaksListener = async () => {
  // const { cookies } = services;

  const { api } = services;

  await setVideo();

  getStorageSettingsKeyValue(BREAKS_SETTINGS_STORAGE_KEY, (settings) => {
    if (!settings?.frequency) return;
    chrome.alarms.create(
      BREAK_NOTIFIER,
      { periodInMinutes: (settings?.frequency ?? 60) / 60 },
      () => {
        console.log(
          BREAK_NOTIFIER,
          'alarm created',
          (settings?.frequency ?? 60) / 60,
          'min'
        );
      }
    );
  });


};

addListenerChromeStorageSettingsValue(
  BREAKS_SETTINGS_STORAGE_KEY,
  (settings) => {
    chrome.alarms.create(
      BREAK_NOTIFIER,
      { periodInMinutes: (settings?.frequency ?? 60) / 60 },
      () => {
        console.log(
          BREAK_NOTIFIER,
          'alarm values changed to',
          (settings?.frequency ?? 60) / 60,
          'min'
        );
      }
    );
  }
);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === BREAK_NOTIFIER) {
    console.log(alarm.name, 'fired');
    updateStorageSettingsKeyValue(BREAK_ACTIVE, true);
  }
});

chrome.runtime.onMessage.addListener(async function (msg) {
  const event: BreakEvent = {
    contentUrl: msg.videoFile ?? ' ',
    completed: msg.completed ?? true,
    rating: msg.rating ?? 0,
    lang: msg.language ?? AVAILABLE_LANGUAGES.EN,
  };

  switch (msg.type) {
    case ACKNOWLEDGED_BREAKS:
      // await api.Breaks.breakCompletedEvent(event);
      await setVideo();
      break;
    case DECLINED_BREAKS:
      event.completed = false;
      await setVideo();
      break;
    default:
      break;
  }
});