import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Avatar, Box } from "@mui/material";
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
            <Avatar src={!subImage ? post.sub.imageUrl : subImage} sx={{ width: "2rem", height: "2rem" }} />
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

export default PostData;
