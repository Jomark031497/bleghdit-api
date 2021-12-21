import useSWR from "swr";
import { NextPage } from "next";
import Head from "next/head";

import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Post } from "../types";
import PostCard from "../components/PostCard";
import FrontPageActions from "../components/FrontPageActions";
import FrontPageSideBar from "../components/FrontPageSideBar";

const Home: NextPage = () => {
  const classes = useStyles();

  const { data: posts } = useSWR("/posts");

  return (
    <>
      <Head>
        <title>leddit: the frontpage of the internet.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container className={classes.container} maxWidth="lg">
        <Box className={classes.main}>
          <FrontPageActions />
          {posts && posts.map((post: Post) => <PostCard post={post} key={post.identifier} />)}
        </Box>
        <Box className={classes.sidebar}>
          <FrontPageSideBar />
        </Box>
      </Container>
    </>
  );
};

const useStyles = makeStyles((_) => ({
  container: {
    marginTop: "3rem",
    paddingBottom: "1rem",
    display: "flex",
  },
  main: {
    flex: 1,
  },
  sidebar: {
    flex: 0.4,
  },
}));

export default Home;
