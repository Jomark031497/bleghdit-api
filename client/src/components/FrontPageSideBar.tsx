import useSWR from "swr";

import { Avatar, Box, Typography } from "@mui/material";

import { Sub } from "../types";
import CLink from "./custom/CLink";

const FrontPageSideBar: React.FC = () => {
  const { data: subs } = useSWR<Sub[]>("/subs");

  return (
    <Box sx={{ ml: "1rem", borderRadius: "0.5rem" }}>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          paddingTop: "3rem",
          backgroundColor: "#000",
          color: "#fff",
          borderTopRightRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
        }}
      >
        Today{"'"}s Top Growing Communities
      </Typography>
      {subs &&
        subs.map((sub, index) => (
          <Box
            key={sub.name}
            sx={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid lightgrey",
              p: "0.5rem",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {index + 1}
            </Typography>
            <Avatar src={sub.imageURN} sx={{ mx: "0.5rem" }} />
            <CLink
              href={`/r/${sub.name}`}
              label={`r/${sub.name}`}
              variant="subtitle2"
              color="textPrimary"
              sx={{ fontWeight: "bold" }}
            />
          </Box>
        ))}
    </Box>
  );
};

export default FrontPageSideBar;
