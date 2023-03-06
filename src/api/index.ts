import axios from "axios";

import { EntryDB, WordType } from "../components/types";
// import * as dotenv from "dotenv";
// dotenv.config();

export const getCategories = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_DATABASE_URL}/categories`
  );
};

export const getCharacters = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_DATABASE_URL}/characters`
  );
};

export const updateEntry = async (id: number, entry: EntryDB) => {
  await axios
    .put(
      `${process.env.REACT_APP_BACKEND_DATABASE_URL}/characters/${id}`,
      entry
    )
    .catch((error) => {
      console.log({ errorMessage: error });
    });
};
export const addEntry = async (entry: EntryDB) => {
  await axios
    .post(`${process.env.REACT_APP_BACKEND_DATABASE_URL}/characters/`, entry)
    .catch((error) => {
      console.log(error);
    });
};
export const addWord = async (word: WordType, entryId: number) => {
  const response = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_DATABASE_URL}/characters/${entryId}?_embed=words`,
      word
    )
    .catch((error) => {
      console.log(error);
    });
};

export const updateCategories = async (categories: any) => {
  console.log({ categories });
  const response = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_DATABASE_URL}/categories`,
      categories
    )
    .catch((error) => {
      console.log({ error: error.response.data });
    });
};
