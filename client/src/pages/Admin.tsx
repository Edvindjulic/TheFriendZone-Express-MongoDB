import { Button, TableCell, TableHead, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { UserContext } from "../Context/UserContext";
import AccountMenu from "../components/AccountMenu";

export default function Admin() {
  const { user, getAllUsers, removeUser } = React.useContext(UserContext);
  const [allUsers, setAllUsers] = React.useState([]);

  const handleGetAllUsers = async () => {
    const data = await getAllUsers();
    setAllUsers(data);
  };

  const handleRemoveUser = async (userId) => {
    await removeUser(userId);
    handleGetAllUsers(); // Refresh the list of users after a user is removed
  };

  React.useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <>
      {user?.isAdmin ? (
        <>
          <AccountMenu />
          <Typography variant="h3">Admin</Typography>
          {/* <ul>
            {allUsers.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul> */}

          <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Användarnamn</TableCell>
                  <TableCell align="right">Administratörsstatus</TableCell>
                  <TableCell align="right">
                    Ändra administratörsstatus
                  </TableCell>
                  <TableCell align="right">Ta bort användare</TableCell>
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
                    <TableCell align="right">
                      {user.isAdmin.toString()}
                    </TableCell>
                    <TableCell align="right">
                      <Button type="contained"> Byt status </Button>{" "}
                    </TableCell>
                    <TableCell align="right">
                      {user._id}
                      <Button onClick={() => handleRemoveUser(user._id)}>
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
    </>
  );
}
