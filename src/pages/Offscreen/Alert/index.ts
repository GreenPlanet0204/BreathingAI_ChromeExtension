//Break Alert sound

import { ALERT } from './types';

export const Alert = () => {
  let audioObject = new Audio();

  audioObject.src = '/src/assets/sounds/reminder.mp3';
  chrome.runtime.onMessage.addListener(({ type }: { type: string }) => {
    switch (type) {
      case ALERT:
        audioObject.play();
        break;
      default:
        break;
    }
  });
};
