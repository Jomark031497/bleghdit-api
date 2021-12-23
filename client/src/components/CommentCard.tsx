import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";

import { CommentType, Post } from "../types";
import CLink from "./CLink";
import UpvoteDownVote from "./UpvoteDownVote";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
  post: Post;
  comment: CommentType;
}

const CommentCard: React.FC<Props> = ({ post, comment }) => {
  const classes = useStyles();
  return (
    <Box key={comment.identifier} className={classes.comment}>
      <Box>
        <UpvoteDownVote post={post} comment={comment} />
      </Box>
      <Box className={classes.commentData}>
        <Box className={classes.commentMetadata}>
          <Image src="/images/reddit_logo.png" width="20" height="20" />
          <CLink label={comment.username} href={`u/${comment.username}`} variant="subtitle1" color="textPrimary" />
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
  );
};

const useStyles = makeStyles(() => ({
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
}));

export default CommentCard;
