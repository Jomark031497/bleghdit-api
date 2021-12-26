import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Box, Typography } from "@mui/material";

import { Post } from "../types";
import UpvoteDownVote from "./UpvoteDownVote";
import PostData from "./PostData";
import PostActionButtons from "./PostActionButtons";

dayjs.extend(relativeTime);

interface PostProps {
  post: Post;
  subImage?: string;
}

const PostCard: React.FC<PostProps> = ({ post, subImage }) => {
  console.log(post);
  return (
    <Box
      sx={{
        display: "flex",
        my: "0.5rem",
        background: "white",
        border: "0.3px solid transparent",
        borderRadius: "0.5rem",
        "&:hover": {
          border: "0.3px solid black",
          transition: "0.1s ease-in",
          cursor: "pointer",
        },
      }}
    >
      <UpvoteDownVote post={post} />

      <Box sx={{ display: "flex", flexDirection: "column", flex: 8.5, m: "0.3rem 0.5rem" }}>
        <Link href={`/r/${post.subName}/${post.identifier}/${post.slug}`} passHref>
          <div>
            <PostData post={post} subImage={subImage} />

            <Box sx={{ m: "0.5rem" }}>
              <Typography variant="h5">{post.title}</Typography>

              {post.body && (
                <Typography variant="body1" sx={{ my: "0.5rem" }}>
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

export default PostCard;
