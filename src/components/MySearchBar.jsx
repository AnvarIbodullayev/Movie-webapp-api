import { InputAdornment, TextField } from "@mui/material";
import useSearchStore from "../store/searchStore";

// icons
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MySearchBar = () => {
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState("");
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (localQuery.trim()) {
        setSearchQuery(localQuery.trim());
        navigate("/search");
      }
    }
  };

  return (
    <TextField
      value={localQuery}
      onKeyDown={handleSearch}
      onChange={(e) => setLocalQuery(e.target.value)}
      sx={{
        width: { xs: "200px", sm: "300px" },
        ml: 4,
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
        },
        "& .MuiInputLabel-root": {
          fontSize: "14px",
        },
      }}
      size="small"
      label="search movies"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CiSearch />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default MySearchBar;
