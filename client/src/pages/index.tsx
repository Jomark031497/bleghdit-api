import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";
import { Post } from "../types";
import { NextPage } from "next";
import PostCard from "../components/PostCard";

import { useAppDispatch } from "../redux/store";
import { setCurrentUser } from "../redux/features/auth/loginSlice";
import useSWR from "swr";

const Home: NextPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { data: posts } = useSWR("/posts");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/auth/me", { withCredentials: true });
        dispatch(setCurrentUser(data));
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <Head>
        <title>leddit: the frontpage of the internet.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container className={classes.container} maxWidth="md">
        <Typography variant="h5">Recent Posts</Typography>

        {posts?.map((post: Post) => (
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
