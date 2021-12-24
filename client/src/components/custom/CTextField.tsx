import { TextField } from "@mui/material";

const CTextField = ({ ...props }) => {
  return <TextField {...props} sx={{ m: "0.5rem 0rem" }} size="small" />;
};

export default CTextField;
