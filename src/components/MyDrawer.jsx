import { Box, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

// icons
import { FcHome } from "react-icons/fc";
import { MdOutlineDateRange } from "react-icons/md";

const listDrawer = [
  {
    title: "Home",
    url: "/",
    icon: FcHome,
  },
  {
    title: "Coming Soon",
    url: "/coming-soon",
    icon: MdOutlineDateRange,
  },
];

const MyDrawer = () => {
  const theme = useTheme();

  return (
    <>
      <Typography sx={{ display: { xs: "none", sm: "block" } }}>
        Movie app
      </Typography>
      <Box sx={{ mt: 6 }}>
        <Typography
          sx={{ display: { xs: "none", sm: "block" } }}
          color="grey"
          variant="caption"
        >
          Routing
        </Typography>
        {/* list */}
        <Box sx={{ mt: 2 }}>
          {listDrawer.map((item, idx) => (
            <NavLink
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                padding: "0.4rem 0.6rem",
                cursor: "pointer",
                borderRadius: "8px",
                fontWeight: isActive ? 600 : 400,
                backgroundColor: isActive
                  ? theme.palette.action.hover
                  : "transparent",
                color: isActive ? theme.palette.primary.main : "inherit",
                boxShadow: isActive
                  ? `0 0 0 2px ${theme.palette.primary.light}`
                  : "none",
                border: isActive
                  ? `1px solid ${theme.palette.primary.main}`
                  : "1px solid transparent",
                transform: isActive ? "scale(1.03)" : "scale(1)",
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                  backgroundColor: theme.palette.action.selected,
                  transform: "scale(1.04)",
                },
              })}
              key={idx}
              to={item.url}
            >
              <Box
                sx={{
                  fontSize: {
                    xs: "25px",
                    sm: "20px",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                <item.icon />
              </Box>
              <Typography
                sx={{ ml: 2, display: { xs: "none", sm: "block" } }}
                variant="body2"
              >
                {item.title}
              </Typography>
            </NavLink>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default MyDrawer;
