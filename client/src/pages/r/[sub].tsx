import { Box, Container, SpeedDial, SpeedDialAction, styled } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import useSWR from "swr";
import PostCard from "../../components/PostCard";
import SubHeader from "../../components/SubHeader";
import SubSideBar from "../../components/SubSideBar";
import { Post, Sub } from "../../types";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";

import CreatePost from "@mui/icons-material/Create";

const Subleddit: NextPage = () => {
  const router = useRouter();

  const { data: sub } = useSWR<Sub>(router.query.sub ? `/subs/${router.query.sub}` : null);
  const actions = [
    {
      icon: <CreatePost />,
      name: "Create Post",
      action: {},
    },
  ];

  const handleClick = (operation: string) => {
    if (operation === "Create Post") {
      router.push(`/r/${router.query.sub}/create`);
    }
  };

  return (
    <>
      <Head>
        <title>
          {sub?.title}: {sub?.description}
        </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {sub && (
        <>
          <SubHeader sub={sub} />
          <Container id="main-container" maxWidth="lg" sx={{ background: "transparent", pb: "1rem", display: "flex" }}>
            <Box id="main-content" sx={{ flex: 1, my: "1rem" }}>
              {sub.posts.map((post: Post) => (
                <PostCard post={post} key={post.identifier} />
              ))}
            </Box>

            <Box
              id="sidebar"
              sx={{ flex: 0.4, ml: { xs: 0, md: "1rem" }, my: "1rem", display: { xs: "none", md: "block" } }}
            >
              <SubSideBar sub={sub} />
            </Box>
          </Container>
          <Box sx={{ display: { xs: "block", md: "none" }, position: "relative", mt: 3, height: 320 }}>
            <StyledSpeedDial ariaLabel="speed dial" icon={<SpeedDialIcon />} direction="up">
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleClick(action.name)}
                  tooltipOpen
                />
              ))}
            </StyledSpeedDial>
          </Box>
        </>
      )}
    </>
  );
};

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "fixed",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export default Subleddit;
