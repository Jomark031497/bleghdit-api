import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Box, Card, Typography } from "@mui/material";

import { Post } from "../types";
import UpvoteDownVote from "./UpvoteDownVote";
import PostData from "./PostData";
import PostActionButtons from "./PostActionButtons";

dayjs.extend(relativeTime);

interface PostProps {
  post: Post;
  mutate?: Function;
}

const PostCard: React.FC<PostProps> = ({ post, mutate }) => {
  return (
    <>
      {post && (
        <Card
          sx={{
            display: "flex",
            mb: "0.7rem",
            background: "white",
            border: "0.1px solid transparent",
            borderRadius: "0.5rem",
            "&:hover": {
              border: "0.1px solid black",
              transition: "0.1s ease-in",
              cursor: "pointer",
            },
          }}
          id={post.identifier}
        >
          <UpvoteDownVote post={post} mutate={mutate} />

          <Box sx={{ display: "flex", flexDirection: "column", flex: 8.5, m: "0.3rem 0.5rem" }} id="main-card-content">
            <Link href={`/r/${post.subName}/${post.identifier}/${post.slug}`} passHref>
              <Box id="link-children-parent">
                <PostData post={post} />

                <Box sx={{ m: "0.5rem" }}>
                  <Typography variant="h6">{post.title}</Typography>

                  {post.body && (
                    <Typography variant="body2" sx={{ my: "0.5rem", whiteSpace: "pre-wrap" }}>
                      {post.body}
                    </Typography>
                  )}
                </Box>

                <PostActionButtons post={post} />
              </Box>
            </Link>
          </Box>
        </Card>
      )}
    </>
  );
};

export default PostCard;
