import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { purple } from "@mui/material/colors";

export const NavigationButton = styled(NavLink)(({ theme })  => ({
  textDecoration: "none",
  padding: "7px 10px",
  margin: 0,
  overflow: "hidden",
  color: theme.palette.common.white,
  marginRight: "15px",
  borderRadius: "5px",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: purple[200],
  },
  
  
  //   "&:active": {
  //     backgroundColor: purple[500],
  //   },
}));
//  .attr(props => ({
//   size: '5rem', // or, size: props.size
// }))
