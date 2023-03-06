import React, { useEffect, useMemo, useCallback } from "react";
import {
  CustomInput,
  CustomSelect,
  EntrySection,
  EntrySectionCentered,
} from "../../styles";
import { WordContainer } from "./styles";
import _ from "lodash";
import { EntryDB, WordType } from "../../types";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Controller,
  useForm,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { isNewWord } from "../../utils";

interface IProps {
  word: WordType;
  charactersList: string[];
  newentry: boolean;
  index: number;
  combinationPinyins?: string[];
  categories: any[];
  methods: any;
  existingDbEntries: EntryDB[];
}
const Word = ({
  word,
  newentry,
  charactersList,
  index,
  combinationPinyins,
  categories,
  methods,
  existingDbEntries,
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const newPinyin = useWatch({ control: methods.control, name: "pinyin" });
  const wordChars = useMemo(() => {
    const combination = word.combination as string[];
    let decoded = "";
    combination.forEach((w: string) => (decoded += decodeURI(w)));
    // const result = decoded.join();
    // console.log({ result });
    return decoded;
  }, [word]);

  const wordMeanings = useMemo(
    () => word.combinationMeanings as string,
    [word]
  );
  const wordExample = useMemo(
    () => (word.example as string) || ("" as string),
    [word]
  );
  const wordCategory = useMemo(
    () => (word.category as string) || ("" as string),
    [word]
  );

  useEffect(
    () =>
      console.log({
        combinationPinyins,
        newentry,
        existingPinyin: word.combinationPinyins,
      }),
    [combinationPinyins, newentry, word.combinationPinyins]
  );
  const isThisWordExist = useMemo(() => {
    const dbWords = existingDbEntries
      .map((entry) => {
        return entry.words.map((w) => w.combination.join());
      })
      .flat();
    console.log({ dbWords, charactersList: charactersList.join() });
    const found = dbWords.find(
      (word: string) => word === charactersList.join()
    );
    return found === word.combination.join();
  }, [charactersList, existingDbEntries, word.combination]);

  return (
    <WordContainer
      style={{
        backgroundColor: isThisWordExist ? "red" : "white",
      }}
    >
      <EntrySectionCentered width={2}>
        <Controller
          name={`words[${index}].combination`}
          control={control}
          defaultValue={wordChars || ""}
          render={({ field }) => <CustomInput {...field} />}
        />
      </EntrySectionCentered>
      <EntrySection
        width={3}
        sx={{ backgroundColor: newentry ? "gray" : "white" }}
      >
        <div>{combinationPinyins?.join(" ")}</div>
      </EntrySection>
      <EntrySection width={3}>
        <Controller
          name={`words[${index}].combinationMeanings`}
          control={control}
          defaultValue={wordMeanings || ""}
          render={({ field }) => <CustomInput {...field} />}
        />
      </EntrySection>

      <EntrySection width={3}>
        <Controller
          name={`words[${index}].example`}
          control={control}
          defaultValue={wordExample || ""}
          render={({ field }) => <CustomInput {...field} />}
        />
      </EntrySection>

      <EntrySection width={2}>
        <Controller
          name={`words[${index}].category`}
          control={control}
          defaultValue={wordCategory || ""}
          render={({ field }) => (
            <CustomSelect {...field}>
              {categories &&
                categories.length > 0 &&
                categories.map(({ value }) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
            </CustomSelect>
          )}
        />
      </EntrySection>
    </WordContainer>
  );
};

export default Word;
