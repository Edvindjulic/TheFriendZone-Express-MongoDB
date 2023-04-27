import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import {
  PostSchema,
  PostValues,
} from "./LoggedIn";

export default function UpdateForm(id: string) {
  const navigate = useNavigate();
  const { posts } = useContext(PostContext);
  const { updatePost } = useContext(PostContext);
  const displayID = id;
  const postValues = posts.find(
    (post) => post._id === displayID.id
  );

  const defaultValues: PostValues = {
    title: "",
    content: "",
  };

  const initialValues: PostValues = {
    title:
      postValues?.title || defaultValues.title,
    content:
      postValues?.content ||
      defaultValues.content,
  };

  const formik = useFormik<PostValues>({
    initialValues,
    validationSchema: PostSchema,
    onSubmit(values: PostValues) {
      const sendValues = {
        ...values,
        author: postValues?.author,
        _id: postValues?._id,
      };
      // console.log(sendValues);
      updatePost(sendValues);
      navigate("/");
    },
  });

  return (
    <>
      Post ID: {displayID.id} <br />
      {postValues?.title} <br />
      {postValues?.content} <br />
      {postValues?.author} <br />
      <Box
        sx={{ padding: "1.2rem" }}
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
          label="Titel"
          variant="outlined"
          type="text"
          size="medium"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          label="Skriv ditt inlägg..."
          variant="outlined"
          type="text"
          name="content"
          defaultValue={postValues?.content}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          sx={{
            marginTop: { xs: 2, sm: 0 },
            "&:hover": {
              backgroundColor: "",
            },
          }}
        >
          Posta
        </Button>
      </Box>
    </>
  );
}
