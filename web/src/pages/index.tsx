import { Container, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

import { Post } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostCard from "../components/PostCard";

dayjs.extend(relativeTime);

export default function Home() {
  const classes = useStyles();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={classes.root}>
      <Head>
        <title>Leddit: The backpage of the internet</title>
      </Head>

      <Container maxWidth="sm" className={classes.mainContainer}>
        <Typography variant="subtitle1">Popular Posts</Typography>

        {posts.map((post) => (
          <PostCard post={post} key={post.identifier} />
        ))}
      </Container>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#dae0e6",
  },
  mainContainer: {
    minHeight: "92vh",
    padding: "2rem",
  },
}));
