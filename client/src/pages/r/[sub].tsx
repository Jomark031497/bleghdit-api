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
        <title>{sub?.title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {sub && (
        <>
          <SubHeader sub={sub} />
          <Container maxWidth="lg" sx={{ background: "transparent", pb: "1rem", display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              {sub.posts.map((post: Post) => (
                <PostCard post={post} key={post.identifier} />
              ))}
            </Box>

            <Box sx={{ flex: 0.4, display: { xs: "none", md: "block" } }}>
              <SubSideBar sub={sub} />
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Subleddit;
