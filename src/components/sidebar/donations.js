import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { DonationsContext } from '../../contexts/DonationsContext';

function Donations() {
  const {donations, setDonations} = useContext(DonationsContext)

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
  
  return (
    <div className="flex flex-col overflow-y-scroll overflow-x-hidden h-5/6">
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
                            // setShowModal(true);
                            // setModalType("show");
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