import useSWR from "swr";

import { Avatar, Box, Typography } from "@mui/material";

import { Sub } from "../types";

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
            <Typography variant="subtitle1">/r/{sub.name}</Typography>
          </Box>
        ))}
    </Box>
  );
};

export default FrontPageSideBar;
