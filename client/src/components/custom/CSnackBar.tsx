import { Button, IconButton, Snackbar, SnackbarProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

interface ISnackbarProps extends SnackbarProps {
  openSnackbar: boolean;
  closeSnackbar: any;
}

const CSnackBar: React.FC<ISnackbarProps> = ({ ...props }) => {
  const router = useRouter();

  return (
    <Snackbar
      {...props}
      open={props.openSnackbar}
      autoHideDuration={6000}
      message="You must be logged in"
      action={
        <>
          <Button color="secondary" size="small" onClick={() => router.push("/login")}>
            Log In
          </Button>
          <IconButton size="small" color="inherit">
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={props.closeSnackbar}
    />
  );
};

export default CSnackBar;
