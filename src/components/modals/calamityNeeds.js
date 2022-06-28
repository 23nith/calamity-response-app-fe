import React, { useState } from 'react'
import { useEffect } from 'react'
import Modal from './modal'

function CalamityNeeds({calamityID}) {
  const [needs, setNeeds] = useState([])
  const [calamity, setCalamity] = useState()
  const [showModal, setShowModal] = useState(false)


  useEffect(() => {
    fetch("https://calamity-response-be.herokuapp.com/needs", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      let filteredNeeds = data.filter((need)=>(
        need.calamity_id == calamityID
      ))
      setNeeds(filteredNeeds)
    })

    fetch("https://calamity-response-be.herokuapp.com/calamity", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: calamityID
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("calamity: ", data)
      setCalamity(data)
    })
  }, [])

  return (
    <div className="overflow-hidden">
      CalamityNeeds
      {calamity &&
      <ul className='text-sm p-4'>
        <li>id: {calamity.id}</li>
        <li>area_id: {calamity.area_id}</li>
        <li>estimated_date_from: {calamity.estimated_date_from}</li>
        <li>estimated_date_to: {calamity.estimated_date_to}</li>
        <li>description: {calamity.description}</li>
        <li>calamity_type: {calamity.calamity_type}</li>
      </ul>}
      
      {showModal && 
        <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center'>
          <div className='w-screen absolute flex justify-center items-center'>
            <Modal
              setShowModal={setShowModal}
              showModal={showModal}

              className='w-3/6 h-screen flex justify-center items-center'
              
              className2='w-6/12 h-3/6 bg-white drop-shadow-2xl p-3'
              >
                Donation
                
              <form className="mb-0 space-y-6" action="#" method="POST" >

                <div className='flex flex-col w-full h-96 justify-around items-center'>

                  <div>
                    <label for="email" className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <div className="mt-1">
                      <input
                        id="amount"
                        name="amount"
                        type="number"
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        min="100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="company-size"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payment Method
                    </label>
                    <div className="mt-1">
                      <select name="company-size" id="company-size" className="">
                        <option value="">Please select</option>
                        <option value="GCash">GCash</option>
                        <option value="GrabPay">GrabPay</option>
                      </select>
                    </div>
                  </div>

                  <div className='flex justify-center w-full'>
                    <button
                      type="submit"
                      className="w-3/6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Proceed
                    </button>
                  </div>

                </div>

              </form>


            </Modal>
          </div>
        </div>
      }

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      #
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      First
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Last
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {needs.map((need, index)=>(
                    <tr className="border-b" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{need.id}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {need.description}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button className='mr-5' onClick={()=>{setShowModal(true)}}>Maka a donation</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalamityNeeds