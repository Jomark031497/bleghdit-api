import { Box, Theme, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Sub } from "../types";
import CakeIcon from "@mui/icons-material/Cake";
import dayjs from "dayjs";

interface SubProp {
  sub: Sub;
}

const SubSideBar: React.FC<SubProp> = ({ sub }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="subtitle1" className={classes.headerTitle}>
          About Community
        </Typography>
      </Box>

      <Box className={classes.subData}>
        <Typography>{sub.description}</Typography>
        <hr />
        <Box className={classes.subscribersOnline}>
          <Box className={classes.subscribersOnlineBox}>
            <Typography variant="subtitle1">18.5k</Typography>
            <Typography variant="subtitle2">Evergrow Army</Typography>
          </Box>
          <Box className={classes.subscribersOnlineBox}>
            <Typography variant="subtitle1">109</Typography>
            <Typography variant="subtitle2">Online</Typography>
          </Box>
        </Box>
        <Box className={classes.subCakeDay}>
          <CakeIcon />
          <Typography>Created {dayjs(sub.createdAt).format("D MMM YYYY")}</Typography>
        </Box>

        <Button variant="contained" fullWidth>
          CREATE POST
        </Button>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "white",
    margin: "1rem",
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  headerTitle: {
    padding: "0.7rem 0.5rem",
    color: "white",
  },
  subData: {
    padding: "0.5rem",
  },
  subscribersOnline: {
    display: "flex",
  },
  subscribersOnlineBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0.5rem",
  },
  subCakeDay: {
    display: "flex",
    alignItems: "center",
    margin: "1rem auto",
  },
}));

export default SubSideBar;
