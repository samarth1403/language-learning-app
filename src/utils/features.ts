import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateOptions = (
  meanings: { Text: string }[],
  idx: number
): string[] => {
  const correctAns: string = meanings[idx].Text;
  const incorrectOptionsExceptCorrectAns = meanings.filter((i) => {
    return i.Text !== correctAns;
  });
  //sampleSize function of loadash will generate 3 random non correct options from incorrectOptionsExceptCorrectAns
  const incorrectOptions: string[] = _.sampleSize(
    incorrectOptionsExceptCorrectAns,
    3
  ).map((i) => {
    return i.Text;
  });

  const options = _.shuffle([...incorrectOptions, correctAns]);
  return options;
};

const textToSpeechKey = import.meta.env.VITE_TEXT_TO_SPEECH_API_KEY;
const microsoftTranslationApiKey = import.meta.env
  .VITE_MICROSOFT_TRANSLATION_API_KEY;
const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const translateWords = async (
  convertingLang: languageType
): Promise<WordType[]> => {
  try {
    const words = generate(8).map((i) => ({
      Text: i,
    }));

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": convertingLang,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": microsoftTranslationApiKey,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    const receive: FetchedDataType[] = response.data;

    const arr: WordType[] = receive.map((i, idx) => {
      const options: string[] = generateOptions(words, idx);
      return {
        word: i.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });
    return arr;
  } catch (error) {
    console.log(error);
    throw new Error("Some Error");
  }
};

export const ansEvaluation = (arr1: string[], arr2: string[]): number => {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays are not of equal length");
  }
  let matchedCount = 0;
  for (let index = 0; index < arr1.length; index++) {
    if (arr1[index] === arr2[index]) {
      matchedCount++;
    }
  }
  return matchedCount;
};

export const fetchAudio = async (
  text: string,
  language: languageType
): Promise<string> => {
  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else if (language === "hi") encodedParams.set("hl", "hi-in");
  else if (language === "de") encodedParams.set("hl", "de-de");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: { key: textToSpeechKey },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );
  return data;
};

type translateArgType = Pick<
  translationDataType,
  "word" | "fromLang" | "toLang"
>;
export const translateWord = async ({
  word,
  fromLang,
  toLang,
}: translateArgType): Promise<translationDataType> => {
  try {
    const sentData = [{ Text: word }];
    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      sentData,
      {
        params: {
          "to[0]": toLang,
          "api-version": "3.0",
          from: fromLang,
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": microsoftTranslationApiKey,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    const res: FetchedDataType[] = response.data;
    const result: string = res[0].translations[0].text;
    return {result,word,fromLang,toLang};
  } catch (error) {
    console.log(error);
    throw new Error("Some Error");
  }
};
