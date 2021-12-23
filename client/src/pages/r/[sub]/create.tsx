import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const PostPage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const { data } = useSelector((state: RootState) => state.login);

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  if (!data) router.push(`/r/${router.query.sub}`);

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPost.title) return;
    console.log(router.query);
    try {
      const { data: post } = await axios.post(
        "/posts/create",
        {
          title: newPost.title,
          body: newPost.body,
          sub: router.query.sub,
        },
        { withCredentials: true }
      );

      router.push(`/r/${post.subName}/${post.identifier}/${post.slug}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxWidth="md" className={classes.root}>
      <Box component="form" onSubmit={createPost}>
        <Typography variant="h5">Submit to /r/{router.query.sub}</Typography>
        <TextField
          placeholder="title"
          fullWidth
          size="small"
          margin="normal"
          value={newPost.title}
          onChange={(e: any) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <TextField
          multiline
          minRows={4}
          fullWidth
          margin="normal"
          placeholder="text (optional)"
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
  },
  button: {
    alignSelf: "flex-end",
  },
}));

export default PostPage;
