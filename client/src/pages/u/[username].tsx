import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import dayjs from "dayjs";
import PostCard from "../../components/PostCard";
import CommentCard from "../../components/CommentCard";
import { CommentType, Post } from "../../types";

const UserPage: NextPage = () => {
  const router = useRouter();

  const [tab, setTab] = useState("posts");

  const { data: userSubmissions } = useSWR<any>(router.query.username ? `/posts/user/${router.query.username}` : null);
  console.log(userSubmissions);

  return (
    <Container maxWidth="lg" sx={{ background: "transparent", display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%", backgroundColor: "#fff", display: "flex" }}>
        <Button onClick={() => setTab("posts")}>Posts</Button>
        <Button onClick={() => setTab("comments")}>Comments</Button>
      </Box>

      <Box sx={{ display: "flex", marginTop: "1rem" }}>
        <Box sx={{ backgroundColor: "#fff", flex: 1, marginRight: "0.5rem" }}>
          <Box>
            {userSubmissions &&
              userSubmissions.submissions.map((submission: any) => {
                if (submission.type === "POST") {
                  const post: Post = submission;
                  return <PostCard post={post} key={post.identifier} />;
                } else {
                  const comment: CommentType = submission;
                  return <CommentCard comment={comment} post={comment.post} key={comment.identifier} />;
                }
              })}
          </Box>

          {/* {tab === "posts" && (
            <Box>
              {userSubmissions?.submissions.posts.map((post) => (
                <PostCard post={post} key={post.identifier} />
              ))}
            </Box>
          )}
          {tab === "comments" && (
            <Box>
              {userSubmissions?.comments.map((comment) => (
                <CommentCard comment={comment} post={comment.post} key={comment.identifier} />
              ))}
            </Box>
          )} */}
        </Box>

        <Box sx={{ backgroundColor: "#fff", flex: 0.4 }}>
          <Box>
            <Avatar src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" />
            <Typography>u/{userSubmissions?.user.username}</Typography>

            <Box>
              <Typography>Cake Day</Typography>
              <Typography>{dayjs(userSubmissions?.user.createdAt).format("MMM DD, YYYY")}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserPage;
