import { Checkbox, Typography, Link as MuiLink } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { NextPage } from "next";
import CButton from "../components/CButton";
import CTextField from "../components/CTextField";

const Register: NextPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box className={classes.imageContainer}></Box>

      <Box className={classes.formContainer}>
        <Box className={classes.labels}>
          <Typography variant="h6">Sign up</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            By continuing, you are setting up a Reddit account and agree to our
            <MuiLink underline="none"> User Agreement </MuiLink>
            and
            <MuiLink underline="none"> Privacy Policy </MuiLink>.
          </Typography>
        </Box>

        <Box className={classes.checkboxContainer}>
          <Checkbox size="small" disableRipple className={classes.checkbox} />
          <Typography variant="subtitle2" color="textSecondary">
            I agree to get emails about cool stuff on Reddit{" "}
          </Typography>
        </Box>

        <CTextField variant="outlined" label="username" size="small" />
        <CTextField variant="outlined" label="password" size="small" />
        <CButton variant="contained">REGISTER</CButton>
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
  checkboxContainer: {
    display: "flex",
  },
  checkbox: {
    marginRight: "0.3rem",
    padding: 0,
  },
  labels: {
    paddingBottom: "3rem",
  },
}));

export default Register;
