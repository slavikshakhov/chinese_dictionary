import React, { useEffect, useMemo } from "react";
import {
  Controller,
  useForm,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import { resolver } from "./formResolver";

import _ from "lodash";
import {
  CustomInput,
  EntrySection,
  EntrySectionCentered,
  EntryWrapper,
} from "../../styles";
import Word from "../Word";

import { EntryDB, EntryWithMetadata } from "../../types";

import { Button, Input } from "@mui/material";

import Switch from "@mui/material/Switch";

interface IProps {
  entry: EntryWithMetadata;

  charactersList: string[];
  dbData?: any;
  setDbData: (newValue: any) => void;
  categories: any[];
  combinationPinyins?: string;
  submitForm: (data: EntryDB, id?: number) => void;
  existingDbEntries: EntryDB[];
}
const Entry = ({
  entry,

  charactersList,
  dbData,
  categories,

  submitForm,
  existingDbEntries,
}: IProps) => {
  console.log({ entry });

  const methods = useForm<EntryDB>();

  const { metadata, entryDB } = entry;
  const characterDecoded = useMemo(() => {
    if (!entryDB) return;
    const character = entryDB.character;
    if (!character) return "";
    if (character.length === 9) return decodeURI(character);
  }, [entryDB]);

  const words = useMemo(() => {
    if (!entryDB) return [];
    return entryDB.words || [];
  }, [entryDB]);

  const formSubmitHandler: SubmitHandler<EntryDB> = (data: EntryDB) => {
    // if no validation errors

    submitForm(data, entryDB.id);
  };

  useEffect(() => console.log({ entryDB: entry.entryDB }), [entry]);
  return (
    <FormProvider {...methods}>
      <form>
        <EntryWrapper newentry={metadata.new} height={words.length}>
          <EntrySectionCentered width={1}>
            <Controller
              name="character"
              control={methods.control}
              defaultValue={characterDecoded || ""}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    input: { textAlign: "center" },
                  }}
                />
              )}
            />
          </EntrySectionCentered>
          <EntrySectionCentered width={1}>
            <Controller
              name="pinyin"
              control={methods.control}
              defaultValue={entryDB.pinyin || ""}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  sx={{ input: { textAlign: "center" } }}
                />
              )}
            />
          </EntrySectionCentered>
          <EntrySectionCentered width={2}>
            <Controller
              name="meaning"
              control={methods.control}
              defaultValue={entryDB.meaning || ""}
              render={({ field }) => <CustomInput {...field} />}
            />
          </EntrySectionCentered>
          <EntrySectionCentered width={1}>
            <Controller
              name="new"
              control={methods.control}
              defaultValue={entryDB.new}
              render={({ field }) => (
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={field.onChange}
                  // value={entryDB.new}
                  // onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              )}
            />
          </EntrySectionCentered>

          <EntrySection width={10} sx={{ flexDirection: "column" }}>
            {words.length > 0 &&
              words.map((word: any, i: number) => (
                <Word
                  key={i}
                  word={word}
                  index={i}
                  newentry={metadata.new}
                  charactersList={charactersList}
                  categories={categories}
                  combinationPinyins={
                    metadata.wordsPinyins ? metadata.wordsPinyins[i] : []
                  }
                  methods={methods}
                  existingDbEntries={existingDbEntries}
                />
              ))}
          </EntrySection>
          <EntrySectionCentered width={1}>
            <Button onClick={methods.handleSubmit(formSubmitHandler)}>
              Submit
            </Button>
          </EntrySectionCentered>
        </EntryWrapper>
      </form>
    </FormProvider>
  );
};

export default Entry;
