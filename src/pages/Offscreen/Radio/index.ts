//Radio
enum RADIO_ACTIONS {
  TOGGLE = 'toggle',
  SKIP = 'skip',
  CHANGE_STATION = 'change_station',
  VOLUME = 'volume',
  TRACK_ENDED = 'track_ended',
}

enum STATIONS {
  ZEN = 'zen',
  NATURE = 'nature',
  WATER = 'watrer',
}

type RadioMessage = {
  type: RADIO_ACTIONS;
  payload: Partial<RadioMessagePayload>;
};

type RadioMessagePayload = {
  station: STATIONS;
  track: string;
  play: boolean;
  volume: number;
};

export const Radio = () => {
  let audioObject = new Audio();
  chrome.runtime.onMessage.addListener(({ type, payload }: RadioMessage) => {
    switch (type) {
      case RADIO_ACTIONS.TOGGLE:
        //@ts-ignore
        toggleRadio(payload);
        break;
      case RADIO_ACTIONS.VOLUME:
        //@ts-ignore
        toggleVolume(payload);
        break;
      default:
        break;
    }
  });

  // play first audio track in station
  const toggleRadio = (payload: RadioMessagePayload) => {
    audioObject.volume = payload.volume;
    audioObject.src = payload.track;

    // if selected station is the same as current do nothing
    if (payload.play) {
      audioObject.play();
    } else {
      audioObject.pause();
    }

    audioObject.addEventListener('ended', () => {
      chrome.runtime.sendMessage({
        type: RADIO_ACTIONS.TRACK_ENDED,
        payload: {
          endend: audioObject.ended,
        },
      });
    });

    return;
  };
  const toggleVolume = (payload: RadioMessagePayload) => {
    audioObject.volume = payload.volume;
  };
};
