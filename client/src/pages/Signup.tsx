import { Box, Typography } from "@mui/material";
import SignUp from "../components/SignUp";


export default function SignUpForm() {
  return (
    <Box sx={{
      marginTop: '2rem',
    }}>
        <Typography variant="h4" sx={{
            textAlign: "center",
            marginBottom: '1rem'
        }}>Skapa konto</Typography>
        <SignUp/>
    </Box>
    );
}

