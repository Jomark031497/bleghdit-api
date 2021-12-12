import { Button } from "@mui/material";

const CButton = ({ ...props }) => {
  return <Button {...props} style={{ margin: "0.5rem", padding: "0.3rem 2.5rem" }} />;
};

export default CButton;
