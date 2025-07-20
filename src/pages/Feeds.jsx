import { Box, useTheme } from "@mui/material";
import MySwiper from "../components/MySwiper";
import { useEffect, useState } from "react";
import tmdb from "../services/tmdb";
import MyCategories from "../components/MyCategories";

const Feeds = () => {
  const theme = useTheme();
  const [trending, setTrending] = useState();

  useEffect(() => {
    const fetchingTrendingMovies = async () => {
      try {
        const response = await tmdb("/trending/movie/week");
        setTrending(response.data.results);
      } catch (error) {
        console.error("Error while fetching trending movies: ", error);
      }
    };
    fetchingTrendingMovies();
  }, []);

  return (
    <Box>
      <Box
        sx={{ mt: 4, width: "100%", borderRadius: 2, overflow: "hidden" }}
        boxShadow={4}
      >
        <MySwiper trending={trending} />
      </Box>
      <MyCategories />
    </Box>
  );
};

export default Feeds;
