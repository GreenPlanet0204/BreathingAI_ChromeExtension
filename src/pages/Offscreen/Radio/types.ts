export enum RADIO_ACTIONS {
  TOGGLE = 'toggle',
  SKIP = 'skip',
  CHANGE_STATION = 'change_station',
  VOLUME = 'volume',
  TRACK_ENDED = 'track_ended',
}

export enum STATIONS {
  ZEN = 'zen',
  NATURE = 'nature',
  WATER = 'watrer',
}

export type RadioMessage = {
  type: RADIO_ACTIONS;
  payload: Partial<RadioMessagePayload>;
};

export type RadioMessagePayload = {
  station: STATIONS;
  track: string;
  play: boolean;
  volume: number;
};
