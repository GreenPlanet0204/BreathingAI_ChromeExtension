export type CustomFrequencyInput = {
  hours: number;
  minutes: number;
};

export function toHours(
  totalSeconds = 12,
  timeOfDay: keyof typeof AmPm
): number {
  const reduction = timeOfDay === 'pm' ? 12 : 0;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const h = Math.floor(totalMinutes / 60);
  return h - reduction;
}

export function toHoursAndMinutes(totalSeconds?: number): CustomFrequencyInput {
  if (!totalSeconds) return { hours: 1, minutes: 30 };
  const totalMinutes = Math.floor(totalSeconds / 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return { hours: h, minutes: m };
}

export function toSeconds(customFrequencyInput: CustomFrequencyInput): number {
  const seconds =
    customFrequencyInput.hours * 60 * 60 + customFrequencyInput.minutes * 60;
  return seconds;
}

export const AmPm = {
  am: 0,
  pm: 12,
};

export const toMinutesAndSeconds = (totalSeconds: number) => {
  var sec_num = Math.floor(totalSeconds);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  var result = '';

  // if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) {
    result = '0' + minutes;
  } else {
    result = minutes.toString();
  }
  if (seconds < 10) {
    result += ':0' + seconds;
  } else {
    result += ':' + seconds.toString();
  }
  return result;
};
