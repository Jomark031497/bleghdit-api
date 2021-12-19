import { Box, Link as MuiLink, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
  post: Post | undefined;
}

const PostData: React.FC<Props> = ({ post }) => {
  const classes = useStyles();
  return (
    <>
      {post && (
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
      )}
    </>
  );
};

const useStyles = makeStyles((_) => ({
  root: {},
  postData: {
    display: "flex",
    alignItems: "center",
  },
  postDataSubreddit: {
    display: "flex",
    alignItems: "center",
  },
}));

export default PostData;
