import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { AppBar, Box, InputAdornment, TextField, Toolbar, Link as MuiLink, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CButton from "./custom/CButton";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { setCurrentUser } from "../redux/features/auth/loginSlice";
import AuthMenu from "./AuthMenu";

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useSelector((state: RootState) => state.login);

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

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <TextField
              placeholder="Search Reddit"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "40%" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {data ? (
              <AuthMenu username={data.username} />
            ) : (
              <Box sx={{ display: "flex" }}>
                <CButton variant="outlined" onClick={() => router.push("/login")} sx={{ mX: " 0.5rem" }}>
                  Log In
                </CButton>
                <CButton
                  color="primary"
                  variant="contained"
                  sx={{ mx: " 0.5rem" }}
                  onClick={() => router.push("/register")}
                >
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
