import React, { useContext, useState } from "react";
import { CalamitiesContext } from "../../contexts/CalamitiesContext";
import AddCalamityForm from "../modals/modal_contents/addCalamityForm";
import CalamityNeeds from "../modals/modal_contents/calamityNeeds";
import Modal from "../modals/modal";

function Calamities() {
  const { calamities, setCalamities } = useContext(CalamitiesContext);
  const [showModal, setShowModal] = useState(false);
  const [calamityID, setCalamityID] = useState();
  const [modalType, setModalType] = useState();

  useState(() => {
    fetch("http://localhost:3000/calamities", {
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
        console.log("calamities: ", data);
        setCalamities(data);
        return data;
      });
  }, []);

  const renderModalType = () => {
    switch (modalType) {
      case "add":
        return <AddCalamityForm />;
      case "edit":
        return "Edit Calamity";
      case "show":
        return <CalamityNeeds calamityID={calamityID}/>;
    }
  };

  return (
    <div className="overflow-hidden">
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          className="w-full h-screen absolute top-0 left-0 flex justify-center items-center"
          className2="w-6/12 h-3/6 bg-white drop-shadow-2xl p-3"
        >
          {renderModalType()}
        </Modal>
      )}
      <div>Calamities</div>

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
                      First
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Last
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
                  {calamities.map((calamity, index) => (
                    <tr className="border-b" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {calamity.id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {calamity.calamity_type}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {calamity.description}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button
                          className="mr-5"
                          onClick={() => {
                            setCalamityID(calamity.id);
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
          Add Calamity
        </button>
      </div>
    </div>
  );
}

export default Calamities;
