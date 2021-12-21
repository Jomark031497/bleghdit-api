import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import { useSelector } from "react-redux";

import { Avatar, Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { RootState } from "../redux/store";
import { Sub } from "../types";
import CButton from "./CButton";

interface SubProps {
  sub: Sub;
}

const SubHeader: React.FC<SubProps> = ({ sub }) => {
  const classes = useStyles();

  const [ownsSub, setOwnsSub] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (!sub) return;
    const isOwn = data?.username === sub.username;
    setOwnsSub(isOwn);
  }, [sub]);

  const openFileInput = (type: string) => {
    if (!ownsSub) return;
    fileInputRef.current!.name = type;
    fileInputRef.current!.click();
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files![0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileInputRef.current!.name);

    try {
      await axios.post(`/subs/${sub?.name}/image`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      mutate(`/subs/${sub?.name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {sub && (
        <>
          <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage} />
          <Box className={classes.subHeaderContainer}>
            {sub.bannerUrl ? (
              <Box
                style={{
                  height: "24vh",
                  backgroundImage: `url(${sub.bannerUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  cursor: ownsSub ? "pointer" : "",
                  backgroundColor: "skyblue",
                }}
                onClick={() => openFileInput("banner")}
              ></Box>
            ) : (
              <Box style={{ height: "24vh", background: "skyblue" }} />
            )}

            <Container maxWidth="md" className={classes.subDataContainer}>
              <Box className={classes.avatarContainer} style={{ cursor: ownsSub ? "pointer" : "" }}>
                <Avatar
                  src={`${sub.imageUrl}`}
                  alt="subreddit image"
                  className={classes.subAvatar}
                  onClick={() => openFileInput("image")}
                />
              </Box>
              <Box className={classes.subTitle}>
                <Typography variant="h4">{sub.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  /r/{sub.name}
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
      )}
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
    margin: "auto 0.5rem",
  },
}));

export default SubHeader;
