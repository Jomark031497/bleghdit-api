import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post } from "../../../../types";
import ArticleIcon from "@mui/icons-material/Article";
import { makeStyles } from "@mui/styles";
import UpvoteDownVote from "../../../../components/UpvoteDownVote";
import PostData from "../../../../components/PostData";

const Post = () => {
  const classes = useStyles();
  const router = useRouter();
  const { identifier, slug } = router.query;

  const { data: post, error } = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null);
  if (error) router.push("/");

  return (
    <>
      <Head>
        <title>
          {post?.subName}: {post?.title}
        </title>
      </Head>

      <Container maxWidth="lg" className={classes.root}>
        <Box className={classes.postHeader}>
          <ArticleIcon style={{ marginRight: "0.5rem" }} />
          <Typography variant="subtitle1">{post?.title}</Typography>
        </Box>

        <Box className={classes.main}>
          <Box className={classes.postContent}>
            <Box className={classes.upvoteDownvoteContainer}>
              <UpvoteDownVote post={post} />
            </Box>
            <Box>
              <PostData post={post} />
              <Typography></Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

const useStyles = makeStyles((_) => ({
  root: {},
  postHeader: {
    display: "flex",
    backgroundColor: "#000",
    color: "#fff",
    padding: "1rem 2rem",
  },
  main: {
    background: "#fff",
  },
  postContent: {
    display: "flex",
  },
  voteContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 0.5,
    marginLeft: "0.2rem",
    alignItems: "center",
  },
  upvoteDownvoteContainer: {
    margin: "auto 0.5rem",
  },
  postDetails: {
    flex: 1,
    background: "lightgreen",
  },
}));

export default Post;
