import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { CalamitiesContext } from '../../../contexts/CalamitiesContext'

function EditNeed({setShowModal, needID}) {
  const [need, setNeed] = useState("need")
  const [calamityID, setCalamityID] = useState()
  const [cost, setCost] = useState()
  const [count, setCount] = useState()
  const [description, setDescription] = useState()
  const {calamities, setCalamities} = useContext(CalamitiesContext)

  useEffect(() => {
    fetch("https://calamity-response-be.herokuapp.com/need", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: needID
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("Need: ", data)
      setNeed(data)
      setCalamityID(data.calamity_id)
      setCost(data.cost)
      setCount(data.count)
      setDescription(data.description)
      return data
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://calamity-response-be.herokuapp.com/edit_need", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: needID,
        need: {
          calamity_id: calamityID,
          cost: cost,
          count: count,
          description: description
        }
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("data: ", data)
      setNeed(data)
      setShowModal(false)
      return data
    })
  }
  

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="mb-0 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label for="email" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <input
                  id="description"
                  name="description"
                  type="description"
                  autocomplete="description"
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  value={description}
                  onChange={(e)=>{setDescription(e.target.value)}}
                />
              </div>
            </div>

            <div>
              <label
                for="cost"
                className="block text-sm font-medium text-gray-700"
              >
                Cost
              </label>
              <div className="mt-1">
                <input
                  id="cost"
                  name="cost"
                  type="number"
                  autocomplete="cost"
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  value={cost}
                  onChange={(e)=>{setCost(e.target.value)}}
                />
              </div>
            </div>

            <div>
              <label
                for="count"
                className="block text-sm font-medium text-gray-700"
              >
                Count
              </label>
              <div className="mt-1">
                <input
                  id="count"
                  name="count"
                  type="number"
                  autocomplete="count"
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  value={count}
                  onChange={(e)=>{setCount(e.target.value)}}
                />
              </div>
            </div>

            <div>
                <label
                  for="area"
                  className="block text-sm font-medium text-gray-700"
                >
                  Area
                </label>
                <div className="mt-1">
                  <select name="area" id="area" className="" required onChange={(e)=>{setCalamityID(e.target.value)}}>
                    <option value="" disabled>Please select</option>
                    {calamities && calamities.map((calamity, index) => (
                      <option value={calamity.id} selected={calamity.id == calamityID ? true : false }>{calamity.description}</option>
                    ))}
                  </select>
                </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign in
              </button>
            </div>
            
          </form>
        </div>
      </div>
  )
}

export default EditNeed