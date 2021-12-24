import { FormEvent, useState } from "react";
import { Checkbox, Typography, Link as MuiLink, Button } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import CTextField from "../components/custom/CTextField";
import { registerUser } from "../redux/features/auth/registerSlice";
import { useAppDispatch } from "../redux/store";

const Register: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(user)).unwrap();
      router.push("/login");
    } catch (err: any) {
      setErrors(err);
    }
  };

  return (
    <Box sx={{ display: "flex", background: "white" }}>
      <Head>
        <title>leddit.com: Join the worldwide conversation</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Box sx={{ width: "10%", height: "100vh", backgroundImage: "url('/images/bricks.jpg') " }} />
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
        <Box sx={{ pb: "3rem" }}>
          <Typography variant="h6">Sign up</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            By continuing, you are setting up a Reddit account and agree to our
            <MuiLink underline="none"> User Agreement </MuiLink>
            and
            <MuiLink underline="none"> Privacy Policy </MuiLink>.
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Checkbox size="small" disableRipple sx={{ mr: "0.3rem", p: 0 }} />
          <Typography variant="subtitle2" color="textSecondary">
            I agree to get emails about cool stuff on Reddit
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <CTextField
            variant="outlined"
            label="email address"
            fullWidth
            error={errors.email ? true : false}
            value={user.email}
            onChange={(e: any) => setUser({ ...user, email: e.target.value })}
          />
          <Typography color="error" variant="subtitle2">
            {errors.email}
          </Typography>

          <CTextField
            variant="outlined"
            label="username"
            fullWidth
            error={errors.username ? true : false}
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
            error={errors.password ? true : false}
            value={user.password}
            onChange={(e: any) => setUser({ ...user, password: e.target.value })}
          />
          <Typography color="error" variant="subtitle2">
            {errors.password}
          </Typography>

          <Button type="submit" variant="contained" fullWidth>
            REGISTER
          </Button>
        </Box>

        <Typography>
          Already a ledditor?
          <Link href="/login" passHref>
            <MuiLink underline="none"> Log in</MuiLink>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
