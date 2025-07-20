import { Box, Typography, useTheme } from "@mui/material";
import { GoStarFill } from "react-icons/go";

// image
import imageNotFound from "../assets/image-not-found.png";

const MyMovieCard = ({ movie, onClick }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        width: "170px",
        height: "260px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        "&:hover .imageBox": {
          borderBottom: `4px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <Box
        className="imageBox"
        sx={{
          minWidth: "170px",
          height: "85%",
          borderRadius: 6,
          transition: "border-bottom 0.2s ease", 
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${
            movie.backdrop_path
              ? `${import.meta.env.VITE_IMAGE_BASE_URL}${movie.backdrop_path}`
              : imageNotFound
          })`,
          mb: 2,
        }}
      />
      <Box sx={{ ml: 1 }}>
        <Typography variant="body">{movie.title.slice(0, 20)}</Typography>
        <Typography variant="caption" sx={{ display: "flex" }}>
          {movie.release_date.substring(0, 4)}
          <Typography
            color="primary"
            variant="caption"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <GoStarFill style={{ marginLeft: 6 }} />
            {movie.vote_average.toFixed(1)}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default MyMovieCard;
