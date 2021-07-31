import { Box, makeStyles, Typography } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>Leddit: The backpage of the internet</title>
      </Head>

      <Box>
        <div>
          <Link href="/">
            <a>
              <Typography>leddit</Typography>
            </a>
          </Link>
        </div>
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
