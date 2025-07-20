import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { genreMap } from "../utils/genreMap";

// icons
import { FaImdb } from "react-icons/fa6";
import { HiMiniLanguage } from "react-icons/hi2";

// Import modules
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const MySwiper = ({ trending }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (trending && trending.length > 0) {
      setLoading(false);
    }
  }, [trending]);

  if (loading) {
    return <LinearProgress color="success" />;
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        // navigation
        // pagination={{ clickable: false }}
      >
        {/* Slide 1 */}
        {trending.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <Box
              sx={{
                backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}${
                  movie.backdrop_path
                })`,
                height: "400px",
                position: "relative",
                backgroundPosition: "center",
              }}
            >
              {/* black box cover for image */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background:
                    "linear-gradient(90deg,rgba(0, 0, 0, 0.9) 20%, rgba(255, 255, 255, 0) 100%)",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  p: 6,
                }}
              >
                {/* title */}
                <Box sx={{ display: "flex" }}>
                  {!isSmallScreen &&
                    movie.title.split(" ")[0].toLowerCase() !== "the" && (
                      <Typography variant="h4">The </Typography>
                    )}
                  <Typography
                    color="primary"
                    sx={{ fontWeight: 600, ml: 1 }}
                    variant={isSmallScreen ? "h6" : "h4"}
                  >
                    {movie.title}
                  </Typography>
                </Box>
                <Box sx={{ my: 4, display: "flex", gap: 4 }}>
                  <Typography
                    variant="body"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FaImdb style={{ marginRight: 8 }} />
                    {movie.vote_average.toFixed(1)}
                  </Typography>
                  <Typography
                    variant="body"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <HiMiniLanguage style={{ marginRight: 8 }} />
                    {movie.original_language}
                  </Typography>
                </Box>
                {/* genres */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  {movie.genre_ids.map((genreId) => (
                    <Chip
                      size="small"
                      sx={{
                        opacity: 0.5,
                        fontSize: "0.7rem",
                        borderRadius: 2,
                        background: "#00000044",
                        border: "1px solid #b6f5001f",
                      }}
                      key={genreId}
                      label={genreMap[genreId]}
                    />
                  ))}
                </Box>
                {/* watch trailer button */}
                <Button
                  sx={{ width: "180px", mt: 4 }}
                  variant="contained"
                  color="primary"
                >
                  Watch trailer
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MySwiper;
