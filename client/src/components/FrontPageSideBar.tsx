import useSWR from "swr";

import { Avatar, Box, Typography } from "@mui/material";

import { Sub } from "../types";
import CLink from "./custom/CLink";

const FrontPageSideBar: React.FC = () => {
  const { data: subs } = useSWR<Sub[]>("/subs");

  return (
    <Box sx={{ margin: "1rem" }}>
      <Typography variant="h6" sx={{ paddingTop: "2rem", backgroundColor: "#000", color: "#fff", textAlign: "center" }}>
        Top Growing Communities
      </Typography>
      {subs &&
        subs.map((sub) => (
          <Box
            key={sub.name}
            sx={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid lightgrey",
              p: "0.2rem",
            }}
          >
            <Avatar src={sub.imageUrl} sx={{ mx: "0.5rem" }} />
            <CLink href={`/r/${sub.name}`} label={`r/${sub.name}`} variant="subtitle2" />
          </Box>
        ))}
    </Box>
  );
};

export default FrontPageSideBar;
