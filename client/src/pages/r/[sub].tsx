import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NextPage } from "next";
import { useRouter } from "next/router";

import useSWR from "swr";
import PostCard from "../../components/PostCard";
import { Post, Sub } from "../../types";

const Sub: NextPage = () => {
  const router = useRouter();
  const classes = useStyles();

  const { data: sub } = useSWR(`/subs/${router.query.sub}`);

  return (
    <Container className={classes.container} maxWidth="md">
      {sub?.posts.map((post: Post) => (
        <PostCard post={post} key={post.identifier} />
      ))}
    </Container>
  );
};

const useStyles = makeStyles((_) => ({
  container: {
    background: "transparent",
    marginTop: "3rem",
    paddingBottom: "1rem",
  },
}));

export default Sub;
