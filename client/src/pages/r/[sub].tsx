import { Box, Container } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import useSWR from "swr";
import FrontPageActions from "../../components/FrontPageActions";
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
      </Head>
      {sub && (
        <>
          <SubHeader sub={sub} />
          <Container maxWidth="lg" sx={{ background: "transparent", pb: "1rem", display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              <FrontPageActions />
              {sub.posts.map((post: Post) => (
                <PostCard post={post} subImage={sub.imageUrl} key={post.identifier} />
              ))}
            </Box>

            <Box sx={{ flex: 0.4 }}>
              <SubSideBar sub={sub} />
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Subleddit;
