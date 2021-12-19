import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
  const classes = useStyles();

  const { data: sub } = useSWR<Sub>(router.query.sub ? `/subs/${router.query.sub}` : null);

  return (
    <>
      <Head>
        <title>{sub?.title}</title>
      </Head>
      {sub && (
        <>
          <SubHeader sub={sub} />
          <Container className={classes.root} maxWidth="lg">
            <Box className={classes.main}>
              <FrontPageActions />
              {sub.posts.map((post: Post) => (
                <PostCard post={post} key={post.identifier} />
              ))}
            </Box>

            <Box className={classes.sidebar}>
              <SubSideBar sub={sub} />
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

const useStyles = makeStyles((_) => ({
  root: {
    background: "transparent",
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

export default Subleddit;
