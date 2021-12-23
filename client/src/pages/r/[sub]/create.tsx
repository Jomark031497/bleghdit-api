import { Box, Button, Container, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Post } from "../../../types";

const PostPage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPost.title) return;
    console.log(router.query);
    try {
      const { data } = await axios.post(
        "/posts/create",
        {
          title: newPost.title,
          body: newPost.body,
          sub: router.query.sub,
        },
        { withCredentials: true }
      );

      router.push(`/r/${data.subName}/${data.identifier}/${data.slug}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxWidth="md" className={classes.root}>
      <Box component="form" onSubmit={createPost}>
        <TextField
          placeholder="title"
          fullWidth
          size="small"
          className={classes.textfields}
          value={newPost.title}
          onChange={(e: any) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <TextField
          multiline
          minRows={4}
          fullWidth
          placeholder="text (optional)"
          className={classes.textfields}
          value={newPost.body}
          onChange={(e: any) => setNewPost({ ...newPost, body: e.target.value })}
        />

        <Button type="submit" variant="contained" className={classes.button}>
          POST
        </Button>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    background: "#fff",
    margin: "3rem auto",
    padding: "1rem 1rem",
    display: "flex",
    flexDirection: "column",
  },
  textfields: {
    margin: "0.5rem auto",
  },
  button: {
    alignSelf: "flex-end",
  },
}));

export default PostPage;
