import {
  AppBar,
  Box,
  Button,
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

const Header: React.FC = () => {
  const classes = useStyles();
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
            <Button color="secondary" variant="contained" className={classes.buttons}>
              Log In
            </Button>
            <Button color="secondary" variant="contained" className={classes.buttons}>
              Sign Up
            </Button>
            <IconButton>
              <AccountCircleIcon color="secondary" />
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
