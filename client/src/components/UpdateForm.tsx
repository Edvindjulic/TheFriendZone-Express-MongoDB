import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import { PostSchema, PostValues } from "./LoggedIn";

export default function UpdateForm(id: string) {
  const { posts } = useContext(PostContext);
  const { updatePost } = useContext(PostContext);
  const displayID = id;
  const postValues = posts.find((post) => post._id === displayID.id);

  const defaultValues: PostValues = {
    title: "",
    content: "",
  };

  const initialValues: PostValues = {
    title: postValues?.title || defaultValues.title,
    content: postValues?.content || defaultValues.content,
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
    },
  });

  return (
    <>
      <Box
        sx={{
          padding: "1.2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
          label="Rubrik"
          variant="outlined"
          type="text"
          size="medium"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          label="Vad vill du säga"
          variant="outlined"
          multiline
          rows={4}
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
          Ändra
        </Button>
      </Box>
    </>
  );
}
