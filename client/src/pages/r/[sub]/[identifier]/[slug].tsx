import { Box, Container, Typography, TextField, Button } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Post, CommentType } from "../../../../types";
import ArticleIcon from "@mui/icons-material/Article";
import { makeStyles } from "@mui/styles";
import UpvoteDownVote from "../../../../components/UpvoteDownVote";
import PostData from "../../../../components/PostData";
import SubSideBar from "../../../../components/SubSideBar";
import PostActionButtons from "../../../../components/PostActionButtons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import CLink from "../../../../components/CLink";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
dayjs.extend(relativeTime);

const Post = () => {
  const classes = useStyles();
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.login);
  const { identifier, slug } = router.query;

  const [newComment, setNewComment] = useState("");

  const { data: post, error } = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null);
  const { data: comments } = useSWR<CommentType[]>(identifier && slug ? `/posts/${identifier}/${slug}/comments` : null);
  if (error) router.push("/");

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      await axios.post(
        `/posts/${post?.identifier}/${post?.slug}/comments`,
        { body: newComment.trim() },
        { withCredentials: true }
      );

      setNewComment("");
      mutate(`/posts/${identifier}/${slug}/comments`);
    } catch (error) {
      console.error(error);
    }
  };

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
                    <form onSubmit={addComment}>
                      {data && <Typography>Comment as {data.username}</Typography>}
                      <TextField
                        placeholder="What are your thoughts?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        minRows={4}
                        multiline
                        fullWidth
                      />
                      <Button type="submit" variant="contained">
                        Comment
                      </Button>
                    </form>
                  ) : (
                    <Box className={classes.unauthenticated}>
                      <Typography variant="h6" color="textSecondary">
                        Login or sign up to leave a comment
                      </Typography>

                      <Box>
                        <Button
                          variant="outlined"
                          onClick={() => router.push("/login")}
                          style={{ margin: "auto 0.5rem" }}
                        >
                          LOG IN
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => router.push("/register")}
                          style={{ margin: "auto 0.5rem" }}
                        >
                          SIGN UP
                        </Button>
                      </Box>
                    </Box>
                  )}
                  <hr />
                  <Box>
                    {comments &&
                      comments.map((comment) => (
                        <Box key={comment.identifier} className={classes.comment}>
                          <Box>
                            <UpvoteDownVote post={post} comment={comment} />
                          </Box>
                          <Box className={classes.commentData}>
                            <Box className={classes.commentMetadata}>
                              <Image src="/images/reddit_logo.png" width="20" height="20" />
                              <CLink
                                label={comment.username}
                                href={`u/${comment.username}`}
                                variant="subtitle1"
                                color="textPrimary"
                              />
                              <CLink
                                label={`· ${dayjs(comment.createdAt).fromNow()}`}
                                href={`u/${comment.username}`}
                                variant="subtitle2"
                                color="textSecondary"
                              />
                            </Box>
                            <Box>
                              <Typography variant="body1">{comment.body}</Typography>
                            </Box>
                          </Box>
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
    paddingTop: "0.5rem",
  },
  postBody: {
    margin: "0.5rem auto",
  },
  commentsContainer: {
    background: "white",
    marginTop: "1rem",
    padding: "1rem",
  },
  comment: {
    margin: "1rem auto",
    display: "flex",
    background: "#eee",
    borderRadius: "0.5rem",
  },
  commentData: {
    padding: "0.5rem",
  },
  commentMetadata: {
    display: "flex",
    alignItems: "center",
  },
  unauthenticated: {
    display: "flex",
    justifyContent: "space-between",
  },
  textArea: {
    width: "100%",
    border: "1px solid lightgray",
    "&:focus": {
      outline: "none",
      border: "1px solid gray",
    },
  },
}));

export default Post;
