import { Box, IconButton, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CommentType, Post } from "../types";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/router";
import { mutate } from "swr";

interface Props {
  post: Post;
  comment?: CommentType;
}

const UpvoteDownVote: React.FC<Props> = ({ post, comment }) => {
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.login);

  const vote = async (value: number) => {
    if (!data) router.push("/login"); // if not logged in, redirect
    if ((!comment && value === post.userVote) || (comment && comment.userVote === value)) value = 0;

    try {
      await axios.post(
        "/vote",
        { identifier: post?.identifier, commentIdentifier: comment?.identifier, slug: post?.slug, value },
        { withCredentials: true }
      );
    } catch (err: any) {
      console.error(err);
    }

    if (!comment) {
      if (router.pathname === "/" || router.pathname.includes("/u/")) {
        mutate(`/posts`);
      } else mutate(`/posts/${post.identifier}/${post.slug}`);
    } else {
      mutate(`/posts/${post.identifier}/${post.slug}/comments`);
    }
  };

  return (
    <>
      {!comment ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 0.5,
            alignItems: "center",
            background: "#f7f9fa",
            borderRadius: "0.5rem",
          }}
        >
          <IconButton onClick={() => vote(1)} style={{ color: post?.userVote === 1 ? "red" : "" }}>
            <ArrowUpwardIcon
              sx={{
                ":hover": {
                  color: "red",
                },
              }}
            />
          </IconButton>
          <Typography variant="body2">{post?.voteScore}</Typography>
          <IconButton onClick={() => vote(-1)} sx={{ color: post?.userVote === -1 ? "blue" : "" }}>
            <ArrowDownwardIcon sx={{ ":hover": { color: "blue" } }} />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", flex: 0.5, ml: "0.2rem", alignItems: "center" }}>
          <IconButton onClick={() => vote(1)} sx={{ color: comment?.userVote === 1 ? "red" : "" }}>
            <ArrowUpwardIcon
              sx={{
                ":hover": {
                  color: "red",
                },
              }}
            />
          </IconButton>
          <Typography variant="body2">{comment?.voteScore}</Typography>
          <IconButton onClick={() => vote(-1)} sx={{ color: comment?.userVote === -1 ? "blue" : "" }}>
            <ArrowDownwardIcon sx={{ ":hover": { color: "blue" } }} />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default UpvoteDownVote;
