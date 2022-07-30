import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { DonationsContext } from '../../contexts/DonationsContext';
import Modal from '../modals/modal';
import ShowDonation from '../modals/modal_contents/showDonation';

function Donations() {
  const {donations, setDonations} = useContext(DonationsContext)
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [donationID, setDonationID] = useState()

  useEffect(() => {
    fetch("http://localhost:3000/donations", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      setDonations(data)
      return data
    })

  }, [])

  const renderModalType = () => {
    switch (modalType) {
      case "show":
        return <ShowDonation donationID={donationID}/>;
      case "add":
        return "";
    }
  };
  
  return (
    <div className="flex flex-col overflow-y-scroll overflow-x-hidden h-5/6">
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          className="w-full h-screen absolute top-0 left-0 flex justify-center items-center"
          className2="w-6/12 h-fit bg-white drop-shadow-2xl p-3"
        >
          {renderModalType()}
        </Modal>
      )
      } 
        <div className=" sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="">
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
                      Area
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Need
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Status
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
                  {donations.map((donation, index) => 
                  {if(donation.status == true){return (
                    <tr className="border-b" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {donation.id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {donation.area}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {donation.need}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {donation.user}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {donation.status ? <span className='text-green-600 font-bold'>Paid</span> : <span className='text-red-600 font-bold'>Pending</span>}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setModalType("show");
                            setDonationID(donation.id)
                          }}
                          className="mr-5"
                        >
                          Show
                        </button>
                      </td>
                    </tr>
                  )}
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Donations