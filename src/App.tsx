import { ThemeProvider, Toolbar } from "@mui/material";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Filter from "./components/Filter";
import MainPage from "./components/MainPage";
import Search from "./components/Search";
import Navigation from "./components/Navigation";

import { theme } from "./theme";
import Review from "./components/Review";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Navigation />
          {/* <Toolbar /> */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
