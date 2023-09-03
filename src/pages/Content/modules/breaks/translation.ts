import { AVAILABLE_LANGUAGES } from '../../../../lib/context/App/storage';

const translations = {
  [AVAILABLE_LANGUAGES.EN]: {
    ratings_title:
      'Thanks for taking a break for yourself! Please rate your experience!',
    break_time: 'Break Time',
    take_break: 'Take a break',
    snooze: 'Snooze',
    submit: 'Submit',
    hey_looks_like_you_could_use_breather:
      'Hey! Looks like you could use a breather.',
  },
  [AVAILABLE_LANGUAGES.ES]: {
    ratings_title:
      '¡Gracias por tomarte un descanso! ¡Califica tu experiencia!',
    break_time: 'Descanso',
    take_break: 'Tomar un descanso',
    snooze: 'Siesta',
    hey_looks_like_you_could_use_breather:
      '¡Ey! Parece que te vendría bien un respiro.',
    submit: 'Entregar',
  },
};

export default translations;
