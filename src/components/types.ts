// export type WordTypeKeys =
//   | "combination"
//   | "combinationMeanings"
//   | "example"
//   | "category";
// export type WordType = {
//   [key in WordTypeKeys]: string | string[];
// };

export type WordType = {
  combination: string[];
  combinationMeanings: string;
  combinationPinyins?: string;
  example?: string;
  category: string;
  review?: boolean;
};

export interface EntryDB {
  id?: number;
  character: string;
  new: boolean;
  pinyin: string;
  meaning: string;
  words: WordType[];
  review?: boolean;
}

export interface DbData {
  characters: EntryDB[];
  categories: { id: number; value: string }[];
}

export interface CharactersDb {
  characters: EntryDB[];
}

export type CharEntryTypeKey = keyof EntryDB;

export interface Metadata {
  new: boolean;
  wordsPinyins?: string[][];
}

export interface EntryWithMetadata {
  metadata: Metadata;
  entryDB: EntryDB;
}
