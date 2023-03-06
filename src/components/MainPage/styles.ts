import { Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
export const Text = styled("div")(({ theme }) => ({
  color: theme.palette.secondary.dark,
}));

export const PageContainer = styled("div")(({ theme }) => ({
  width: "100vw",
  // height: "100vh",
  backgroundColor: theme.palette.common.white,
  padding: "20px",
}));
export const Center = styled("div")(({ theme }) => ({
  display: "flex",

  justifyContent: "center",
}));
export const InputContainer = styled("div")(({ theme }) => ({
  height: "50px",
  width: "600px",
  display: "flex",
  alignItems: "center",
}));

export const CustomInput = styled(Input)({
  width: "100%",
});

export const CharacterInput = styled(Input)(({ theme }) => ({
  marginRight: "50px",
  backgroundColor: purple[100],
  height: "100%",
  fontSize: "20px",
  MuiInput: {
    padding: 0,
  },

  // backgroundColor: theme.palette.common.white,
}));

export const NewWordContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  height: "50px",
  width: "200px",
  backgroundColor: "gray",
});
