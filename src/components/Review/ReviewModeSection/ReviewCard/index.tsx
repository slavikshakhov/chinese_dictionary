import { Fade, Grid } from "@mui/material";
import React, { memo, useEffect } from "react";
import { EntryDB, WordType } from "../../../types";
import { Card } from "../styles";
import { ReviewFormInputs } from "../types";
import { getDecodedWord, getWordPyinin } from "./utils";

interface IProps {
  entry: EntryDB;
  showCard: boolean;
  reviewSettings: ReviewFormInputs;
  dbData: EntryDB[];
}
const ReviewCard = ({ entry, showCard, reviewSettings, dbData }: IProps) => {
  const { showCharacter, showWords, showPinyin, showMeaning, showExamples } =
    reviewSettings;
  useEffect(
    () => console.log({ showCharacter, showPinyin, entry }),
    [showCharacter, showPinyin, entry]
  );
  return (
    <Fade
      in={showCard}
      // timeout={500}
    >
      <Card>
        <Grid
          container
          direction={showWords ? "row" : "column"}
          sx={{
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "yellow",
            height: showWords ? "auto" : "100%",
          }}
        >
          <Grid
            item
            xs
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: showWords ? "auto" : "100%",
            }}
          >
            {decodeURI(entry.character)}
          </Grid>
          {showPinyin && (
            <Grid
              item
              xs
              container
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {entry.pinyin}
            </Grid>
          )}
          {showMeaning && (
            <Grid
              item
              xs
              container
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {entry.meaning}
            </Grid>
          )}
        </Grid>
        {showWords &&
          entry.words.length > 0 &&
          entry.words.map((word: WordType) => (
            <Grid key={word.combination[0]} item container xs>
              <Grid item xs={2} sx={{ p: 4 }}>
                {getDecodedWord(word.combination)}
              </Grid>
              {showPinyin && (
                <Grid item xs={3} sx={{ p: 4 }}>
                  {getWordPyinin(word.combination, dbData)}
                </Grid>
              )}
              {showMeaning && (
                <Grid item xs={3} sx={{ p: 4 }}>
                  {word.combinationMeanings}
                </Grid>
              )}
              {showExamples && (
                <Grid item xs={4} sx={{ p: 4 }}>
                  {word.example || ""}
                </Grid>
              )}
            </Grid>
          ))}
      </Card>
    </Fade>
  );
};

export default ReviewCard;
