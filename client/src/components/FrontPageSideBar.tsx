import { Avatar, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useSWR from "swr";
import { Sub } from "../types";

const FrontPageSideBar: React.FC = () => {
  const classes = useStyles();

  const { data: subs } = useSWR<Sub[]>("/subs");

  console.log(subs);
  return (
    <Box className={classes.root}>
      <Box>
        <Box>
          <Typography variant="h6" className={classes.header}>
            Top Growing Communities
          </Typography>
          {subs &&
            subs.map((sub) => (
              <Box key={sub.name} className={classes.subList}>
                <Avatar src={sub.imageUrl} className={classes.avatar} />
                <Typography variant="subtitle1">/r/{sub.name}</Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((_) => ({
  root: {
    margin: "1rem",
  },
  header: {
    paddingTop: "2rem",
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
  },
  subList: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid lightgrey",
    padding: "0.2rem",
  },
  avatar: {
    margin: "auto 0.5rem",
  },
}));

export default FrontPageSideBar;
