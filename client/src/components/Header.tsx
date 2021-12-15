import { AppBar, Box, InputAdornment, TextField, Toolbar, Link as MuiLink, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Link from "next/link";
import CButton from "./CButton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import AuthMenu from "./AuthMenu";
import axios from "axios";
import { useEffect } from "react";
import { setCurrentUser } from "../redux/features/auth/loginSlice";

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
                <Image src="/images/reddit_logo.svg" height={30} width={30} />
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
              fullWidth={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className={classes.textfield}
            />
          </Box>

          <Box className={classes.authContainer}>
            {data ? (
              <AuthMenu data={data} />
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

const useStyles = makeStyles(() => ({
  offset: {
    minHeight: "6vh",
  },
  root: {
    justifyContent: "center",
    backgroundColor: "white",
  },
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "5vh",
  },
  titleContainer: {
    marginRight: "2rem",
  },
  logoContainer: {
    display: "flex",
    alignItems: "start",
  },
  textfieldContainer: {},
  textfield: {
    width: "40rem",
  },
  authContainer: {
    display: "flex",
    alignItems: "center",
  },
  buttonsContainer: {
    display: "flex",
  },
  buttons: {
    borderRadius: "1rem",
    padding: "0.3rem 2.3rem",
    margin: "auto 0.5rem",
  },
}));

export default Header;
