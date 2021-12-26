import { Avatar, Box, Container, Divider, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import dayjs from "dayjs";
import PostCard from "../../components/PostCard";
import { CommentType, Post } from "../../types";
import CButton from "../../components/custom/CButton";
import CLink from "../../components/custom/CLink";

const UserPage: NextPage = () => {
  const router = useRouter();

  const [tab, setTab] = useState("overview");

  const { data: userSubmissions } = useSWR<any>(router.query.username ? `/posts/user/${router.query.username}` : null);

  return (
    <Container maxWidth="lg" sx={{ background: "transparent", display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%", backgroundColor: "#fff", display: "flex" }}>
        <CButton onClick={() => setTab("overview")}>Overview</CButton>
        <CButton onClick={() => setTab("posts")}>Posts</CButton>
        <CButton onClick={() => setTab("comments")}>Comments</CButton>
      </Box>
      <Box sx={{ display: "flex", marginTop: "1rem" }}>
        <Box sx={{ backgroundColor: "#eee", flex: 1, mr: "0.5rem", px: "1rem" }}>
          {tab === "overview" && (
            <Box>
              {userSubmissions &&
                userSubmissions.submissions.map((submission: any) => {
                  if (submission.type === "POST") {
                    const post: Post = submission;
                    return <PostCard post={post} key={post.identifier} />;
                  } else {
                    const comment: CommentType = submission;
                    return (
                      <Box sx={{ backgroundColor: "#fff", mb: "0.5rem" }} key={comment.identifier}>
                        <Box sx={{ display: "flex", alignItems: "center", pt: "0.5rem", pl: "0.5rem" }}>
                          <Box>
                            <Avatar src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CLink href={`/u/${comment.username}`} label={comment.username} variant="subtitle1" />
                            <Typography variant="subtitle2" color="textSecondary">
                              commented on
                            </Typography>
                            <CLink
                              href={`/r/${comment.post.subName}/${comment.post.identifier}/${comment.post.slug}`}
                              variant="subtitle1"
                              label={comment.post.title}
                              color="textPrimary"
                            />
                            <Typography variant="subtitle1" color="textSecondary">
                              •
                            </Typography>
                            <CLink
                              href={`/r/${comment.post.subName}`}
                              variant="subtitle1"
                              label={`r/${comment.post.subName}`}
                              color="textPrimary"
                            />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="subtitle1" color="textSecondary">
                              •
                            </Typography>
                            <CLink
                              label={`Posted by u/${comment.post.username}`}
                              href={`/u/${comment.post.username}`}
                              variant="subtitle2"
                              color="textSecondary"
                            />
                          </Box>
                        </Box>
                        <Divider sx={{ mt: "0.3rem" }} />
                        <Box>
                          <Typography sx={{ p: "1rem 2rem" }}>{comment.body}</Typography>
                        </Box>
                      </Box>
                    );
                  }
                })}
            </Box>
          )}
          {tab === "posts" && (
            <Box>
              {userSubmissions &&
                userSubmissions.submissions.map((submission: any) => {
                  if (submission.type === "POST") {
                    const post: Post = submission;
                    return <PostCard post={post} key={post.identifier} />;
                  } else return null;
                })}
            </Box>
          )}
          {tab === "comments" && (
            <Box>
              {userSubmissions &&
                userSubmissions.submissions.map((submission: any) => {
                  if (submission.type === "COMMENT") {
                    const comment: CommentType = submission;
                    return (
                      <Box sx={{ backgroundColor: "#fff", mb: "0.5rem" }} key={comment.identifier}>
                        <Box sx={{ display: "flex", alignItems: "center", pt: "0.5rem", pl: "0.5rem" }}>
                          <Box>
                            <Avatar src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CLink href={`/u/${comment.username}`} label={comment.username} variant="subtitle1" />
                            <Typography variant="subtitle2" color="textSecondary" noWrap>
                              commented on
                            </Typography>
                            <CLink
                              href={`/r/${comment.post.subName}/${comment.post.identifier}/${comment.post.slug}`}
                              variant="subtitle1"
                              label={comment.post.title}
                              color="textPrimary"
                            />
                            <Typography variant="subtitle1" color="textSecondary">
                              •
                            </Typography>
                            <CLink
                              href={`/r/${comment.post.subName}`}
                              variant="subtitle1"
                              label={`r/${comment.post.subName}`}
                              color="textPrimary"
                            />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="subtitle1" color="textSecondary">
                              •
                            </Typography>
                            <CLink
                              label={`Posted by u/${comment.post.username}`}
                              href={`/u/${comment.post.username}`}
                              variant="subtitle2"
                              color="textSecondary"
                            />
                          </Box>
                        </Box>
                        <Divider sx={{ mt: "0.3rem" }} />
                        <Box>
                          <Typography sx={{ p: "1rem 2rem" }}>{comment.body}</Typography>
                        </Box>
                      </Box>
                    );
                  } else return null;
                })}
            </Box>
          )}
        </Box>

        <Box sx={{ backgroundColor: "#fff", flex: 0.3, height: "40vh" }}>
          <Box sx={{ background: "#4386bd", height: "8vh" }} />
          <Box sx={{ display: "flex", alignItems: "center", padding: "1rem 0.5rem" }}>
            <Avatar src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" />

            <Typography>u/{userSubmissions?.user.username}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", p: "1rem" }}>
            <Typography>Cake Day</Typography>
            <Typography>{dayjs(userSubmissions?.user.createdAt).format("MMM DD, YYYY")}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserPage;
