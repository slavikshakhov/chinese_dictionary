import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const ReviewModeContainer = styled("div")({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Card = styled("div")(({ theme }) => ({
  minWidth: "250px",
  minHeight: "200px",
  borderRadius: "6px",
  backgroundColor: blue[100],
}));
