import { Box, Button, TableCell, TableHead, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { UserContext } from "../Context/UserContext";
import AccountMenu from "../components/AccountMenu";

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
            <Typography variant="h4" sx={{ position: "absolute" }}>
              Admin Page
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <AccountMenu />
          </Box>

          <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
            <Table sx={{ width: "100%", marginTop: "2rem" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Användare</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Behörighet</TableCell>
                  <TableCell>Radera</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.isAdmin ? "ja" : "nej"}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                      >
                        Ändra
                      </Button>{" "}
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleRemoveUser(user._id)}>
                        Ta bort{" "}
                      </Button>{" "}
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
