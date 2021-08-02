import {
  Box,
  IconButton,
  Typography,
  Avatar,
  Button,
  Link as MuiLink,
  makeStyles,
} from "@material-ui/core";
import dayjs from "dayjs";
import Link from "next/link";
import UpvoteIcon from "@material-ui/icons/ArrowUpward";
import DownvoteIcon from "@material-ui/icons/ArrowDownward";
import CommentsIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import SaveIcon from "@material-ui/icons/Bookmark";
import { Post } from "../types";
import axios from "axios";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const classes = useStyles();

  const vote = async (value: number) => {
    try {
      const res = await axios.post("/api/misc/vote", {
        identifier: post.identifier,
        slug: post.slug,
        value: value,
      });

      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box key={post.identifier} className={classes.postsContainer}>
      <Box className={classes.votes}>
        <IconButton size="small" onClick={() => vote(1)}>
          <UpvoteIcon />
        </IconButton>

        <Typography variant="subtitle1">{post.voteScore}</Typography>

        <IconButton size="small" onClick={() => vote(-1)}>
          <DownvoteIcon />
        </IconButton>
      </Box>
      <Box className={classes.postContent}>
        <Box className={classes.postMetadata}>
          <Box className={classes.subreddit}>
            <Avatar
              alt="subleddit icon"
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              className={classes.subredditIcon}
            />
            <span style={{ color: "#fff" }}>•</span>
            <Link href={`/r/${post.subName}`} passHref>
              <MuiLink
                variant="subtitle2"
                color="textPrimary"
                underline="hover"
                className={classes.subredditName}
              >
                r/{post.subName}
              </MuiLink>
            </Link>
          </Box>
          <span style={{ margin: "auto 0.3rem", color: "lightgray" }}>•</span>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            className={classes.links}
          >
            posted by
          </Typography>
          <Box className={classes.subredditUsername}>
            <Link href={`u/${post.username}`} passHref>
              <MuiLink
                variant="subtitle2"
                color="textSecondary"
                className={classes.links}
                noWrap
              >
                u/{post.username}
              </MuiLink>
            </Link>
          </Box>
          <Link href={`${post.url}`} passHref>
            <MuiLink
              variant="subtitle2"
              color="textSecondary"
              className={classes.links}
            >
              {dayjs(post.createdAt).fromNow()}
            </MuiLink>
          </Link>
        </Box>

        <Box className={classes.postMainContent}>
          <Link href={post.url} passHref>
            <div className={classes.postTitle}>
              <MuiLink variant="h5" color="textPrimary" underline="none">
                {post.title}
              </MuiLink>

              {post.body && (
                <Typography variant="body2" className={classes.postBody}>
                  {post.body}
                </Typography>
              )}
            </div>
          </Link>
        </Box>
        <Box className={classes.postActions}>
          <Link href={post.url} passHref>
            <Button startIcon={<CommentsIcon />}>
              {post.commentCount} Comments
            </Button>
          </Link>
          <Button startIcon={<ShareIcon />}>Share</Button>
          <Button startIcon={<SaveIcon />}>Save</Button>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  postsContainer: {
    display: "flex",
    borderRadius: "1rem",
    margin: "1rem",
    background: "#fff",

    border: "1px solid transparent",
    "&:hover": {
      border: "1px solid black",
      cursor: "pointer",
    },
  },
  votes: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: "0.5rem",
  },
  postContent: {
    padding: "0.3rem 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "0.3rem 0.5rem",
  },
  postMetadata: {
    display: "flex",
    alignItems: "center",
  },
  postMainContent: {},
  postBody: { margin: "0.5rem auto" },
  postActions: {},
  subredditIcon: {
    height: "1.5rem",
    width: "1.5rem",
  },
  subredditName: {
    fontWeight: "bold",
  },
  subreddit: {
    display: "flex",
    alignItems: "center",
  },
  subredditUsername: {
    color: theme.palette.text.secondary,
  },
  links: {
    marginRight: "0.3rem",
  },
  postTitle: {
    margin: "0.5rem auto",
  },
}));

export default PostCard;
