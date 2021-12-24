import React, { useState } from "react";
import axios from "axios";

import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useAppDispatch } from "../redux/store";
import { logoutUser } from "../redux/features/auth/loginSlice";

interface AuthMenuProps {
  username: string;
}

const AuthMenu: React.FC<AuthMenuProps> = ({ username }) => {
  const dispatch = useAppDispatch();

  // state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // event functions
  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(ev.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
      dispatch(logoutUser());
      setAnchorEl(null);
      window.location.reload();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <>
      <IconButton disableRipple={true} onClick={handleClick}>
        <AccountCircleIcon sx={{ mr: "0.3rem" }} />
        <Typography variant="subtitle1">{username}</Typography>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AuthMenu;
