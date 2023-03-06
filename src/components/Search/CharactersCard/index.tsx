import { Grid } from "@mui/material";
import React, { useCallback } from "react";
import { EntryDB, WordType } from "../../types";
import {
  CenteringBox,
  CharacterHeader,
  CharacterInWord,
  CharacterTextLarge,
  CharacterTextMedium,
  MainContainer,
  WordContainer,
} from "./styles";

interface IProps {
  selectedCharacters: EntryDB[];
  handleOnCharacterClick: (ch: string) => void;
  dialogId: string;
}
const CharacterCard = ({
  selectedCharacters,
  handleOnCharacterClick,
  dialogId,
}: IProps) => {
  const isCharacterInSelection = useCallback(
    (character: string) => {
      return !!selectedCharacters.find(
        (entry) => entry.character === character
      );
    },
    [selectedCharacters]
  );

  const renderWordSymbols = (word: WordType) => {
    return word.combination.map((char: string) => (
      <CharacterInWord
        key={char}
        newChar={!isCharacterInSelection(char)}
        onClick={() => handleOnCharacterClick(char)}
      >
        {decodeURI(char)}
      </CharacterInWord>
    ));
  };

  return (
    <div style={{ width: "300px", maxHeight: "600px" }}>
      <Grid container>
        {selectedCharacters.length > 0 &&
          selectedCharacters.map((entry) => (
            <MainContainer key={entry.character} container>
              <CharacterHeader container id={dialogId}>
                <CenteringBox
                  item
                  container
                  xs={6}
                  sx={{ borderRight: "1px blue solid" }}
                >
                  <CharacterTextLarge>
                    {decodeURI(entry.character)}
                  </CharacterTextLarge>
                </CenteringBox>
                <Grid item xs={6} container>
                  <CenteringBox item container xs={12}>
                    {entry.pinyin}
                  </CenteringBox>
                  <CenteringBox item xs={12} container>
                    {entry.meaning}
                  </CenteringBox>
                </Grid>
              </CharacterHeader>

              <Grid container>
                {entry.words.map((w) => (
                  <WordContainer
                    key={w.combinationMeanings}
                    item
                    xs={12}
                    container
                  >
                    <Grid
                      container
                      item
                      xs={4}
                      columnSpacing={2}
                      sx={{ borderRight: "1px blue solid" }}
                    >
                      <CenteringBox item xs={12} container>
                        <CharacterTextMedium>
                          {w.combination && w.combination.length > 0
                            ? renderWordSymbols(w)
                            : ``}
                        </CharacterTextMedium>
                      </CenteringBox>
                      <CenteringBox item xs={12} container>
                        {`pinyin`}
                      </CenteringBox>
                      <CenteringBox item xs={12} container>
                        {w.combinationMeanings}
                      </CenteringBox>
                    </Grid>
                    <Grid item xs={8}>
                      <CharacterTextMedium>{w.example}</CharacterTextMedium>
                    </Grid>
                  </WordContainer>
                ))}
              </Grid>
            </MainContainer>
            // <CardVerticalSection key={entry.character}>
            //   <Row>
            //     <Section>
            //       <CharacterSymbol>{decodeURI(entry.character)}</CharacterSymbol>
            //     </Section>
            //     <Section>
            //       <Row>{entry.pinyin}</Row>
            //       <Row>{entry.meaning}</Row>
            //     </Section>
            //   </Row>

            //   {entry.words.map((w) => (
            //     <Row key={w.combination[0]}>
            //       <Section>{renderWordSymbols(w)}</Section>
            //       <Section>{w.combinationMeanings}</Section>
            //     </Row>
            //   ))}
            // </CardVerticalSection>
          ))}
      </Grid>
    </div>
  );
};

export default CharacterCard;
