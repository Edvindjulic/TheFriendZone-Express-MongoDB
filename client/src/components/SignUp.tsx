import { Box, Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

interface SignupValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Användarnamn är obligatoriskt"),
  password: Yup.string()
    .required("Lösenord är obligatoriskt")
    .min(6, "Lösenordet måste innehålla minst 6 tecken"),
  confirmPassword: Yup.string()
    .required("Bekräfta lösenord är obligatoriskt")
    .oneOf([Yup.ref("password")], "Lösenorden matchar inte"),
});

export default function SignUpForm() {
  const formik = useFormik<SignupValues>({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values: SignupValues) => {
      console.log(values);
      // VAD GÖR VI HÄR BACKEND TEAMET?
    },
  });

  return (
    <Paper
      elevation={6}
      sx={{
        width: "40%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "20rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            margin: "2rem",
            height: "auto",
          },
        }}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="username"
          name="username"
          label="Användarnamn"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.username && Boolean(formik.errors.username)
          }
          helperText={
            formik.touched.username && formik.errors.username
          }
        />
        <TextField
          id="password"
          name="password"
          label="Lösenord"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && Boolean(formik.errors.password)
          }
          helperText={
            formik.touched.password && formik.errors.password
          }
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Bekräfta lösenord"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword
          }
        />
        <Button color="secondary" type="submit" variant="contained">
          Skapa konto
        </Button>
      </Box>
    </Paper>
  );
}
