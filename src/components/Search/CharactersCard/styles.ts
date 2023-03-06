import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

export const MainContainer = styled(Grid)({
  "&:not(:last-child)": {
    borderBottom: "2px black solid",
  },
});

export const CharacterHeader = styled(Grid)({
  height: "60px",
  borderBottom: "1px blue solid",
  backgroundColor: blue[200],
});

export const WordContainer = styled(Grid)({
  "&:not(:last-child)": {
    borderBottom: "1px red solid",
  },
});

export const CenteringBox = styled(Grid)({
  alignItems: "center",
  justifyContent: "center",
});
export const CharacterTextLarge = styled("span")({
  fontSize: "25px",
  fontWeight: 500,
});
export const CharacterTextMedium = styled("span")({
  fontSize: "20px",
  fontWeight: 500,
});
interface CharacterInWordType {
  newChar: boolean;
}
export const CharacterInWord = styled(CharacterTextMedium, {
  shouldForwardProp: (props) => props !== "new",
})<CharacterInWordType>(({ theme, newChar }) => ({
  padding: "2px",
  borderRadius: "2px",
  "&:hover": {
    backgroundColor: newChar && theme.palette.primary.main,
    color: newChar && theme.palette.common.white,
  },
}));
