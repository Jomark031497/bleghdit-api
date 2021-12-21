import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post } from "../../../../types";
import ArticleIcon from "@mui/icons-material/Article";
import { makeStyles } from "@mui/styles";
import UpvoteDownVote from "../../../../components/UpvoteDownVote";
import PostData from "../../../../components/PostData";
import SubSideBar from "../../../../components/SubSideBar";
import PostActionButtons from "../../../../components/PostActionButtons";

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
      {post && (
        <Box className={classes.root}>
          <Container maxWidth="lg" className={classes.container}>
            <Box className={classes.postHeader}>
              <ArticleIcon style={{ marginRight: "0.5rem" }} />
              <Typography variant="subtitle1">{post.title}</Typography>
            </Box>

            <Box className={classes.mainContainer}>
              <Box className={classes.mainContent}>
                <Box className={classes.postContents}>
                  <Box>
                    <UpvoteDownVote post={post} />
                  </Box>

                  <Box className={classes.postData}>
                    <PostData post={post} />
                    <Typography variant="h5">{post.title}</Typography>
                    {post.body && <Typography variant="body1">{post.body}</Typography>}
                    <Typography>{post.body}</Typography>
                    <PostActionButtons post={post} />
                  </Box>
                </Box>

                <Box style={{ background: "white" }}>
                  <h3>POST COMMENTS!</h3>
                </Box>
              </Box>

              <Box className={classes.sidebarContainer}>
                <SubSideBar sub={post.sub} />
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

const useStyles = makeStyles((_) => ({
  root: {
    backgroundColor: "#2e2f2f",
  },
  container: {
    backgroundColor: "#edeff1",
    paddingLeft: 0,
    paddingRight: 0,
  },
  postHeader: {
    display: "flex",
    backgroundColor: "#000",
    color: "#fff",
    padding: "1rem 2rem",
    width: "100%",
  },
  mainContainer: {
    backgroundColor: "transparent",
    display: "flex",
  },
  mainContent: {
    flex: 1,
    margin: "1rem 0rem 1rem 1rem",
  },
  sidebarContainer: {
    flex: 0.4,
  },
  postContents: {
    background: "white",
    display: "flex",
  },
  postData: {
    flex: 1,
  },
}));

export default Post;
