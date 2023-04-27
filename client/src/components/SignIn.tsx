import styled from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  useMediaQuery,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

interface SigninValues {
  username: string;
  password: string;
}

export default function SignInForm() {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const formik = useFormik<SigninValues>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values: SigninValues) => {
      setLoading(true);
      try {
        const response = await fetch(
          "/api/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          const data = await response.json();

          await new Promise((resolve) =>
            setTimeout(resolve, 2000)
          );

          setUser(data);
        } else {
          const message = await response.text();
          throw new Error(message);
        }
      } catch (error) {
        console.error(
          "Error logging in user:",
          error
        );
      }
      setLoading(false);
    },
  });

  const StyledNavLink = styled(NavLink)({
    textDecoration: "none",
    color: "black",
  });

  const matches = useMediaQuery(
    "(max-width:300px)"
  );
  return (
    <Paper
      elevation={6}
      sx={{
        width: "100%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,

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
            formik.touched.username &&
            Boolean(formik.errors.username)
          }
          helperText={
            formik.touched.username &&
            formik.errors.username
          }
          sx={{
            backgroundColor: "white",
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
          error={
            formik.touched.password &&
            Boolean(formik.errors.password)
          }
          helperText={
            formik.touched.password &&
            formik.errors.password
          }
          sx={{
            backgroundColor: "white",
          }}
        />
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CircularProgress size={24} />
            </Box>
          ) : (
            "Logga in"
          )}
        </Button>
        <StyledNavLink to="/signup">
          <Typography variant="body2">Har du inget konto? Skapa ett här!</Typography>
        </StyledNavLink>
      </Box>
    </Paper>
  );
}
