import Dialog from "@mui/material/Dialog";
import react, { useCallback } from "react";
import CharacterCard from "../CharactersCard";

import { EntryDB } from "../../types";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";

export interface PopupProps {
  open: boolean;
  onClose: (value: string) => void;
  selectedCharacters: EntryDB[];
  addToSelectedCharacters: (character: string) => void;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Popup = ({
  onClose,
  open,
  selectedCharacters,
  addToSelectedCharacters,
}: PopupProps) => {
  const handleOnCharacterClick = useCallback(
    (characterString: string) => {
      const found = selectedCharacters.find(
        (entry) => entry.character === characterString
      );
      if (!found) addToSelectedCharacters(characterString);
    },
    [selectedCharacters, addToSelectedCharacters]
  );
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <CharacterCard
        dialogId="draggable-dialog-title"
        selectedCharacters={selectedCharacters}
        handleOnCharacterClick={handleOnCharacterClick}
      />
    </Dialog>
  );
};

export default Popup;
//onClick={addToSelectedCharacters(ch.character)}
