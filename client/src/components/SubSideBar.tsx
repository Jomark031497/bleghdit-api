import { Box, Typography, Button } from "@mui/material";
import { Sub } from "../types";
import CakeIcon from "@mui/icons-material/Cake";
import dayjs from "dayjs";
import { useRouter } from "next/router";

interface SubProp {
  sub: Sub;
}

const SubSideBar: React.FC<SubProp> = ({ sub }) => {
  const router = useRouter();

  return (
    <Box sx={{ background: "white", mx: "1rem" }}>
      <Box sx={{ backgroundColor: "primary.main" }}>
        <Typography variant="subtitle1" sx={{ p: "0.7rem 0.5rem", color: "white" }}>
          About Community
        </Typography>
      </Box>

      <Box sx={{ p: "0.5rem" }}>
        <Typography>{sub.description}</Typography>
        <hr />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: "0.5rem" }}>
            <Typography variant="subtitle1">18.5k</Typography>
            <Typography variant="subtitle2">Evergrow Army</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: "0.5rem" }}>
            <Typography variant="subtitle1">109</Typography>
            <Typography variant="subtitle2">Online</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", my: "1rem" }}>
          <CakeIcon />
          <Typography>Created {dayjs(sub.createdAt).format("D MMM YYYY")}</Typography>
        </Box>

        <Button variant="contained" fullWidth onClick={() => router.push(`/r/${sub.name}/create`)}>
          CREATE POST
        </Button>
      </Box>
    </Box>
  );
};

export default SubSideBar;
