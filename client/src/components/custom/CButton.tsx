import { Button } from "@mui/material";

const CButton = ({ ...props }) => {
  return <Button {...props} sx={{ m: "auto 0.5rem", p: "0.3rem 2.5rem", borderRadius: "1rem" }} />;
};

export default CButton;
