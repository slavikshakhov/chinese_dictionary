import Button from "@mui/material/Button/Button";
import { green, red, blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";

export const Container = styled("div")({
  width: "100vw",
  // height: "100vh",
});

export const ReviewContainer = styled(Grid)({
  // width: "100vw",
  // height: "100vh",
});

interface ReviewCharacterInterface {
  reviewStatus: boolean;
}
export const ReviewCharacter = styled("div", {
  shouldForwardProp: (props) => props !== "reviewStatus",
})<ReviewCharacterInterface>(({ theme, reviewStatus }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "2px",
  backgroundColor: reviewStatus ? red[200] : green[200],
  fontSize: "25px",
  margin: "5px",
  padding: "2px",
}));

export const StartReviewBtnContainer = styled(Grid)({
  justifyContent: "center",
  margin: "5px",
});

export const ReviewCharacterBtn = styled(Button, {
  shouldForwardProp: (props) => props !== "reviewStatus",
})<ReviewCharacterInterface>(({ theme, reviewStatus }) => ({
  borderRadius: "2px",
  backgroundColor: reviewStatus ? red[200] : green[200],
  fontSize: "20px",
  margin: "3px",
  padding: 0,
  color: theme.palette.common.black,
  "&:hover": {
    backgroundColor: reviewStatus ? red[300] : green[300],
  },
  "&:active": {
    backgroundColor: reviewStatus ? red[100] : green[100],
  },
}));

export const ReviewSection = styled("div")({
  width: "90%",
  minHeight: "50vh",
  backgroundColor: blue[100],
  display: "flex",
});
