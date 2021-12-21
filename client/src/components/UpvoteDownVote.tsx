import { Box, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Post } from "../types";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/router";

interface Props {
  post: Post | undefined;
}

const UpvoteDownVote: React.FC<Props> = ({ post }) => {
  const classes = useStyles();
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.login);

  const vote = async (value: number) => {
    if (!data) router.push("/login"); // if not logged in, redirect

    if (value === post?.userVote) value = 0; // if vote is the same, reset the vote

    try {
      await axios.post("/vote", { identifier: post?.identifier, slug: post?.slug, value }, { withCredentials: true });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Box className={classes.voteContainer}>
      <IconButton onClick={() => vote(1)} style={{ color: post?.userVote === 1 ? "red" : "" }}>
        <ArrowUpwardIcon className={classes.upvoteIcon} />
      </IconButton>
      <Typography variant="body2">{post?.voteScore}</Typography>
      <IconButton onClick={() => vote(-1)} style={{ color: post?.userVote === -1 ? "blue" : "" }}>
        <ArrowDownwardIcon className={classes.downvoteIcon} />
      </IconButton>
    </Box>
  );
};

const useStyles = makeStyles((_) => ({
  voteContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 0.5,
    marginLeft: "0.2rem",
    alignItems: "center",
  },
  upvoteIcon: {
    "&:hover": {
      color: "red",
    },
  },
  downvoteIcon: {
    "&:hover": {
      color: "blue",
    },
  },
}));

export default UpvoteDownVote;
