import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Post } from "../types";
import { NextPage } from "next";
import PostCard from "../components/PostCard";

const Home: NextPage = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts", { withCredentials: true });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>leddit: the frontpage of the internet.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container className={classes.container} maxWidth="md">
        <Typography variant="h5">Recent Posts</Typography>

        {posts.map((post) => (
          <PostCard post={post} key={post.identifier} />
        ))}
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
