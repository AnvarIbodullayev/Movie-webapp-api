import { Box, Grid, Typography } from "@mui/material";

// Icons
import MyNavbar from "../components/MyNavbar";
import MyDrawer from "../components/MyDrawer";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid
          size={{ xs: 1.5, sm: 1, md: 3, lg: 2 }}
          sx={{
            p: { xs: 0, sm: 3 },
            display: { xs: "flex", sm: "block" },
            justifyContent: "center",
            borderRight: "1px solid #80808042",
          }}
        >
          <Box>
            <MyDrawer />
          </Box>
        </Grid>
        <Grid size={{ xs: 10.5, sm: 11, md: 9, lg: 10 }} sx={{ p: 3 }}>
          {/* navbar */}
          <MyNavbar />
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
