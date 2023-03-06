import { styled } from "@mui/material/styles";

import { blue, red } from "@mui/material/colors";
import { Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

interface EntryWrapperProps {
  newentry: boolean;
  height: number;
}

export const EntryWrapper = styled("div", {
  shouldForwardProp: (props) => props !== "new" && props !== "height",
})<EntryWrapperProps>(({ theme, newentry, height }) => ({
  width: "80vw",
  height: height ? `${height * 40}px` : "40px",
  display: "flex",
  alignItems: "center",
  backgroundColor: newentry ? red[200] : blue[200],
  marginTop: "30px",
}));

interface EntrySectionProps {
  width: number;
}

export const EntrySection = styled("div", {
  shouldForwardProp: (props) => props !== "width",
})<EntrySectionProps>(({ theme, width }) => ({
  display: "flex",
  flex: width,

  height: "100%",
  border: "1px black solid",
}));
export const EntrySectionCentered = styled(EntrySection)({
  alignItems: "center",
  justifyContent: "center",
});

export const Container = styled("div")({
  marginTop: "15px",
});
export const PageSectionSettings = styled("div")({
  display: "flex",
  justifyContent: "end",
  flexDirection: "column",
  alignItems: "start",
  width: "30vw",
});
export const Row = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "end",
});

export const CustomInput = styled(Input)({
  width: "100%",
  height: "100%",
  underline: "none",
});
export const CustomSelect = styled(Select)({
  width: "100%",
  height: "100%",
});
