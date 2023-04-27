import {
  AppBar,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";
import AccountMenu from "./AccountMenu";
import Posts from "./Posts";
import { theme } from "./theme";

export interface PostValues {
  title: string;
  content: string;
}

export const PostSchema = Yup.object().shape({
  title: Yup.string()
    .required("Titel är obligatoriskt")
    .min(3, "Rubriken måste vara minst 3 tecken")
    .max(40, "Rubriken får inte vara längre än 40 tecken"),
  content: Yup.string()
    .required("Innehåll är obligatoriskt")
    .min(3, "Innehållet måste vara minst 3 tecken")
    .max(280, "Innehållet får inte vara längre än 280 tecken"),
});

export default function LoggedIn() {
  const { addPost } = useContext(PostContext);

  const formik = useFormik<PostValues>({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: PostSchema,
    onSubmit(values: PostValues) {
      addPost(values);
      formik.resetForm();
    },
  });

  const { user } = useContext(UserContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Typography
          variant={isSmallScreen ? "h6" : "h4"}
          color="secondary.contrastText"
        >
          Välkommen, {user?.username}!
        </Typography>
        <AccountMenu />
      </AppBar>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          padding: "2rem",
        }}
      >
        <Box
          sx={{ padding: "1.2rem" }}
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "auto",
              marginRight: "auto",
              gap: "1.2rem",
              maxWidth: "1200px",
            }}
          >
            <TextField
              fullWidth
              label={formik.values.title ? null : "Rubrik"}
              variant="outlined"
              type="text"
              size="medium"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                backgroundColor: "white",
              }}
              InputLabelProps={{
                shrink: false,
              }}
              error={
                formik.submitCount > 0 &&
                formik.touched.title &&
                Boolean(formik.errors.title)
              }
              helperText={
                formik.submitCount > 0 &&
                formik.touched.title &&
                formik.errors.title
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                fullWidth
                label={formik.values.content ? null : "Vad vill du säga?"}
                variant="outlined"
                type="text"
                size="medium"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  backgroundColor: "white",
                  borderBottom: "1px solid lightgrey",
                  flex: 1,
                  marginRight: 1,
                  overflowWrap: "break-word", // To break the word
                  wordWrap: "break-word",
                  hyphens: "auto",
                  minWidth: 0,
                  maxWidth: "100%",
                }}
                multiline
                rows={4}
                inputProps={{ maxLength: 280 }}
                inputMode="text"
                InputLabelProps={{
                  shrink: false,
                }}
                error={
                  formik.submitCount > 0 &&
                  formik.touched.content &&
                  Boolean(formik.errors.content)
                }
                helperText={
                  formik.submitCount > 0 &&
                  formik.touched.content &&
                  formik.errors.content
                }
              />

              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{
                    width: "5rem",
                    marginTop: { xs: 2, sm: 0 },
                    "&:hover": {
                      backgroundColor: "",
                    },
                  }}
                >
                  Posta
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Posts />
      </Box>
    </Box>
  );
}
