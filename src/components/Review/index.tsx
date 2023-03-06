import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Container,
  ReviewCharacterBtn,
  ReviewContainer,
  StartReviewBtnContainer,
} from "./styles";
import { Grid, Checkbox, ListItemText } from "@mui/material";

import { EntryDB } from "../types";
import { getCharacters, updateEntry } from "../../api";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { sectionsVisibilityNames } from "./constants";
import Button from "@mui/material/Button";
import ReviewModeSection from "./ReviewModeSection";

const Review = () => {
  const [dbData, setDbData] = useState<EntryDB[]>([]);

  const [reviewCharactersMode, setReviewCharactersMode] = useState(false);

  const [visibilityItems, setVisibilityItems] = useState<string[]>(
    sectionsVisibilityNames
  );

  const getCharactersData = useCallback(async () => {
    const { data } = await getCharacters();
    if (data) setDbData(data);
  }, []);

  useEffect(() => {
    getCharactersData();
  }, [getCharactersData]);

  const setCharacterToReview = useCallback(
    async (entry: EntryDB) => {
      if (!entry.id) return;
      const review = entry.review;
      await updateEntry(entry.id, { ...entry, review: !review });
      getCharactersData();
    },
    [getCharactersData]
  );

  const charactersToReview = useMemo(
    () => (dbData.length ? dbData.filter((entry) => entry.review) : []),
    [dbData]
  );

  useEffect(
    () =>
      console.log({
        visibilityItems,
        allIndex: visibilityItems.indexOf("all"),
      }),
    [visibilityItems]
  );
  const handleChange = useCallback((event: any) => {
    const {
      target: { value },
    } = event;
    setVisibilityItems(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  }, []);

  const handleStartReviewCharacters = useCallback(() => {
    setVisibilityItems([]);
    setReviewCharactersMode(true);
  }, []);

  const handleStopReview = useCallback(() => {
    setReviewCharactersMode(false);
    setVisibilityItems(sectionsVisibilityNames);
  }, []);
  return (
    <Container>
      <Grid container>
        {!reviewCharactersMode ? (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Show/hide sections
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={visibilityItems}
              onChange={handleChange}
              // label="Show Sections"
              multiple
              renderValue={(selected) => selected.join(", ")}
            >
              {sectionsVisibilityNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={visibilityItems.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={handleStopReview}
          >
            Stop Review
          </Button>
        )}
      </Grid>

      <ReviewContainer container>
        <Grid
          container
          item
          xs
          sx={{
            display: visibilityItems.indexOf("all") >= 0 ? "flex" : "none",
          }}
        >
          {dbData &&
            dbData.map((entry: EntryDB) => (
              <ReviewCharacterBtn
                key={entry.character}
                reviewStatus={!!entry.review}
                onClick={() => setCharacterToReview(entry)}
              >
                {decodeURI(entry.character)}
              </ReviewCharacterBtn>
            ))}
        </Grid>

        <Grid
          container
          item
          direction="column"
          xs
          sx={{
            backgroundColor: "yellow",
            display:
              visibilityItems.indexOf("characters") >= 0 ? "flex" : "none",
          }}
        >
          <Grid container item xs>
            {charactersToReview.map((entry: EntryDB) => (
              <div key={entry.character}>{decodeURI(entry.character)}</div>
            ))}
          </Grid>
          <StartReviewBtnContainer container item xs="auto">
            <Button
              variant="text"
              size="small"
              onClick={handleStartReviewCharacters}
            >
              Start Review
            </Button>
          </StartReviewBtnContainer>
        </Grid>
        <Grid
          container
          item
          xs
          sx={{
            backgroundColor: "red",
            display: visibilityItems.indexOf("words") >= 0 ? "flex" : "none",
          }}
        >
          {charactersToReview.map((entry: EntryDB) => (
            <div key={entry.character}>{decodeURI(entry.character)}</div>
          ))}
        </Grid>
        {reviewCharactersMode && (
          <Grid container item xs>
            <ReviewModeSection charactersToReview={charactersToReview} dbData={dbData} />
          </Grid>
        )}
      </ReviewContainer>
    </Container>
  );
};

export default Review;
