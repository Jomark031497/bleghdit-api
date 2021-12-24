import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import CLink from "../components/CLink";

const NotFound: NextPage = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "90vh", justifyContent: "center" }}
    >
      <Typography variant="h4">Page Not Found</Typography>
      <Box
        sx={{
          backgroundColor: "primary.main",
          p: "0.5rem",
          borderRadius: "1rem",
          m: "2rem auto",
        }}
      >
        <CLink href="/" label="Go back to homepage" variant="h4" />
      </Box>
    </Box>
  );
};

export default NotFound;
