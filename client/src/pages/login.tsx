import { FormEvent, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Box, Typography, Link as MuiLink, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { RootState, useAppDispatch } from "../redux/store";
import { loginUser } from "../redux/features/auth/loginSlice";
import CTextField from "../components/CTextField";

const Login: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<any>({});
  const { data } = useSelector((state: RootState) => state.login);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  if (data) router.push("/");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(user)).unwrap();
      router.push("/");
    } catch (err: any) {
      setErrors(err);
    }
  };
  return (
    <div className={classes.root}>
      <Head>
        <title>leddit.com: Log in</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Box className={classes.imageContainer} />
      <Box className={classes.formContainer}>
        <Box className={classes.labels}>
          <Typography variant="h6">Login</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            By continuing, you agree to our
            <MuiLink underline="none"> User Agreement </MuiLink>
            and
            <MuiLink underline="none"> Privacy Policy </MuiLink>.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <CTextField
            variant="outlined"
            label="username"
            fullWidth
            error={errors.error ? true : false}
            value={user.username}
            onChange={(e: any) => setUser({ ...user, username: e.target.value })}
          />
          <Typography color="error" variant="subtitle2">
            {errors.username}
          </Typography>

          <CTextField
            variant="outlined"
            label="password"
            type="password"
            fullWidth
            error={errors.error ? true : false}
            value={user.password}
            onChange={(e: any) => setUser({ ...user, password: e.target.value })}
          />
          <Typography color="error" variant="subtitle2">
            {errors.password}
          </Typography>

          <Typography color="error" variant="subtitle2">
            {errors.error}
          </Typography>

          <Button type="submit" variant="contained" fullWidth>
            LOGIN
          </Button>
        </Box>

        <Typography>
          New to leddit?
          <Link href="/register" passHref>
            <MuiLink underline="none"> Sign up</MuiLink>
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((_) => ({
  root: {
    display: "flex",
    background: "white",
  },
  imageContainer: {
    width: "10%",
    height: "100vh",
    backgroundImage: "url('/images/bricks.jpg') ",
  },
  formContainer: {
    maxWidth: "23rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0rem 1.5rem",
    paddingBottom: "5rem",
  },

  labels: {
    paddingBottom: "3rem",
  },
}));

export default Login;
