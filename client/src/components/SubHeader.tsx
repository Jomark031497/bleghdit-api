import { Avatar, Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { Sub } from "../types";
import CButton from "./CButton";

interface SubProps {
  sub: Sub | undefined;
}

const SubHeader: React.FC<SubProps> = ({ sub }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.subHeaderContainer}>
        {sub?.bannerUrl ? (
          <Box
            style={{
              height: "24vh",
              backgroundImage: `url(${sub.bannerUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <Box style={{ height: "24vh", background: "skyblue" }} />
        )}

        <Container maxWidth="md" className={classes.subDataContainer}>
          <Box className={classes.avatarContainer}>
            <Avatar src={`${sub?.imageUrl}`} alt="subreddit image" className={classes.subAvatar} />
          </Box>
          <Box className={classes.subTitle}>
            <Typography variant="h4">{sub?.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              /r/{sub?.name}
            </Typography>
          </Box>
          <Box>
            <CButton variant="contained" className={classes.buttons}>
              Join
            </CButton>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const useStyles = makeStyles((_) => ({
  subHeaderContainer: {
    background: "white",
  },
  subDataContainer: {
    height: "103px",
    display: "flex",
    position: "relative",
  },
  avatarContainer: {
    position: "absolute",
    top: -15,
  },
  subAvatar: {
    height: "80px",
    width: "80px",
  },
  subTitle: {
    paddingLeft: "6rem",
  },
  buttons: {
    borderRadius: "1rem",
    padding: "0.3rem 2.3rem",
    margin: "auto 0.5rem",
  },
}));

export default SubHeader;
