import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Head from "next/head";
import { Post } from "../types";
import { NextPage } from "next";
import PostCard from "../components/PostCard";

import useSWR from "swr";
import FrontPageActions from "../components/FrontPageActions";

const Home: NextPage = () => {
  const classes = useStyles();

  const { data: posts } = useSWR("/posts");

  return (
    <>
      <Head>
        <title>leddit: the frontpage of the internet.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container className={classes.container} maxWidth="md">
        <FrontPageActions />
        {posts && posts.map((post: Post) => <PostCard post={post} key={post.identifier} />)}
      </Container>
    </>
  );
};

const useStyles = makeStyles((_) => ({
  container: {
    background: "transparent",
    marginTop: "3rem",
    paddingBottom: "1rem",
  },
}));

export default Home;
