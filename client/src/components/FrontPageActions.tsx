import { Avatar, Box, Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PhotoIcon from "@mui/icons-material/Photo";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import BestIcon from "@mui/icons-material/RocketLaunch";
import TopIcon from "@mui/icons-material/BarChart";
import HotIcon from "@mui/icons-material/LocalFireDepartment";
import NewIcon from "@mui/icons-material/NewReleases";

import CTextField from "./CTextField";

const FrontPageActions: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.createPostContainer}>
        <Avatar className={classes.userAvatar}>H</Avatar>
        <CTextField placeholder="Create Post" className={classes.textField} />
        <Box className={classes.createPostButtons}>
          <PhotoIcon className={classes.icons} />
          <InsertLinkIcon className={classes.icons} />
        </Box>
      </Box>

      <Box className={classes.sortPostContainer}>
        <Button startIcon={<HotIcon />} className={classes.buttons}>
          Hot
        </Button>
        <Button startIcon={<BestIcon />} className={classes.buttons}>
          Best
        </Button>
        <Button startIcon={<TopIcon />} className={classes.buttons}>
          Top
        </Button>
        <Button startIcon={<NewIcon />} className={classes.buttons}>
          New
        </Button>
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  createPostContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    margin: "1rem auto",
  },
  textField: {
    flex: "1",
  },
  createPostButtons: {
    display: "flex",
    margin: "auto 0.5rem",
    color: theme.palette.text.secondary,
  },
  userAvatar: {
    margin: "auto 0.5rem",
  },
  icons: {
    fontSize: "2rem",
    margin: "auto 0.2rem",
  },
  sortPostContainer: {
    backgroundColor: "white",
    margin: "1rem auto",
    padding: "0.5rem",
  },
  buttons: {
    borderRadius: "1rem",
    backgroundColor: "#eee",
    margin: "auto 0.5rem",
    padding: "0.5rem 1rem",
    "&:hover": {
      backgroundColor: "#ddd",
    },
  },
}));

export default FrontPageActions;
