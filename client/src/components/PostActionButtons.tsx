import { Box, Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CommentIcon from "@mui/icons-material/ModeCommentOutlined";
import SaveIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareIcon from "@mui/icons-material/ShareOutlined";
import { Post } from "../types";

interface Props {
  post: Post;
}

const PostActionButtons: React.FC<Props> = ({ post }) => {
  const classes = useStyles();

  return (
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
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  actionButtonsContainer: {
    display: "flex",
  },
  actionButtons: {
    margin: "auto 0.3rem",
    color: theme.palette.text.secondary,
  },
}));

export default PostActionButtons;
