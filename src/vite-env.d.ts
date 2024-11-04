/// <reference types="vite/client" />

type languageInfoType = {
  name: string;
  code: string;
};

type languageType = "ja" | "hi" | "es" | "fr" | "de" | "kn" | "mr" | "gu";

type WordType = {
  word: string;
  meaning: string;
  options: string[];
};

type stateType = {
  loading: boolean;
  result: string[];
  words: WordType[];
  error?: string;
  user: {
    email: string;
  };
};

type FetchedDataType = {
  translations: {
    text: string;
  }[];
};

type FetchLanguageDataType = {
  language: string;
  score: number;
};

type userType = {
  email: string;
  password: string;
};

type translationDataType = {
  word: string;
  result: string;
  fromLang: string;
  toLang: string;
};

// declare namespace NodeJS {
//   interface ProcessEnv {
//     VITE_REACT_APP_API_KEY: string;
//     // Add other environment variables here if needed
//   }
// }
