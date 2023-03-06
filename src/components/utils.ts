import { EntryDB, WordType } from "./types";

export const getFullCharactersUtfList = (characters: string) => {
  const result = characters.split(/%E/);
  const chars: string[] = [];
  if (result.length) {
    result.forEach((char) => {
      if (char.length && char.length === 7 && char.indexOf("'") < 0) {
        chars.push(`%E${char}`);
      }
    });
  }
  return chars;
};
const getAllWordsAsStringInDisplayedEntries = (entries: EntryDB[]) => {
  const wordChars: string[] = [];
  entries.forEach((entry: EntryDB) => {
    entry.words.forEach((w: WordType) => {
      wordChars.push(w.combination.join());
    });
  });
  return wordChars;
};
export const isNewWord = (foundDbEntries: EntryDB[], charList: string[]) => {
  const existingWords = getAllWordsAsStringInDisplayedEntries(foundDbEntries);
  const found =
    existingWords.length > 0 &&
    existingWords.find((word) => word === charList.join());
  console.log({
    found,
    foundDbEntries,
    charList,
    existingWords,
    charlistString: charList.join(),
  });
  return found ? false : true;
};
