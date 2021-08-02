import {
  AppBar,
  Box,
  Button,
  InputAdornment,
  makeStyles,
  TextField,
  Toolbar,
  Link as MuiLink,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <AppBar position="fixed" className={classes.root} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Box>
            <Link href="/" passHref>
              <MuiLink variant="h4" underline="none" color="textPrimary">
                leddit.
              </MuiLink>
            </Link>
          </Box>

          <Box className={classes.searchFieldContainer}>
            <TextField
              type="input"
              variant="outlined"
              size="small"
              placeholder="Search Leddit"
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

          <Box className={classes.authButtonsContainer}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.authButtons}
            >
              Log In
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={classes.authButtons}
              onClick={() => router.push("/register")}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <div className={classes.offset} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    backgroundColor: "#fff",
    color: "#000",
    height: "8vh",
    justifyContent: "center",
    padding: "0.5rem",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchFieldContainer: {
    width: "50%",
  },
  authButtonsContainer: {},

  authButtons: {
    borderRadius: "1rem",
    padding: "0.3rem 2.3rem",
    margin: "auto 0.5rem",
  },
}));

export default Header;
