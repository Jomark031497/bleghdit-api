import { Box, makeStyles, Typography } from "@material-ui/core";
import Head from "next/head";

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>Leddit: The backpage of the internet</title>
      </Head>

      <Box>
        <Typography variant="h1">Wassup madlang popol</Typography>
      </Box>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#dae0e6",
    height: "100vh",
  },
}));
