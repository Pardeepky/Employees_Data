import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./pages/users/UserList";

const App = () => {
  return (
    <>
      <div className="style">
        <h1>Employees Data</h1>
        <hr />
        <UserList />
      </div>
    </>
  );
};

export default App;
