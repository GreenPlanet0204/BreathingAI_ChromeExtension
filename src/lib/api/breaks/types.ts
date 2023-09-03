import { AVAILABLE_LANGUAGES } from '../../context/App/storage';

export interface BreakEvent {
  contentUrl: string;
  completed: boolean;
  rating: number;
  lang: AVAILABLE_LANGUAGES;
}
