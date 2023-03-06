import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
} from "react";
import {
  Center,
  CharacterInput,
  CustomInput,
  InputContainer,
  PageContainer,
} from "./styles";

import _ from "lodash";
import Entry from "./Entry";
import { getFullCharactersUtfList, isNewWord } from "../utils";
import {
  addEntry,
  getCategories,
  getCharacters,
  updateCategories,
  updateEntry,
} from "../../api";
import { EntryDB, EntryWithMetadata } from "../types";
import { Container } from "../styles";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";

import {
  buildNewEntry,
  getCharacterAndPinyin,
  getExistingEntries,
  getModifiedData,
  getModifiedEntry,
  getModifiedWords,
  getNewCharacters,
  getOldEntries,
} from "./utils";

const MainPage = () => {
  const [characters, setCharacters] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [dbData, setDbData] = useState<EntryDB[]>([]);

  const [entries, setEntries] = useState<EntryWithMetadata[]>([]);
  const isNewEntries = useRef(false);
  const newChars = useRef([]);

  const charactersList = useMemo(() => {
    if (!searchWord.length) return [];
    return getFullCharactersUtfList(searchWord);
  }, [searchWord]);

  const getCategoriesData = useCallback(async () => {
    const { data } = await getCategories();
    if (data) setCategories(data);
  }, []);

  const getCharactersData = useCallback(async () => {
    const { data } = await getCharacters();
    if (data) setDbData(data);
  }, []);

  useEffect(() => {
    getCategoriesData();
  }, [getCategoriesData]);

  useEffect(() => {
    if (charactersList.length) getCharactersData();
  }, [charactersList, getCharactersData, categories]);

  useEffect(() => {
    if (!charactersList.length) {
      setEntries([]);
    }
  }, [charactersList]);

  const characterDecoded = useMemo(() => {
    if (!characters) return;
    return decodeURI(characters);
  }, [characters]);

  const handleChange = useCallback((e: any) => {
    setCharacters(encodeURI(e.target.value));
  }, []);

  const existingDbEntries = useMemo(
    () => getExistingEntries(dbData, charactersList),
    [dbData, charactersList]
  );

  const characterAndPinyin = useMemo(
    () => getCharacterAndPinyin(dbData),
    [dbData]
  );

  const wordExists = useMemo(
    () => isNewWord(existingDbEntries, charactersList),
    [charactersList, existingDbEntries]
  );

  useEffect(() => {
    if (!charactersList.length || !dbData.length) return;
    newChars.current = getNewCharacters(existingDbEntries, charactersList);
    isNewEntries.current = newChars.current.length > 0;

    const oldEntries = getOldEntries(
      existingDbEntries,
      characterAndPinyin,
      isNewEntries.current,
      wordExists,
      charactersList
    );
    let newEntries: EntryWithMetadata[] = [];
    if (isNewEntries.current) {
      newEntries = buildNewEntry(newChars.current, charactersList);
    }
    const allEntries: EntryWithMetadata[] = [...newEntries, ...oldEntries];
    setEntries(allEntries);
  }, [
    dbData,
    charactersList,
    existingDbEntries,
    wordExists,
    characterAndPinyin,
  ]);

  const onCategoryHandle = useCallback(() => {
    if (!newCategory.length) return;
    const exists = categories.find((c) => c.value === newCategory);
    if (!exists) {
      const updatedItem = { value: newCategory };
      updateCategories(updatedItem);
      setCategories((prev) => [...prev, updatedItem]);
      // getCategoriesData();
    }
  }, [newCategory, categories]);

  const submitForm = useCallback(
    (data: EntryDB, id?: number) => {
      if (!data) return;
      const modifiedWords = getModifiedWords(data);

      if (!entries.length) return;
      const modifiedData = getModifiedData(data, modifiedWords);
      if (!isNewEntries.current && id) {
        updateEntry(id, modifiedData);
        return;
      }
      entries.forEach(({ entryDB, metadata }, i) => {
        if (i === 0) {
          entryDB.id
            ? updateEntry(entryDB.id, {
                ...entryDB,
                words: modifiedWords,
              })
            : addEntry(modifiedData);
        } else {
          const modifiedEntry = getModifiedEntry(
            entryDB,
            newChars.current,
            modifiedWords
          );
          if (entryDB.id) updateEntry(entryDB.id, modifiedEntry);
          else addEntry(modifiedEntry);
        }
      });
      getCharactersData();
    },
    [entries, getCharactersData]
  );

  const handleInputSubmit = useCallback(() => {
    setEntries([]);
    setSearchWord(characters);
  }, [characters]);

  return (
    <PageContainer>
      <Center>
        <InputContainer>
          <CharacterInput
            id="outlined-basic"
            onChange={handleChange}
            value={characterDecoded}
            disableUnderline
          />
          <Button variant="contained" size="small" onClick={handleInputSubmit}>
            Search Word
          </Button>
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button variant="contained" size="small" onClick={onCategoryHandle}>
            Add category
          </Button>
        </InputContainer>
      </Center>

      <Container>
        {entries.length > 0 &&
          entries.map((entry: EntryWithMetadata, i) => {
            console.log({ entryInMap: entry });
            return (
              <Entry
                key={i}
                entry={entry}
                charactersList={charactersList}
                dbData={dbData}
                setDbData={setDbData}
                categories={categories}
                submitForm={submitForm}
                existingDbEntries={existingDbEntries}
              />
            );
          })}
      </Container>
    </PageContainer>
  );
};

export default MainPage;
