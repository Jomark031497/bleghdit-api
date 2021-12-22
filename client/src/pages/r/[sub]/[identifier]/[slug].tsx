import { Box, Container, Typography, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, CommentType } from "../../../../types";
import ArticleIcon from "@mui/icons-material/Article";
import { makeStyles } from "@mui/styles";
import UpvoteDownVote from "../../../../components/UpvoteDownVote";
import PostData from "../../../../components/PostData";
import SubSideBar from "../../../../components/SubSideBar";
import PostActionButtons from "../../../../components/PostActionButtons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { CommentOutlined } from "@mui/icons-material";

const Post = () => {
  const classes = useStyles();
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.login);
  const { identifier, slug } = router.query;
  const { data: post, error } = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null);
  const { data: comments } = useSWR<CommentType[]>(identifier && slug ? `/posts/${identifier}/${slug}/comments` : null);
  console.log(comments);
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
                    {post.body && (
                      <Typography variant="body1" className={classes.postBody}>
                        {post.body}
                      </Typography>
                    )}
                    <PostActionButtons post={post} />
                  </Box>
                </Box>

                <Box className={classes.commentsContainer}>
                  {data ? (
                    <Box>
                      {data && <Typography>Comment as {data.username}</Typography>}
                      <TextField multiline rows={4} placeholder="What are your thoughts?" fullWidth />
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="h6" color="textSecondary">
                        Login or sign up to leave a comment
                      </Typography>
                    </Box>
                  )}

                  <Box>
                    <Typography>Comment box</Typography>
                    {comments &&
                      comments.map((comment) => (
                        <Box key={comment.identifier} className={classes.comment}>
                          <UpvoteDownVote post={post} comment={comment} />
                          <Typography variant="subtitle1">{comment.username}</Typography>
                          <Typography variant="body1">{comment.body}</Typography>
                        </Box>
                      ))}
                  </Box>
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
    minHeight: "95vh",
  },
  container: {
    backgroundColor: "#edeff1",
    minHeight: "95vh",
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
  postBody: {
    margin: "0.5rem auto",
  },
  commentsContainer: {
    background: "white",
    marginTop: "1rem",
  },
  comment: {
    background: "grey",
    margin: "1rem auto",
    display: "flex",
  },
}));

export default Post;
