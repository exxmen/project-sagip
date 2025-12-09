export enum Language {
  ENGLISH = 'English',
  TAGALOG = 'Tagalog',
  CEBUANO = 'Cebuano',
  TAGLISH = 'Taglish'
}

export interface RemediationData {
  conceptReview: string;
  practiceProblems: string[];
  answerKey: string[];
}

export interface AppState {
  image: string | null; // Base64 string
  isLoading: boolean;
  result: RemediationData | null;
  language: Language;
  error: string | null;
}