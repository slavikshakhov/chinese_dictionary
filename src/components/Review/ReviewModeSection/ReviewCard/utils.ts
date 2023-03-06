import { EntryDB } from "../../../types";

export const getDecodedWord = (chars: string[]) => {
  let result = "";
  chars.forEach((ch: string) => {
    result += decodeURI(ch);
  });
  return result;
};

export const getWordPyinin = (chars: string[], dbData: EntryDB[]) => {
  if (!dbData.length || !chars.length) return;
  const result: string[] = [];
  dbData.forEach((entry: EntryDB) => {
    chars.forEach((ch: string) => {
      if (entry.character === ch) {
        result.push(entry.pinyin);
      }
    });
  });
  return result;
};
