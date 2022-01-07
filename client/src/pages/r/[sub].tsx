import { Box, Container } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import useSWR from "swr";
import PostCard from "../../components/PostCard";
import SubHeader from "../../components/SubHeader";
import SubSideBar from "../../components/SubSideBar";
import { Post, Sub } from "../../types";

const Subleddit: NextPage = () => {
  const router = useRouter();

  const { data: sub } = useSWR<Sub>(router.query.sub ? `/subs/${router.query.sub}` : null);

  return (
    <>
      <Head>
        <title>
          {sub?.title}: {sub?.description}
        </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {sub && (
        <>
          <SubHeader sub={sub} />
          <Container
            id="main-container"
            maxWidth="lg"
            sx={{ background: "transparent", pb: "1rem", display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <Box id="main-content" sx={{ flex: 1, order: { xs: 2, md: 1 }, my: "1rem" }}>
              {sub.posts.map((post: Post) => (
                <PostCard post={post} key={post.identifier} />
              ))}
            </Box>

            <Box id="sidebar" sx={{ flex: 0.4, ml: { xs: 0, md: "1rem" }, order: { xs: 1, md: 2 }, my: "1rem" }}>
              <SubSideBar sub={sub} />
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Subleddit;
