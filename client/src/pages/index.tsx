import { NextPage } from "next";
import Head from "next/head";
import { Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { Post } from "../types";
import PostCard from "../components/PostCard";
import FrontPageSideBar from "../components/FrontPageSideBar";

const Home: NextPage = () => {
  const [observedPost, setObservedPost] = useState("");
  const { data, mutate, size: page, setSize: setPage, error } = useSWRInfinite((index) => `/posts?page=${index}`);

  // for inifinite loading/scrolling; concatenate the data fetched from the useSWRInfinity
  const posts: Post[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error; // check if there's initial data

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const id = posts[posts.length - 1].identifier;
    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (element: HTMLElement | null) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  return (
    <>
      <Head>
        <title>leddit: the frontpage of the internet.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container id="main-page-container" maxWidth="lg" sx={{ display: "flex", my: "3rem" }}>
        <Box id="main-content" sx={{ flex: 1 }}>
          {isLoadingInitialData ? (
            <Typography variant="subtitle1">loading...</Typography>
          ) : (
            <> {posts && posts.map((post: Post) => <PostCard post={post} mutate={mutate} key={post.identifier} />)}</>
          )}
        </Box>
        <Box id="sidebar" sx={{ flex: 0.4, display: { xs: "none", md: "block" } }}>
          <FrontPageSideBar />
        </Box>
      </Container>
    </>
  );
};

export default Home;
