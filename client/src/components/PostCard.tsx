import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Box, Button, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/ModeCommentOutlined";
import SaveIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareIcon from "@mui/icons-material/ShareOutlined";
import { makeStyles } from "@mui/styles";

import { Post } from "../types";
import UpvoteDownVote from "./UpvoteDownVote";
import PostData from "./PostData";

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

            <Box className={classes.actionButtonsContainer}>
              <Button className={classes.actionButtons} startIcon={<CommentIcon />} size="small">
                {post.commentCount} Comments
              </Button>
              <Button className={classes.actionButtons} startIcon={<ShareIcon />} size="small">
                Share
              </Button>
              <Button className={classes.actionButtons} startIcon={<SaveIcon />} size="small">
                Save
              </Button>
            </Box>
          </div>
        </Link>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: any) => ({
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
  actionButtonsContainer: {
    display: "flex",
  },
  actionButtons: {
    margin: "auto 0.3rem",
    color: theme.palette.text.secondary,
  },
  postTitleAndBody: {
    margin: "0.5rem",
  },
  postBody: {
    margin: "0.5rem auto",
  },
}));

export default PostCard;
