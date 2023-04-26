import { AppBar, Box, Button, Grid, TextField, Toolbar } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";
import AccountMenu from "./AccountMenu";
import Posts from "./Posts";

export interface PostValues {
  title: string;
  content: string;
}

export const PostSchema = Yup.object().shape({
  title: Yup.string()
    .required("Titel är obligatoriskt")
    .min(3, "Titeln måste innehålla minst 3 tecken")
    .max(20, "Titeln får inte vara längre än 20 tecken"),
  content: Yup.string()
    .required("Innehåll är obligatoriskt")
    .min(3, "Innehållet måste innehålla minst 3 tecken")
    .max(140, "Innehållet får inte vara längre än 140 tecken"),
});

export default function LoggedIn() {
  const formik = useFormik<PostValues>({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: PostSchema,
    onSubmit(values: PostValues) {
      addPost(values);
    },
  });

  const { addPost } = useContext(PostContext);

  const { user, logout } = useContext(UserContext);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        padding: "2rem",
      }}
    >
      <Box>
        <AppBar position="static" sx={{ marginBottom: 4 }}>
          <AccountMenu />
          <Toolbar sx={{ justifyContent: "flex-end" }}></Toolbar>
        </AppBar>
        <Box
          sx={{ padding: "1.2rem" }}
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Skriv ditt inlägg..."
                variant="outlined"
                type="text"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                fullWidth
                label="Titel"
                variant="outlined"
                type="text"
                size="medium"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
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
            </Grid>
          </Grid>
        </Box>
        <Posts />
      </Box>
    </Box>
  );
}
