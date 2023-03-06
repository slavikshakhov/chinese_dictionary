import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const SearchContainer = styled("div")({
  width: "100vw",
  // height: "100vh",
});
export const SearchManager = styled("div")({
  width: "100%",
  height: "30px",
  padding: "20px",
  borderBottom: `1px solid ${blue[600]}`,
});
export const SearchResults = styled("div")({
  width: "100%",
  margin: "10px",
  // backgroundColor: "lightgray",
});

interface CharacterProps {
  newChar: boolean;
}

export const Character = styled("span", {
  shouldForwardProp: (props) => props !== "newChar",
})<CharacterProps>(({ newChar, theme }) => ({
  color: newChar ? "red" : "black",
  fontSize: "28px",
  fontWeight: 500,
  padding: "3px",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

export const SearchButton = styled(Button)(({theme}) => ({
  marginRight: '10px'
}))
