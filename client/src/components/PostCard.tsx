import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Post } from "../types";
import UpvoteDownVote from "./UpvoteDownVote";
import PostData from "./PostData";
import PostActionButtons from "./PostActionButtons";

dayjs.extend(relativeTime);

interface PostProps {
  post: Post;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} key={post.identifier}>
      <UpvoteDownVote post={post} />

      <Box className={classes.postContentContainer}>
        <Link href={`/r/${post.subName}/${post.identifier}/${post.slug}`} passHref>
          <div>
            <PostData post={post} />

            <Box className={classes.postTitleAndBody}>
              <Typography variant="h5">{post.title}</Typography>
              {post.body && (
                <Typography variant="body1" className={classes.postBody}>
                  {post.body}
                </Typography>
              )}
            </Box>

            <PostActionButtons post={post} />
          </div>
        </Link>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: "0.5rem auto",
    background: "white",
    border: "0.3px solid transparent",
    "&:hover": {
      border: "0.3px solid black",
      transition: "0.1s ease-in",
      cursor: "pointer",
    },
  },
  postContentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 8.5,
    margin: "0.3rem 0.5rem",
  },
  postTitleAndBody: {
    margin: "0.5rem",
  },
  postBody: {
    margin: "0.5rem auto",
  },
}));

export default PostCard;
