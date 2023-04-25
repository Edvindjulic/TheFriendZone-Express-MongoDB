import { Box, Button, Paper, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

interface SigninValues {
  username: string;
  password: string;
}

export default function SignInForm() {
  const { setUser } = useContext(UserContext);
  const formik = useFormik<SigninValues>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values: SigninValues) => {
      try {
        const response = await fetch("/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log("Login successful, user:", data); //endast för att visa vilken användare som sparas i contexten
        } else {
          const message = await response.text();
          throw new Error(message);
        }
      } catch (error) {
        console.error("Error logging in user:", error);
      }
    },
  });

  const StyledNavLink = styled(NavLink)({
    textDecoration: "none",
    color: "black"
  });

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
          sx={{
            backgroundColor: "white"
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
            formik.touched.password && Boolean(formik.errors.password)
          }
          helperText={
            formik.touched.password && formik.errors.password
          }
          sx={{
            backgroundColor: "white"
          }}
        />
        <Button color="secondary" type="submit" variant="contained">
          Logga in
        </Button>
        <StyledNavLink to="/signup">Har du inget konto? Skapa ett här!</StyledNavLink>
      </Box>
    </Paper>
  );
}