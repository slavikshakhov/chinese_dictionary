import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  KeyboardEventHandler,
  KeyboardEvent,
} from "react";
import { Box, Fade } from "@mui/material";
import { EntryDB } from "../../types";
import { Card, ReviewModeContainer } from "./styles";
import Grid from "@mui/material/Grid";
import ReviewCard from "./ReviewCard";
import ReviewSettingsForm from "./ReviewSettingsForm";
import { ReviewFormInputs } from "./types";
import { initialReviewSettings } from "./constants";

interface IProps {
  charactersToReview: EntryDB[];
  dbData: EntryDB[]
}
const ReviewModeSection = ({ charactersToReview, dbData}: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCard, setShowCard] = useState(true);
  const [repeatList, setRepeatList] = useState(charactersToReview);
  const [reviewSettings, setReviewSettins] = useState<ReviewFormInputs>(
    initialReviewSettings
  );

  const handleUserKeyPress = useCallback(
    async (event: any) => {
      console.log({ event: event.key });
      if (event.key !== "Enter" && event.key !== "Shift") return;
      console.log("ENTER");
      setTimeout(() => {
        setShowCard(true);
        if (event.key === "Shift") {
          const listClone = [...repeatList];
          listClone.splice(currentIndex, 1);
          console.log({ listClone });

          setRepeatList(listClone);
        }
        if (event.key === "Enter") {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 1000);
      console.log("END OF TIMEOUT");
      setShowCard(false);
    },
    [currentIndex, repeatList]
  );

  useEffect(() => {
    if (currentIndex >= repeatList.length && repeatList.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, repeatList.length]);

  const currentCard = useMemo(() => {
    if (currentIndex >= repeatList.length) return;
    return repeatList[currentIndex];
  }, [currentIndex, repeatList]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      console.log("REMOVE");
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const submitReviewSettings = useCallback((data: ReviewFormInputs) => {
    console.log({ data });
    setReviewSettins(data);
  }, []);

  return (
    <Grid container direction="column" sx={{ height: "700px" }}>
      <ReviewSettingsForm reviewSettings={reviewSettings} formSubmitHandler={submitReviewSettings} />
      <Grid
        item
        xs
        sx={{
          width: "100%",
          backgroundColor: "lightcoral",
          alignItems: "center",
          justifyContent: "center",
        }}
        container
      >
        {currentCard && (
          <ReviewCard
            entry={currentCard}
            showCard={showCard}
            reviewSettings={reviewSettings}
            dbData={dbData}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ReviewModeSection;
