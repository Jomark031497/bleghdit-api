import { Box, Button, IconButton, Link as MuiLink, Typography } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CommentIcon from "@mui/icons-material/ModeCommentOutlined";
import SaveIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareIcon from "@mui/icons-material/ShareOutlined";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "../types";
dayjs.extend(relativeTime);

interface PostProps {
  post: Post;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const classes = useStyles();
  return (
    <Link href={`/r/${post.subName}/${post.identifier}/${post.slug}`}>
      <Box className={classes.root} key={post.identifier}>
        <Box className={classes.voteContainer}>
          <IconButton>
            <ArrowUpwardIcon />
          </IconButton>
          <Typography variant="body2">42.69K</Typography>
          <IconButton>
            <ArrowDownwardIcon />
          </IconButton>
        </Box>

        <Box className={classes.postContentContainer}>
          <Box className={classes.postData}>
            <Box className={classes.postDataSubreddit}>
              <Image src="/images/reddit_logo.png" width="20" height="20" />
              <Link href={`/r/${post.subName}`} passHref>
                <MuiLink variant="subtitle1" underline="hover" color="textPrimary" style={{ marginLeft: "0.3rem" }}>
                  r/{post.subName}
                </MuiLink>
              </Link>
            </Box>

            <Link href={`/u/${post.username}`} passHref>
              <MuiLink variant="subtitle2" underline="hover" color="textSecondary" style={{ margin: "0 0.3rem" }}>
                Posted by u/{post.username}
              </MuiLink>
            </Link>
            <Typography variant="subtitle2" color="textSecondary">
              {dayjs(post.createdAt).fromNow()}
            </Typography>
          </Box>

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
              69 Comments
            </Button>
            <Button className={classes.actionButtons} startIcon={<ShareIcon />} size="small">
              Share
            </Button>
            <Button className={classes.actionButtons} startIcon={<SaveIcon />} size="small">
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Link>
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
  voteContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 0.5,
    marginLeft: "0.2rem",
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
  postData: {
    display: "flex",
    alignItems: "center",
  },
  postDataSubreddit: {
    display: "flex",
    alignItems: "center",
  },
  postTitleAndBody: {
    margin: "0.5rem",
  },
  postBody: {
    margin: "0.5rem auto",
  },
}));

export default PostCard;
