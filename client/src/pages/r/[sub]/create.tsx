import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CTextField from "../../../components/custom/CTextField";
import { RootState } from "../../../redux/store";

interface INewPost {
  title: string;
  body: string;
}

const PostPage: NextPage = () => {
  const router = useRouter();

  const { data } = useSelector((state: RootState) => state.login);

  if (!data) router.push(`/r/${router.query.sub}`);

  const createPost = async (values: INewPost) => {
    if (!values.title) return;

    try {
      const { data: post } = await axios.post(
        "/posts/create",
        {
          title: values.title,
          body: values.body,
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
    <Container maxWidth="md" sx={{ background: "#fff", m: "3rem auto", p: "1rem 1rem" }}>
      <Formik initialValues={{ title: "", body: "" }} onSubmit={(values) => createPost(values)}>
        {() => (
          <Box component={Form}>
            <Typography variant="h5">Submit to /r/{router.query.sub}</Typography>
            <Field as={CTextField} placeholder="title" name="title" />
            <TextField multiline minRows={4} name="body" placeholder="text (optional)" fullWidth />

            <Button type="submit" variant="contained" sx={{ alignSelf: "flex-end" }}>
              POST
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default PostPage;
