import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Avatar, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Post } from "../types";
import CLink from "./CLink";

dayjs.extend(relativeTime);

interface Props {
  post: Post;
  subImage: string | undefined;
}

const PostData: React.FC<Props> = ({ post, subImage }) => {
  const classes = useStyles();
  console.log(post);
  return (
    <>
      {post && (
        <Box className={classes.root}>
          <Box className={classes.postMetadata}>
            <Avatar src={!subImage ? post.sub.imageUrl : subImage} className={classes.avatar} />
            <CLink href={`/r/${post.subName}`} variant="subtitle1" label={`r/${post.subName}`} color="textSecondary" />
          </Box>

          <CLink
            href={`/u/${post.username}`}
            variant="subtitle2"
            color="textSecondary"
            label={`Posted by u/${post.username}`}
          />

          <CLink
            href={`/u/${post.username}`}
            variant="subtitle2"
            color="textSecondary"
            label={dayjs(post.createdAt).fromNow()}
          />
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
  avatar: {
    width: "2rem",
    height: "2rem",
  },
}));

export default PostData;
