import { Avatar, Box, Button } from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import BestIcon from "@mui/icons-material/RocketLaunch";
import TopIcon from "@mui/icons-material/BarChart";
import HotIcon from "@mui/icons-material/LocalFireDepartment";
import NewIcon from "@mui/icons-material/NewReleases";

import CTextField from "./CTextField";

const FrontPageActions: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "white", m: "1rem auto" }}>
        <Avatar sx={{ m: "auto 0.5rem" }}>H</Avatar>
        <CTextField placeholder="Create Post" sx={{ flex: 1 }} />
        <Box sx={{ display: "flex", m: "auto 0.5rem", color: "text.secondary" }}>
          <PhotoIcon sx={{ fontSize: "2rem", m: "auto 0.2rem" }} />
          <InsertLinkIcon sx={{ fontSize: "2rem", m: "auto 0.2rem" }} />
        </Box>
      </Box>

      <Box sx={{ backgroundColor: "white", m: "1rem auto", p: "0.5rem" }}>
        <Button
          startIcon={<HotIcon />}
          sx={{
            borderRadius: "1rem",
            backgroundColor: "#eee",
            mx: "0.5rem",
            p: "0.5rem 1rem",
          }}
        >
          Hot
        </Button>
        <Button
          startIcon={<BestIcon />}
          sx={{
            borderRadius: "1rem",
            backgroundColor: "#eee",
            mx: "0.5rem",
            p: "0.5rem 1rem",
          }}
        >
          Best
        </Button>
        <Button
          startIcon={<TopIcon />}
          sx={{
            borderRadius: "1rem",
            backgroundColor: "#eee",
            mx: "0.5rem",
            p: "0.5rem 1rem",
          }}
        >
          Top
        </Button>
        <Button
          startIcon={<NewIcon />}
          sx={{
            borderRadius: "1rem",
            backgroundColor: "#eee",
            mx: "0.5rem",
            p: "0.5rem 1rem",
          }}
        >
          New
        </Button>
      </Box>
    </>
  );
};

export default FrontPageActions;
