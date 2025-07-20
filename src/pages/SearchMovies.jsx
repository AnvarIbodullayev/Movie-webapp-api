import { Box, Typography } from "@mui/material";
import useSearchStore from "../store/searchStore";
import { useEffect, useState } from "react";
import tmdb from "../services/tmdb";
import MyMovieCard from "../components/MyMovieCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion.div;

const SearchMovies = () => {
  const navigate = useNavigate();
  const query = useSearchStore((state) => state.searchQuery);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  console.log(query);

  useEffect(() => {
    const fetchMovieBySearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const response = await tmdb.get(`/search/movie?query=${query}`);
        console.log("response: ", response.data.results);

        setResults(response.data.results);
      } catch (err) {
        setError(true);
        console.error("Error while fetching by searching movie: ", err);
      }
    };
    fetchMovieBySearch();
  }, [query]);

  return (
    <>
      {!error && results.length === 0 && query && (
        <Typography variant="h4">
          No movie named <Typography variant="h4" color="primary">"{query}"</Typography>{" "}
          found
        </Typography>
      )}
      <MotionBox
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-start",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {results.map((movie) => (
          <MotionCard
            key={movie.id}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <MyMovieCard
              movie={movie}
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
          </MotionCard>
        ))}
      </MotionBox>
    </>
  );
};

export default SearchMovies;
