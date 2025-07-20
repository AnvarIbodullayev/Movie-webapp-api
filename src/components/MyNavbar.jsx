import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import userImage from "../assets/Anvar.jpg";

// IconsManifest
import { LiaHandPointLeft } from "react-icons/lia";
import { LiaHandPointRight } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import MySearchBar from "./MySearchBar";

const MyNavbar = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-end", sm: "center" },
        flexWrap: { xs: "wrap", sm: "nowrap" },
        gap: 2,
        flexDirection: { xs: "column-reverse", sm: "row" },
      }}
    >
      <Box>
        <IconButton onClick={() => navigate(-1)}>
          <LiaHandPointLeft />
        </IconButton>
        <IconButton onClick={() => navigate(1)}>
          <LiaHandPointRight />
        </IconButton>
        <MySearchBar />
      </Box>
      <Avatar alt="User name" src={userImage} />
    </Box>
  );
};

export default MyNavbar;
