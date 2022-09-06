import { useState, createContext, useEffect } from "react";

import Form from "../../components/form";
import Table from "../../components/table";

const getLocalStorage = () => {
  let users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(localStorage.getItem("users"));
  } else {
    return [];
  }
};

export const Context = createContext({ value: null, setValue: () => {} });

const UserList = () => {
  const [users, setUsers] = useState(getLocalStorage);
  const [userData, setUserData] = useState([]);
  const [value, setValue] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  console.log("users", users);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const ReceiveDataFromChild = (action = undefined, data) => {
    if (action === "edit") {
      let index = users.findIndex((e) => e.key === data.key);
      console.log(`data from child- `, data, action, index, users);
      if (index !== -1) {
        users[index] = { ...data };
        setUsers([...users]);
        setUserData([...users]);
      }
    } else {
      setUsers([...users, data]);
      setUserData([...users, data]);
    }
  };

  const ReceiveDeleteRequestFromChild = (item) => {
    setUsers((prevState) => prevState.filter((v) => v.key !== item.key));
  };

  const handleSearch = (v) => {
    setSearchInput(v);
    if (searchInput !== "") {
      if(typeof(v) == "string"){
      const filteredData = userData.filter((value) => {
        return value.department.toLowerCase().includes(v.toLowerCase());
      });
      setUsers(filteredData);} else if(typeof(v) == "number"){
        const filteredData = userData.filter((value) => {
          return value.salary.toLowerCase().includes(v.toLowerCase());
        });
        setUsers(filteredData);}
      }
    else {
      setUsers(users);
    }
  };

  return (
    <div className="container">
      <Context.Provider value={{ value, setValue }}>
        <Form cb={ReceiveDataFromChild} cb2={handleSearch} />
        <Table UserArray={users} cb={ReceiveDeleteRequestFromChild} />
      </Context.Provider>
    </div>
  );
};

export default UserList;
