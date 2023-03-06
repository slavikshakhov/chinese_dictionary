import React, { useCallback } from "react";
import { AppBar, Container, Box, Toolbar, Menu, Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigate,
  Link,
} from "react-router-dom";
import { NavigationButton } from "./styles";
import { EntryDB, DbData } from "../types";

const Navigation = () => {
  // let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    {
      path: "/",
      name: "main",
    },
    {
      path: "/search",
      name: "search",
    },
    {
      path: "/filter",
      name: "filter",
    },
    {
      path: "/review",
      name: "review",
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
           */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ path, name }) => (
              <NavigationButton
                key={name}
                // component={NavLink}
                to={`${path}`}
                // sx={{ backgroundColor: "red" }}
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? purple[600] : purple[300],
                  };
                }}
              >
                {/* <NavLink to={`/${page}`}>{page}</NavLink> */}
                {name}
              </NavigationButton>

              // <Button
              //   key={page}
              //   onClick={() => handleLink(page)}
              //   sx={{ my: 2, color: "white", display: "block" }}
              // >
              //   {page}
              // </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
