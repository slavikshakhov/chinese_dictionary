import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import NewWindow from "react-new-window";
import { getCharacters } from "../../api";
import Popup from "./Popup";
import { DbData, EntryDB } from "../types";
import {
  Character,
  SearchButton,
  SearchContainer,
  SearchManager,
  SearchResults,
} from "./style";

const Search = () => {
  const [entries, setEntries] = useState<EntryDB[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<EntryDB[]>([]);
  const [open, setOpen] = React.useState(false);
  const [showNewChars, setShowNewChars] = useState(false);

  const handleClickOpen = (ch: EntryDB) => {
    setOpen(true);
    setSelectedCharacters((prev) => [...prev, ch]);
  };

  const handleClose = useCallback((value: string) => {
    setOpen(false);
    setSelectedCharacters([]);
  }, []);

  const getCharactersData = useCallback(async () => {
    const { data } = await getCharacters();
    if (!data) return;
    setEntries(data);
    // showNewChars
    //   ? setEntries(data.filter((entry: EntryDB) => entry.new === true))
    //   : setEntries(data);
  }, []);

  useEffect(() => {
    getCharactersData();
  }, [getCharactersData]);

  const addToSelectedCharacters = useCallback(
    (ch: string) => {
      console.log({ characterAdded: ch });
      const newSelectedEntry = entries.find((entry) => entry.character === ch);

      if (newSelectedEntry)
        setSelectedCharacters((prev) => [...prev, newSelectedEntry]);
    },
    [entries]
  );

  const displayCharacter = useCallback(
    (entry: EntryDB) => {
      if (!showNewChars) return entry;
      else return entry.new;
    },
    [showNewChars]
  );

  return (
    <SearchContainer>
      <SearchManager>
        <SearchButton
          variant="contained"
          size="small"
          onClick={() => setShowNewChars(false)}
        >
          All
        </SearchButton>
        <SearchButton
          variant="contained"
          size="small"
          onClick={() => setShowNewChars(true)}
        >
          New
        </SearchButton>
      </SearchManager>
      <SearchResults>
        {entries.length > 0 &&
          entries.map((ch) => (
            <Character
              key={ch.character}
              newChar={ch.new}
              onClick={() => handleClickOpen(ch)}
              sx={{ display: !displayCharacter(ch) ? "none" : "inline-block" }}
            >
              {decodeURI(ch.character)}
            </Character>
          ))}
      </SearchResults>
      {selectedCharacters.length > 0 && (
        <Popup
          open={open}
          onClose={handleClose}
          selectedCharacters={selectedCharacters}
          addToSelectedCharacters={addToSelectedCharacters}
        />
      )}
    </SearchContainer>
  );
};

export default Search;
