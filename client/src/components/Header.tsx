import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { AppBar, Box, InputAdornment, Toolbar, Link as MuiLink, Typography, TextField, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CButton from "./custom/CButton";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { setCurrentUser } from "../redux/features/auth/loginSlice";
import AuthMenu from "./AuthMenu";
import { Sub } from "../types";

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useSelector((state: RootState) => state.login);

  const [name, setName] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);
  const [timer, setTimer] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/auth/me", { withCredentials: true });
        dispatch(setCurrentUser(data));
      } catch (err) {
        console.error(err);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (name.trim() === "") {
      clearTimeout(timer);
      setSubs([]);
      return;
    }
    searchSubs();

    return () => {
      clearTimeout(timer);
      setSubs([]);
    };
  }, [name]);

  const searchSubs = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await axios.get(`/subs/search/${name}`);
          setSubs(data);
        } catch (error) {
          console.error(error);
        }
      }, 500)
    );
  };

  const goToSub = (subName: string) => {
    setName("");
    router.push(`/r/${subName}`);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ justifyContent: "center", backgroundColor: "white", height: "5vh" }}>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ mr: "2rem" }}>
            <Link href="/" passHref>
              <MuiLink underline="none" color="textPrimary" sx={{ display: "flex", alignItems: "start" }}>
                <Image src="/images/reddit_logo.svg" height={40} width={40} />
                <Typography variant="h5" sx={{ fontWeight: "bolder", margin: "auto 0.3rem" }}>
                  leddit.
                </Typography>
              </MuiLink>
            </Link>
          </Box>

          <Box sx={{ flex: 1, display: "flex", maxWidth: "40%", position: "relative" }}>
            <TextField
              placeholder="Search Reddit"
              value={name}
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                position: "absolute",
                background: "white",
                color: "black",
                top: "100%",
                left: 0,
                right: 0,
              }}
            >
              {subs?.map((sub) => (
                <Box
                  key={sub.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem",
                    "&:hover": {
                      background: "lightgrey",
                    },
                  }}
                  onClick={() => goToSub(sub.name)}
                >
                  <Avatar src={sub.imageUrl} sx={{ mr: "0.5rem" }} />
                  <Box>
                    <Typography variant="subtitle1">r/{sub.name}</Typography>
                    <Typography variant="body2">{sub.title}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {data ? (
              <AuthMenu username={data.username} />
            ) : (
              <Box sx={{ display: "flex" }}>
                <CButton variant="outlined" mx="0.3rem" onClick={() => router.push("/login")}>
                  Log In
                </CButton>
                <CButton variant="contained" mx="0.3rem" color="primary" onClick={() => router.push("/register")}>
                  Sign Up
                </CButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: "5vh" }} />
    </>
  );
};

export default Header;
