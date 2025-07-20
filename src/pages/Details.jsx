import {
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tmdb from "../services/tmdb";

// icons
import { FaImdb } from "react-icons/fa6";
import { HiMiniLanguage } from "react-icons/hi2";
import MyMovieCard from "../components/MyMovieCard";

const Details = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchMovieByID = async () => {
      try {
        const resMovie = await tmdb.get(`/movie/${id}`);
        const resTrailer = await tmdb.get(`/movie/${id}/videos`);
        const resSimilar = await tmdb.get(`/movie/${id}/similar`);

        const youtubeTrailers = resTrailer.data.results.filter(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        console.log("resSimilar: ", resSimilar.data.results);

        setMovie(resMovie.data);
        setTrailer(youtubeTrailers);
        setSimilar(resSimilar.data.results);
      } catch (err) {
        console.error("Error while fetching movie by id: ", err);
      }
    };
    fetchMovieByID();
  }, [id]);

  if (!movie) return <LinearProgress color="success" />;

  console.log(movie);

  return (
    <Box>
      <Grid container>
        {/* left */}
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }} sx={{ p: 2 }}>
          <Box
            sx={{
              width: "100%",
              height: "55vh",
              border: 0,
              boxShadow: "-10px 10px 0px -4px #b6f500",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}${
                movie.poster_path
              })`,
              transition: "ease 0.2s",
              "&:hover": {
                boxShadow: "none"
              }
            }}
          ></Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 8, lg: 8 }}
          sx={{ border: 0, p: 2, display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="body" sx={{ opacity: 0.8 }}>
            {movie.tagline}
          </Typography>

          <Box sx={{ my: 4 }}>
            <Typography
              variant="body"
              sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}
            >
              Genres:{" "}
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  size="small"
                  sx={{
                    opacity: 0.5,
                    fontSize: "0.7rem",
                    borderRadius: 2,
                    background: "#00000044",
                    border: "1px solid #b6f5001f",
                  }}
                  label={genre.name}
                />
              ))}
            </Typography>
            {/* Release date */}
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography variant="body" sx={{ display: "flex" }}>
                Release date:{" "}
                <Typography
                  sx={{
                    ml: 1,
                    textDecoration: "underline",
                    textDecorationColor: theme.palette.primary.main,
                  }}
                >
                  {movie.release_date}
                </Typography>
              </Typography>
              <Typography variant="body" sx={{ display: "flex" }}>
                Popularity:{" "}
                <Typography
                  sx={{
                    ml: 1,
                    textDecoration: "underline",
                    textDecorationColor: theme.palette.primary.main,
                  }}
                >
                  {movie.popularity}
                </Typography>
              </Typography>
            </Box>

            {/* votes & languages */}
            <Box sx={{ my: 2, display: "flex", gap: 4 }}>
              <Typography
                variant="body"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FaImdb style={{ marginRight: 8 }} />
                {movie.vote_average !== undefined
                  ? movie.vote_average.toFixed(1)
                  : "N/A"}
              </Typography>
              <Typography
                variant="body"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <HiMiniLanguage style={{ marginRight: 8 }} />
                {movie.original_language}
              </Typography>
            </Box>
            {/* Homepage */}
            <Typography variant="body">
              Homepage:{" "}
              <a
                style={{
                  textDecoration: "underline",
                  textDecorationColor: theme.palette.primary.main,
                }}
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {movie.homepage}
              </a>
            </Typography>
          </Box>

          <Typography variant="body" sx={{ opacity: 0.8 }}>
            {movie.overview}
          </Typography>
          {/* runtime */}
          <Typography sx={{ mt: 4 }} variant="body">
            Runtime: {movie.runtime} minutes
          </Typography>

          {/* watch trailer button */}
          <Button
            href={`https://www.youtube.com/watch?v=${trailer[0]?.key}`}
            sx={{
              mt: 4,
              width: "170px",
            }}
            variant="contained"
            color="primary"
          >
            <Typography color="#000">Watch trailer</Typography>
          </Button>
        </Grid>
      </Grid>
      {/* Trailers */}
      <Typography variant="h4" sx={{ my: 2 }}>
        Trailers
      </Typography>
      <Grid container spacing={2}>
        {trailer.map((video) => (
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }} key={video.id}>
            <Box
              sx={{
                position: "relative",
                paddingTop: "56.25%", // 16:9 ratio
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 0 10px #00000033",
              }}
            >
              <iframe
                title={video.name}
                src={`https://www.youtube.com/embed/${video.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* Similar movies */}
      <Typography variant="h4" sx={{ my: 4 }}>
        Similar movies
      </Typography>
      <Grid container spacing={2}>
        {similar.map((similar) => (
          <Grid key={similar.id} size={{ xs: 12, sm: 3, md: 2, lg: 2 }}>
            <MyMovieCard
              onClick={() => navigate(`/movie/${similar.id}`)}
              movie={similar}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Details;
