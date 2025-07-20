import { Box, Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { genreMap } from "../utils/genreMap";
import MyMovieCard from "./MyMovieCard";
import { useEffect, useState } from "react";
import tmdb from "../services/tmdb";

const MyCategories = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("27");
  const genresArray = Object.entries(genreMap);

  useEffect(() => {
    if (!selectedGenre) return;
    const fetchMoviesByGenre = async () => {
      try {
        const response = await tmdb.get(`/discover/movie`, {
          params: {
            with_genres: selectedGenre,
          },
        });
        setMovies(response.data.results);
      } catch (err) {
        console.error("Error while genre fetch: ", err);
      }
    };
    fetchMoviesByGenre();
  }, [selectedGenre]);

  return (
    <>
      <Box
        sx={{
          mt: 4,
          width: "100%",
          overflowX: "scroll",
          display: "flex",
          gap: 2,
          py: 3,
        }}
      >
        {genresArray.map(([id, name]) => (
          <Chip
            onClick={() => setSelectedGenre(id)}
            color={selectedGenre === id ? "primary" : "default"}
            key={id}
            label={name}
            clickable
          />
        ))}
      </Box>
      <Box
        sx={{
          mt: 4,
          pb: 2,
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
          gap: 2,
          overflowX: "auto",
        }}
      >
        {movies.map((movie) => (
          <MyMovieCard
            onClick={() => navigate(`/movie/${movie.id}`)}
            key={movie.id}
            movie={movie}
          />
        ))}
      </Box>
    </>
  );
};

export default MyCategories;
