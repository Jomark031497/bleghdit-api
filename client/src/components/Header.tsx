import {
  AppBar,
  Box,
  InputAdornment,
  TextField,
  Toolbar,
  Link as MuiLink,
  IconButton,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Link from "next/link";
import CButton from "./CButton";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const classes = useStyles();

  const router = useRouter();
  return (
    <>
      <AppBar position="fixed" className={classes.root} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Link href="/" passHref>
            <MuiLink underline="none" color="textPrimary" className={classes.titleContainer}>
              <Image src="/images/reddit_logo.svg" height={30} width={30} />
              <Typography variant="h5" sx={{ fontWeight: "bolder", margin: "auto 0.3rem" }}>
                leddit.
              </Typography>
            </MuiLink>
          </Link>

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
            />
          </Box>

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
            <IconButton>
              <AccountCircleIcon />
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

const useStyles = makeStyles(() => ({
  offset: {
    minHeight: "5vh",
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
    display: "flex",
    alignItems: "start",
  },
  textfieldContainer: {
    width: "50%",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
  },
  buttons: {
    borderRadius: "1rem",
    padding: "0.3rem 2.3rem",
    margin: "auto 0.5rem",
  },
}));

export default Header;
