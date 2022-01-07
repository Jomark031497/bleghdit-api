import { Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CommentType, Post } from "../types";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/router";
import { mutate as normalMutate } from "swr";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface Props {
  post: Post;
  comment?: CommentType;
  mutate?: any;
}

const UpvoteDownVote: React.FC<Props> = ({ post, comment, mutate }) => {
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.login);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const vote = async (value: number) => {
    if (!data) {
      setOpenSnackbar(true);
      return;
    }
    if ((!comment && value === post.userVote) || (comment && comment.userVote === value)) value = 0;
    // set the value to 0 if the user voted the same vote
    if (value === post.userVote) value = 0;
    try {
      await axios.post(
        "/vote",
        { identifier: post?.identifier, commentIdentifier: comment?.identifier, slug: post?.slug, value },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
    if (!comment) {
      if (router.pathname === "/" || router.pathname.includes("/u/")) mutate();
      else normalMutate(`/posts/${post.identifier}/${post.slug}`);
    } else normalMutate(`/posts/${post.identifier}/${post.slug}/comments`);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message="You must be logged in"
        action={
          <>
            <Button color="secondary" size="small" onClick={() => router.push("/login")}>
              Log In
            </Button>
            <IconButton size="small" color="inherit">
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      />
    </>
  );
};

export default UpvoteDownVote;
