import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { NeedsContext } from "../../contexts/NeedsContext";
import Modal from "../modals/modal";
import AddNeedform from "../modals/modal_contents/addNeedform";
import EditNeed from "../modals/modal_contents/editNeed";
import ShowNeed from "../modals/modal_contents/showNeed";

function Needs() {
  const { needs, setNeeds } = useContext(NeedsContext);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [needID, setNeedID] = useState("needID")

  useState(() => {
    fetch("http://localhost:3000/needs", {
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
        console.log("needs: ", data);
        setNeeds(data);
        return data;
      });
  }, []);

  const renderModalType = () => {
    switch(modalType){
      case "show": 
        return <ShowNeed needID={needID}/>;
      case "edit": 
        return <EditNeed needID={needID} setShowModal={setShowModal}/>;
      case "add": 
        return (<>Add Need<br/><AddNeedform setShowModal={setShowModal}/></>);
    }
  }

  return (
    <div className="overflow-hidden">
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          className="w-full h-screen absolute top-0 left-0 flex justify-center items-center"
          className2="w-6/12 h-4/6 bg-white drop-shadow-2xl p-3"
        >
          {renderModalType()}
        </Modal>
      )}

      <div>Needs</div>

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
                  {needs.map((need, index) => (
                    <tr className="border-b" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {need.id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {need.description}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setModalType("show");
                            setNeedID(need.id);
                          }}
                          className="mr-5"
                        >
                          Show
                        </button>
                        <button className="mr-5" onClick={() => {
                            setShowModal(true);
                            setModalType("edit");
                            setNeedID(need.id);
                          }}>Edit</button>
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
          Add Need
        </button>
      </div>
    </div>
  );
}

export default Needs;
