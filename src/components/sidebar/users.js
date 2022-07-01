import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import Modal from "../modals/modal";
import Sign_up from "../sign_up";

function Users() {
  const { users, setUsers } = useContext(UsersContext);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/accounts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Users: ", data);
        setUsers(data);
        return data;
      });
  }, []);

  const renderModalType = () => {
    switch (modalType) {
      case "add":
        return <Sign_up
        className="flex w-full h-full justify-center items-center text-sm"
        className2="basis-4/12"
        className3="basis-6/12 justify-start items-center flex pl-20"
        showBackBtn={false}
      />;
      case "show":
        return "Show User";
      case "edit":
        return "Edit User";
    }
  };

  return (
    <div className="overflow-hidden">
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center"
          className2="w-8/12 h-5/6 bg-white drop-shadow-2xl p-3"
        >
          {renderModalType()}
          
        </Modal>
      )}
      <div>Users</div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user, index) => (
                      <tr className="border-b" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.first_name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.last_name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            className="mr-5"
                            onClick={() => {
                              setShowModal(true);
                              setModalType("show");
                            }}
                          >
                            Show
                          </button>
                          <button
                            className="mr-5"
                            onClick={() => {
                              setShowModal(true);
                              setModalType("edit");
                            }}
                          >
                            Edit
                          </button>
                          <button className="mr-5">Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <button
          onClick={() => {
            setShowModal(true);
            setModalType("add");
          }}
          className="rounded-full bg-slate-300 px-5 py-1 text-base"
        >
          Add User
        </button>
      </div>
    </div>
  );
}

export default Users;
