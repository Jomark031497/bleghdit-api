import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Avatar, Box, Typography } from "@mui/material";
import { Post } from "../types";
import CLink from "./custom/CLink";

dayjs.extend(relativeTime);

interface Props {
  post: Post;
  subImage?: string | undefined;
}

const PostData: React.FC<Props> = ({ post, subImage }) => {
  return (
    <>
      {post && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={!subImage ? post.sub.imageURN : subImage} sx={{ width: "2rem", height: "2rem" }} />
            <CLink
              href={`/r/${post.subName}`}
              variant="subtitle2"
              label={`r/${post.subName}`}
              color="textPrimary"
              sx={{ ml: "0.3rem" }}
            />
          </Box>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mx: "0.2rem" }}>
            •
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Posted by
          </Typography>
          <CLink
            href={`/u/${post.username}`}
            variant="subtitle2"
            color="textSecondary"
            label={`u/${post.username}`}
            sx={{ mx: "0.3rem" }}
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

export default PostData;
