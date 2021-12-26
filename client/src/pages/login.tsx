import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { RootState, useAppDispatch } from "../redux/store";
import { loginUser } from "../redux/features/auth/loginSlice";
import CTextField from "../components/custom/CTextField";
import { Field, Form, Formik } from "formik";
import CButton from "../components/custom/CButton";

import CLink from "../components/custom/CLink";

interface AuthProps {
  username: string;
  password: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<any>({});
  const { data } = useSelector((state: RootState) => state.login);

  if (data) router.push("/");

  const handleSubmit = async (values: AuthProps) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      router.push("/");
    } catch (err: any) {
      setErrors(err);
    }
  };
  return (
    <Box sx={{ display: "flex", backgroundColor: "white" }}>
      <Head>
        <title>leddit.com: Log in</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Box sx={{ width: { xs: 0, sm: "10%" }, height: "100vh", backgroundImage: "url('/images/bricks.jpg') " }} />
      <Box
        sx={{
          maxWidth: "23rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: "0rem 1.5rem",
          pb: "5rem",
        }}
      >
        <Box sx={{ paddingBottom: "3rem" }}>
          <Typography variant="h6">Login</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            By continuing, you agree to our
            <MuiLink underline="none"> User Agreement </MuiLink>
            and
            <MuiLink underline="none"> Privacy Policy </MuiLink>.
          </Typography>
        </Box>
        <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleSubmit(values)}>
          {() => (
            <Box component={Form}>
              <Field as={CTextField} name="username" label="username" error={errors.username ? true : false} />
              <Typography color="error" variant="subtitle2">
                {errors.username}
              </Typography>
              <Field
                as={CTextField}
                type="password"
                name="password"
                label="password"
                error={errors.password ? true : false}
              />
              <Typography color="error" variant="subtitle2">
                {errors.password}
              </Typography>

              <Typography color="error" variant="subtitle2">
                {errors.error}
              </Typography>
              <CButton type="submit" variant="contained" my="0.5rem" fullWidth>
                LOGIN
              </CButton>
            </Box>
          )}
        </Formik>

        <Typography sx={{ mt: "0.5rem" }}>
          New to leddit?
          <CLink href="/register" label="Sign up" color="textSecondary" variant="subtitle1" />
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
