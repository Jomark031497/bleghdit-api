import { Box, Typography } from "@mui/material";
import Image from "next/image";

import { CommentType, Post } from "../types";
import CLink from "./custom/CLink";
import UpvoteDownVote from "./UpvoteDownVote";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
  post: Post;
  comment: CommentType;
}

const CommentCard: React.FC<Props> = ({ post, comment }) => {
  return (
    <Box
      key={comment.identifier}
      sx={{ m: "1rem auto", display: "flex", background: "#f2f8fd", borderRadius: "0.5rem" }}
    >
      <Box>
        <UpvoteDownVote post={post} comment={comment} />
      </Box>
      <Box sx={{ p: "0.5rem" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
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

export default CommentCard;
