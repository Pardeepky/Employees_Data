import React, { useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Context } from "../pages/users/UserList";

const Tables = (props) => {
  const { setValue } = useContext(Context);

  const editItem = (item) => {
    setValue(item);
  };

  const removeItem = (item) => {
    props.cb({ key: item.key });
  };

  return (
    <>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employees Name</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>

          <tbody>
            {props.UserArray.map((user) => {
              return (
                <tr key={user.key}>
                  <td>{user.name}</td>
                  <td>{user.department}</td>
                  <td>{user.salary}</td>
                  <td>
                    <FaEdit className="hand" onClick={() => editItem(user)} />
                  </td>
                  <td>
                    <FaTrash onClick={() => removeItem(user)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Tables;
