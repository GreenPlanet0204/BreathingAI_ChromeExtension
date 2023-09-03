// types of methods
export enum ImprovementMethodTypes {
  BREATHING = 'breathing',
  BREAK = 'break',
  MEDITATION = 'meditation',
  EXCERCISE = 'excercise',
  INTERFACE = 'interface',
  NUTRITION = 'nutrition',
}

// Improvement Categories
export enum ImprovementCategory {
  STRESS = 'stress',
  FOCUS = 'focus',
  ANXIETY = 'anxiety',
  DEPRESSION = 'depression',
  TENSION = 'tension',
  POSTURE = 'posture',
  ENERGY = 'energy',
}

export interface ContentFilter {
  filter: {
    userId?: string;
    method?: ImprovementMethodTypes[];
    category?: ImprovementCategory[];
  };
  pagination: {
    page?: number;
    offset?: number;
    limit?: number;
  };
}

export interface ContentCollection {
  content: Content[];
  total: number;
}

export interface Content {
  name: string;
  file: {
    url: string;
    size: number;
    contentType: string;
    image: string;
  };
  bookmarked: boolean;
  rating?: number;
  method: ImprovementMethodTypes;
  category: ImprovementCategory;
}

export type SoundFile = {
  name: string;
  url: string;
};

export interface libraryModel {
  id: string
  type: string
  name: string
  time: string
  image: string
  videoLink: string
}
