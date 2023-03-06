import { DbData, EntryDB, EntryWithMetadata, WordType } from "../types";
import _ from "lodash";

export const wordExists = (entry: EntryDB, charList: string[]) => {
  return entry.words.find((word: WordType) => {
    return _.isEqual(word.combination, charList);
  });
};

export const buildNewEntry = (newChars: string[], inputChars: string[]) => {
  console.log("BUILDING");
  return newChars.map((ch: string): EntryWithMetadata => {
    return {
      metadata: {
        new: true,
      },
      entryDB: {
        character: ch,
        meaning: "",
        new: false,
        pinyin: "",
        words: [
          {
            combination: inputChars,
            combinationMeanings: "",
            combinationPinyins: "",
            category: "",
          },
        ],
      },
    };
  });
};

export const getAllPinyinsPerEntry = (
  entry: EntryDB,
  characterAndPinyin: { [key in string]: string }
) => {
  return entry.words.map((word: WordType) => {
    return word.combination.map((character: string) => {
      return characterAndPinyin[character];
    });
  });
};
export const isNewCharacter = (newChars: string[], char: string): boolean => {
  return newChars.includes(char);
};

export const getExistingEntries = (
  dbData: EntryDB[],
  charactersList: string[]
) =>
  dbData.length
    ? dbData.filter((el: any) => charactersList.includes(el.character))
    : [];

export const getCharacterAndPinyin = (dbData: EntryDB[]) =>
  dbData.reduce((acc: { [key in string]: string }, entry: EntryDB) => {
    const character = entry.character;
    acc[character] = entry.pinyin;
    return acc;
  }, {});

export const getNewCharacters = (
  existingDbEntries: EntryDB[],
  charactersList: string[]
) => {
  const foundEntriesChars = existingDbEntries.map(
    (entry: any) => entry.character
  );
  return _.difference(charactersList, foundEntriesChars);
};
export const getOldEntries = (
  existingDbEntries: EntryDB[],
  characterAndPinyin: { [key in string]: string },
  isNewEntries: boolean,
  wordExists: boolean,
  charactersList: string[]
) => {
  return existingDbEntries.map((entry: EntryDB, i) => {
    const item: EntryWithMetadata = {
      metadata: {
        new: false,
        wordsPinyins: getAllPinyinsPerEntry(entry, characterAndPinyin),
      },
      entryDB:
        !isNewEntries && wordExists && i === 0
          ? {
              ...entry,
              words: [
                ...entry.words,
                {
                  combination: charactersList,
                  combinationMeanings: "",
                  combinationPinyins: "",
                  category: "",
                },
              ],
            }
          : entry,
    };
    return item;
  });
};

export const getModifiedWords = (data: EntryDB) => {
  return data.words.map((w) => {
    if (typeof w.combination === "string") {
      const encoded = encodeURI(w.combination);
      const result = encoded
        .split(/%E/)
        .map((ch) => `%E${ch}`)
        .filter((el) => el.length === 9);
      w.combination = result;
      console.log({
        combination: w.combination,
        encodedCombination: encoded,
        result,
      });
    }
    return w;
  });
};
export const getModifiedData = (data: EntryDB, modifiedWords: WordType[]) => ({
  ...data,
  character: encodeURI(data.character),
  words: modifiedWords,
});

export const getModifiedEntry = (
  entryDB: EntryDB,
  newChars: string[],
  modifiedWords: WordType[]
) => ({
  ...entryDB,
  words: isNewCharacter(newChars, entryDB.character)
    ? modifiedWords
    : [...entryDB.words, modifiedWords[modifiedWords.length - 1]],
});
