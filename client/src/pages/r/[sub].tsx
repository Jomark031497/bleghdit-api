import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import useSWR from "swr";
import PostCard from "../../components/PostCard";
import SubHeader from "../../components/SubHeader";
import { Post, Sub } from "../../types";

const Subleddit: NextPage = () => {
  const router = useRouter();
  const classes = useStyles();

  const { data: sub } = useSWR<Sub>(`/subs/${router.query.sub}`);

  return (
    <>
      <Head>
        <title>{sub?.title}</title>
      </Head>

      <SubHeader sub={sub} />
      <Container className={classes.container} maxWidth="md">
        {sub?.posts.map((post: Post) => (
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

export default Subleddit;
