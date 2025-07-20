import { Box, GlobalStyles } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Feeds from "./pages/Feeds";
import NotFound from "./pages/NotFound";
import Details from "./pages/Details";
import SearchMovies from "./pages/SearchMovies";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles
        styles={{
          /* For WebKit browsers */
          "*::-webkit-scrollbar": {
            height: "2px",
          },
          "*::-webkit-scrollbar-track": {
            background: "#b6f500",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#b6f500",
            borderRadius: "4px",
            border: "1px solid #f1f1f1",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#b6f500",
          },

          /* For Firefox */
          "*": {
            scrollbarColor: "#b8f5005d transparent",
            scrollbarWidth: "thin",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Feeds />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/search" element={<SearchMovies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
