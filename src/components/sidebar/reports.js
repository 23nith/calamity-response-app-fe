import React, { useContext, useEffect, useState } from "react";
import { AreasContext } from "../../contexts/AreasContext";
import Modal from "../modals/modal";
import DonationsPerNeed from "../modals/modal_contents/donationsPerNeed";

function Reports() {
  const { areas } = useContext(AreasContext);
  const [report, setReport] = useState([]);
  const [showModal, setShowModal] = useState();
  const [modalType, setModalType] = useState();
  const [needID, setNeedID] = useState()

  useEffect(() => {
    fetch("http://localhost:3000/reports", {
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
        setReport(data);
        return data;
      });
  }, []);

  const renderModalType = () => {
    switch (modalType) {
      case "donations":
        return <DonationsPerNeed needID={needID}/>;
    }
  };

  return (
    <div>
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

      <div>Report</div>
      <div className="flex flex-col overflow-y-scroll overflow-x-hidden">
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
                      Area
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Calamities
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Needs
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Cost x Count
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Total Amount
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Donations
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Excess/Insufficiency
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report &&
                    report.map((item, index) => (
                      <>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.area_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                        </tr>

                        {item.calamities &&
                          item.calamities.map((calamity, index) => (
                            <>
                              <tr className="border-b">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {calamity.calamity_name}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                              </tr>

                              {calamity.needs &&
                                calamity.needs.map((need, index) => (
                                  <tr className={index + 1 == calamity.needs.length ? "border-b border-b-4" : "border-b"}>
                                  {/* <tr className="border-b"> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {/* {index} {calamity.needs.length} {index + 1 == calamity.needs.length ? "true": "false" } */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {need.description}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {need.cost} x {need.count}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {need.cost * need.count}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      <button
                                        onClick={() => {
                                          setShowModal(true);
                                          setModalType("donations");
                                          setNeedID(need.id)
                                          console.log("clicked");
                                        }}
                                      >
                                        {need.donations}
                                      </button>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      <span
                                        className={
                                          need.donations -
                                            need.cost * need.count >=
                                          0
                                            ? "text-green-600 font-bold"
                                            : "text-red-600 font-bold"
                                        }
                                      >
                                        {need.donations -
                                          need.cost * need.count}
                                      </span>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {need.donations -
                                        need.cost * need.count >=
                                      0 ? (
                                        <span className="text-green-600 font-bold">
                                          Fulfilled
                                        </span>
                                      ) : (
                                        <span className="text-red-600 font-bold">
                                          Unfulfilled
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                            </>
                          ))}
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
