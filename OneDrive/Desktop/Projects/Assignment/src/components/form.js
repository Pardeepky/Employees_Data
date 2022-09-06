import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { Context } from "../pages/users/UserList";
import { GenerateAlphaNumericKey } from "../common/utility";
import { ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";

let init = {
  name: "",
  department: "",
  salary: "",
};
const Forms = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [userData, setUserData] = useState({ ...init });

  const {
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      test: "",
    },
    mode: "onBlur",
  });
  const { value: userdata, setValue: setuserdata } = useContext(Context);

  useEffect(() => {
    if (!userdata) return;
    console.log("edit request", userdata);
    setUserData({
      name: userdata.name,
      department: userdata.department,
      salary: userdata.salary,
    });
    openModal();
  }, [userdata]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(`name- ${name} | value- ${value}`);
    setUserData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const onSubmit = (form, evt) => {
    evt.preventDefault();
    if (props.cb) {
      props.cb(userdata && userdata.key ? "edit" : "add", {
        ...userData,
        key: (userdata && userdata.key) || GenerateAlphaNumericKey(),
      });

      closeModal();
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setUserData({
      ...init,
    });
    setuserdata(null);
  };

  const handleSearch = (v) => {
    props.cb2(v);
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        style={{ float: "left" }}
        onClick={openModal}
      >
        Add
      </button>
      <span style={{ float: "right" }}>
        Search Department
        <input
          onChange={(e) => handleSearch(e.target.value)}
        />
      </span>
      <Modal
        style={{
          content: {
            color: "White",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#317d5b",
          },
        }}
        ariaHideApp={false}
        isOpen={modalIsOpen}
      >
        <ModalHeader>
          {userdata && userdata.key ? "Edit" : "Add"}
          <span style={{ float: "right" }}>
            <i className="hand" onClick={closeModal}>
              <FaTimes />
            </i>
          </span>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>
                Employees Name
                <input
                  placeholder="Name"
                  name="name"
                  className="form-control"
                  key={userData.key}
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Department
                <input
                  placeholder="Enter Department"
                  name="department"
                  className="form-control"
                  value={userData.department}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Salary
                <input
                  placeholder="Enter Salary"
                  name="salary"
                  type="number"
                  className="form-control"
                  value={userData.salary}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <ModalFooter>
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </ModalFooter>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Forms;
