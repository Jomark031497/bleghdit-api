import { TextField } from "@mui/material";

interface Props {
  placeholder?: string;
  label?: string;
  InputProps?: any;
}

const CTextField: React.FC<Props> = ({ ...props }) => {
  return (
    <TextField
      {...props}
      sx={{ m: "0.5rem 0rem" }}
      size="small"
      fullWidth
      variant="outlined"
      label={props.label}
      placeholder={props.placeholder}
      InputProps={props.InputProps}
    />
  );
};

export default CTextField;
