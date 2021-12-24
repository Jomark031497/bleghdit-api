import { Box, Container, Typography, TextField, Button } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Post, CommentType } from "../../../../types";
import ArticleIcon from "@mui/icons-material/Article";
import UpvoteDownVote from "../../../../components/UpvoteDownVote";
import PostData from "../../../../components/PostData";
import SubSideBar from "../../../../components/SubSideBar";
import PostActionButtons from "../../../../components/PostActionButtons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import CommentCard from "../../../../components/CommentCard";
dayjs.extend(relativeTime);

const Post: NextPage = () => {
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
        <Box sx={{ backgroundColor: "#2e2f2f", minHeight: "95vh" }}>
          <Container maxWidth="lg" sx={{ backgroundColor: "#edeff1", minHeight: "95vh", py: 0 }}>
            <Box sx={{ display: "flex", backgroundColor: "#000", color: "#fff", p: "1rem 2rem", width: "100%" }}>
              <ArticleIcon sx={{ mr: "0.5rem" }} />
              <Typography variant="subtitle1">{post.title}</Typography>
            </Box>

            <Box sx={{ backgroundColor: "transparent", display: "flex" }}>
              <Box sx={{ flex: 1, m: "1rem 0rem 1rem 1rem" }}>
                <Box sx={{ background: "white", display: "flex" }}>
                  <Box>
                    <UpvoteDownVote post={post} />
                  </Box>

                  <Box sx={{ flex: 1, pt: "0.5rem" }}>
                    <PostData post={post} />
                    <Typography variant="h5">{post.title}</Typography>
                    {post.body && (
                      <Typography variant="body1" sx={{ margin: "0.5rem auto" }}>
                        {post.body}
                      </Typography>
                    )}
                    <PostActionButtons post={post} />
                  </Box>
                </Box>

                <Box sx={{ background: "white", marginTop: "1rem", padding: "1rem" }}>
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
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                  <Box>{comments && comments.map((comment) => <CommentCard post={post} comment={comment} />)}</Box>
                </Box>
              </Box>

              <Box sx={{ flex: 0.4 }}>
                <SubSideBar sub={post.sub} />
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Post;
