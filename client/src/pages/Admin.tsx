import { Typography } from "@mui/material";
import React from "react";
import { UserContext } from "../Context/UserContext";
import AccountMenu from "../components/AccountMenu";

export default function Admin() {
  const { user, getAllUsers } = React.useContext(UserContext);
  const [allUsers, setAllUsers] = React.useState([]);

  const handleGetAllUsers = async () => {
    const data = await getAllUsers();
    console.log(data); // Add this line to check the data format
    setAllUsers(data);
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
          {/* Render the list of users */}
          <ul>
            {allUsers.map((user) => (
              <li key={user._id}>{user.username}</li> // Make sure 'id' and 'name' properties exist in the User interface
            ))}
          </ul>
        </>
      ) : (
        <Typography variant="h3">Du är inte administratör</Typography>
      )}
    </>
  );
}
