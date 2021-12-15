import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { User } from "../types";
import { useAppDispatch } from "../redux/store";
import { logoutUser } from "../redux/features/auth/loginSlice";
import axios from "axios";

interface AuthMenuProps {
  data: User;
}

const AuthMenu: React.FC<AuthMenuProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
      dispatch(logoutUser());

      window.location.reload();
    } catch (err: any) {
      console.error(err.response.data);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton disableRipple={true} onClick={handleClick}>
        <AccountCircleIcon />
        <Typography>{data.username}</Typography>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AuthMenu;
