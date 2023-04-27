import {
  Alert,
  Box,
  Button,
  Paper,
  Portal,
  Snackbar,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { theme } from "./theme";

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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik<SignupValues>({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values: SignupValues) => {
      try {
        const response = await fetch("/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          setRegistrationSuccess(true);
        } else {
          const message = await response.text();
          throw new Error(message);
        }
      } catch (error) {
        console.error("Error registering user:", error);
        formik.setFieldError("username", error.message.replace(/"/g, ""));
      }
    },
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: "60rem",
        width: "90%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            width: isSmallScreen ? "15rem" : "25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            height: "auto",
            paddingBottom: "1rem",
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
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          InputProps={{
            sx: { backgroundColor: "white" },
          }}
          FormHelperTextProps={{
            sx: {
              backgroundColor: "transparent",
            },
          }}
        />
        <TextField
          id="password"
          name="password"
          label="Lösenord"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            sx: { backgroundColor: "white" },
          }}
          FormHelperTextProps={{
            sx: {
              backgroundColor: "transparent",
            },
          }}
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
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          InputProps={{
            sx: { backgroundColor: "white" },
          }}
          FormHelperTextProps={{
            sx: {
              backgroundColor: "transparent",
            },
          }}
        />
        <Button color="secondary" type="submit" variant="contained">
          Skapa konto
        </Button>
      </Box>
      <Portal>
        <Snackbar
          autoHideDuration={3000}
          open={registrationSuccess}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClose={() => {
            setRegistrationSuccess(false);
            navigate("/");
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            severity="success"
            onClose={() => {
              setRegistrationSuccess(false);
              navigate("/");
            }}
          >
            Ditt konto har skapats! Vi skickar dig nu tillbaka till startsidan
          </Alert>
        </Snackbar>
      </Portal>
    </Paper>
  );
}
