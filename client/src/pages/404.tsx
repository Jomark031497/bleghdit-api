import { NextPage } from "next";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CLink from "../components/CLink";

const NotFound: NextPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4">Page Not Found</Typography>
      <Box className={classes.back}>
        <CLink href="/" label="Go back to homepage" variant="h4" />
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "90vh",
    justifyContent: "center",
  },
  back: {
    backgroundColor: theme.palette.primary.main,
    padding: "0.5rem",
    borderRadius: "1rem",
    margin: "2rem auto",
  },
}));

export default NotFound;
