import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { AppBar, Box, InputAdornment, TextField, Toolbar, Link as MuiLink, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import CButton from "./CButton";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { setCurrentUser } from "../redux/features/auth/loginSlice";
import AuthMenu from "./AuthMenu";

const Header: React.FC = () => {
  const classes = useStyles();
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
      <AppBar position="fixed" className={classes.root} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Box className={classes.titleContainer}>
            <Link href="/" passHref>
              <MuiLink underline="none" color="textPrimary" className={classes.logoContainer}>
                <Image src="/images/reddit_logo.svg" height={40} width={40} />
                <Typography variant="h5" sx={{ fontWeight: "bolder", margin: "auto 0.3rem" }}>
                  leddit.
                </Typography>
              </MuiLink>
            </Link>
          </Box>

          <Box className={classes.textfieldContainer}>
            <TextField
              placeholder="Search Reddit"
              size="small"
              fullWidth
              className={classes.textfield}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box className={classes.authContainer}>
            {data ? (
              <AuthMenu username={data.username} />
            ) : (
              <Box className={classes.buttonsContainer}>
                <CButton variant="outlined" className={classes.buttons} onClick={() => router.push("/login")}>
                  Log In
                </CButton>
                <CButton
                  color="primary"
                  variant="contained"
                  className={classes.buttons}
                  onClick={() => router.push("/register")}
                >
                  Sign Up
                </CButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

const useStyles = makeStyles((_) => ({
  offset: {
    minHeight: "5vh",
  },
  root: {
    justifyContent: "center",
    backgroundColor: "white",
    height: "5vh",
  },
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    marginRight: "2rem",
  },
  logoContainer: {
    display: "flex",
    alignItems: "start",
  },
  textfieldContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  textfield: {
    width: "40%",
  },
  authContainer: {
    display: "flex",
    alignItems: "center",
  },
  buttonsContainer: {
    display: "flex",
  },
  buttons: {
    margin: "auto 0.5rem",
  },
}));

export default Header;
