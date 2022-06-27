import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AreasContext } from "../../contexts/AreasContext";
import AddAreaForm from "../modals/addAreaForm";
import Modal from "../modals/modal";

function Areas() {
  const { areas } = useContext(AreasContext);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  
  const renderModalType = () => {
    switch (modalType) {
      case "show":
        return "Show Area";
      case "edit":
        return "Edit Area";
      case "add":
        return <AddAreaForm
        className="flex w-full h-full justify-center items-center text-sm"
        className2="basis-4/12"
        className3="basis-6/12 justify-start items-center flex pl-20"
        showBackBtn={false}
      />;
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
      <div>Areas</div>

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
                  {areas.map((area, index) => (
                    <tr className="border-b" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {area.id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {area.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {}
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
          className="rounded-full bg-slate-300 px-5 py-1 text-base"
          onClick={() => {
            setShowModal(true);
            setModalType("add");
          }}
        >
          Add Area
        </button>
      </div>
    </div>
  );
}

export default Areas;
