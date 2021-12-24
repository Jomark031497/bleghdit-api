import useSWR from "swr";
import { NextPage } from "next";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { Post } from "../types";
import PostCard from "../components/PostCard";
import FrontPageActions from "../components/FrontPageActions";
import FrontPageSideBar from "../components/FrontPageSideBar";

const Home: NextPage = () => {
  const { data: posts } = useSWR("/posts");

  return (
    <>
      <Head>
        <title>leddit: the frontpage of the internet.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container maxWidth="lg" sx={{ py: "3rem", display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <FrontPageActions />
          {posts && posts.map((post: Post) => <PostCard post={post} key={post.identifier} />)}
        </Box>
        <Box sx={{ flex: 0.4 }}>
          <FrontPageSideBar />
        </Box>
      </Container>
    </>
  );
};

export default Home;
