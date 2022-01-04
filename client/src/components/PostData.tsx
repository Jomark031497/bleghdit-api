import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Avatar, Box, Typography } from "@mui/material";
import { Post } from "../types";
import CLink from "./custom/CLink";
import Image from "next/image";

dayjs.extend(relativeTime);

interface Props {
  post: Post;
}

const PostData: React.FC<Props> = ({ post }) => {
  return (
    <>
      {post && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              {post.sub?.imageURN ? (
                <Box
                  sx={{
                    borderRadius: "50px",
                    overflow: "hidden",
                    position: "relative",
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                >
                  <Image src={post.sub.imageURN} layout="fill" objectFit="cover" />
                </Box>
              ) : (
                <Avatar
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  sx={{ width: "2.5rem", height: "2.5rem" }}
                />
              )}
            </Box>
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
