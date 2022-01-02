import { NextPage } from "next";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { Post } from "../types";
import PostCard from "../components/PostCard";
import FrontPageSideBar from "../components/FrontPageSideBar";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

const Home: NextPage = () => {
  const [observedPost, setObservedPost] = useState("");
  const {
    data,
    isValidating,
    mutate,
    size: page,
    setSize: setPage,
    error,
  } = useSWRInfinite((index) => `/posts?page=${index}`);

  const posts: Post[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;

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
        if (entries[0].isIntersecting === true) {
          console.log("reached bottom of posts");
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

      <Container maxWidth="lg" sx={{ py: "3rem", display: "flex" }}>
        <Box sx={{ flex: 1, mt: "0.5rem" }}>
          {isLoadingInitialData && posts.length > 0 && <Box>loading...</Box>}

          {posts && posts.map((post: Post) => <PostCard post={post} mutate={mutate} key={post.identifier} />)}
          {isValidating && posts.length > 0 && <Box>loading...</Box>}
        </Box>
        <Box sx={{ flex: 0.4 }}>
          <FrontPageSideBar />
        </Box>
      </Container>
    </>
  );
};

export default Home;
