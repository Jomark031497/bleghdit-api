import {
  Avatar,
  Box,
  Container,
  IconButton,
  makeStyles,
  Typography,
  Link as MuiLink,
  Button,
} from "@material-ui/core";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import UpvoteIcon from "@material-ui/icons/ArrowUpward";
import DownvoteIcon from "@material-ui/icons/ArrowDownward";
import { Post } from "../types";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentsIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import SaveIcon from "@material-ui/icons/Bookmark";

dayjs.extend(relativeTime);

export default function Home() {
  const classes = useStyles();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    console.log("effect ran");
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={classes.root}>
      <Head>
        <title>Leddit: The backpage of the internet</title>
      </Head>

      <Container maxWidth="sm" className={classes.mainContainer}>
        <Typography variant="subtitle1">Popular Posts</Typography>

        {posts.map((post) => (
          <Box key={post.identifier} className={classes.postsContainer}>
            <Box className={classes.votes}>
              <IconButton size="small">
                <UpvoteIcon />
              </IconButton>

              <Typography variant="subtitle1">16</Typography>

              <IconButton size="small">
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
                <span style={{ margin: "auto 0.3rem" }}>•</span>
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

              <Box className={classes.postBody}>
                <Link href={post.url} passHref>
                  <>
                    <MuiLink
                      variant="h5"
                      color="textPrimary"
                      underline="none"
                      className={classes.postTitle}
                    >
                      {post.title}
                    </MuiLink>

                    {post.body && (
                      <Typography variant="body2">{post.body}</Typography>
                    )}
                  </>
                </Link>
              </Box>
              <Box className={classes.postActions}>
                <Button startIcon={<CommentsIcon />}>Comments</Button>
                <Button startIcon={<ShareIcon />}>Share</Button>
                <Button startIcon={<SaveIcon />}>Save</Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#dae0e6",
  },
  mainContainer: {
    minHeight: "92vh",
    padding: "2rem",
  },
  postsContainer: {
    display: "flex",
    borderRadius: "1rem",
    margin: "1rem",
    background: "#fff",

    border: "1px solid transparent",
    "&:hover": {
      border: "1px solid black",
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
  postBody: {},
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
  postTitle: {},
}));
