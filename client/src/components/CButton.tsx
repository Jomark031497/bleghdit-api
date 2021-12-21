import { Button } from "@mui/material";

const CButton = ({ ...props }) => {
  return <Button {...props} style={{ margin: "auto 0.5rem", padding: "0.3rem 2.5rem", borderRadius: "1rem" }} />;
};

export default CButton;
