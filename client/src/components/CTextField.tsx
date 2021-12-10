import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

const CTextField = ({ ...props }) => {
  return <CssTextField {...props} style={{ margin: "0.5rem 0rem" }} />;
};

const CssTextField = withStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}))(TextField);

export default CTextField;
