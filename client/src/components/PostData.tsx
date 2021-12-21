import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Box, Link as Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Post } from "../types";
import CLink from "./CLink";

dayjs.extend(relativeTime);

interface Props {
  post: Post;
}

const PostData: React.FC<Props> = ({ post }) => {
  const classes = useStyles();
  return (
    <>
      {post && (
        <Box className={classes.root}>
          <Box className={classes.postMetadata}>
            <Image src="/images/reddit_logo.png" width="20" height="20" />
            <CLink href={`/r/${post.subName}`} variant="subtitle1" label={`r/${post.subName}`} color="textSecondary" />
          </Box>

          <CLink
            href={`/u/${post.username}`}
            variant="subtitle2"
            color="textSecondary"
            label={`Posted by u/${post.username}`}
          />

          <Typography variant="subtitle2" color="textSecondary">
            {dayjs(post.createdAt).fromNow()}
          </Typography>
        </Box>
      )}
    </>
  );
};

const useStyles = makeStyles((_) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  postMetadata: {
    display: "flex",
    alignItems: "center",
  },
}));

export default PostData;
