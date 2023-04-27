import {
  Box,
  Button,
  TableCell,
  TableHead,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { UserContext } from "../Context/UserContext";
import AccountMenu from "../components/AccountMenu";
import { theme } from "../components/theme";

export default function Admin() {
  const { user, removeUser, changeAdmin, allUsers, getAllUsers, setAllUsers } =
    React.useContext(UserContext);

  const handleRemoveUser = async (userId: string) => {
    await removeUser(userId);
    await getAllUsers();
  };

  const handleToggleAdmin = async (userId: string, isAdmin: boolean) => {
    const newIsAdmin = !isAdmin;
    await changeAdmin(userId, newIsAdmin);
    await getAllUsers();
  };

  React.useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };
    fetchAllUsers();
  }, [getAllUsers, setAllUsers]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {user?.isAdmin ? (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "primary.main",
              marginBottom: "2rem",
            }}
          >
            <Box sx={{ flexGrow: 3 }} />
            <Typography variant="h5" sx={{ position: "absolute" }}>
              Adminsida
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <AccountMenu />
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: 330,
              maxWidth: 800,
              marginBottom: "2rem",
            }}
          >
            <Table
              aria-label="simple table"
              size="small"
              padding={isSmallScreen ? "none" : "normal"}
            >
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "secondary.main",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{ typography: "h7", color: "secondary.contrastText" }}
                  >
                    Användare
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ typography: "h7", color: "secondary.contrastText" }}
                  >
                    Admin
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ typography: "h7", color: "secondary.contrastText" }}
                  >
                    Behörighet
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ typography: "h7", color: "secondary.contrastText" }}
                  >
                    Radera
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {user.username}
                    </TableCell>
                    <TableCell align="center">
                      {user.isAdmin ? "ja" : "nej"}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleToggleAdmin(user._id, user.isAdmin)
                        }
                      >
                        Ändra
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemoveUser(user._id)}
                      >
                        Ta bort
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant="h3">Du är inte administratör</Typography>
      )}
    </Box>
  );
}
