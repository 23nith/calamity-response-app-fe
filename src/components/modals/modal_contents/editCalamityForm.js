import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AreasContext } from '../../../contexts/AreasContext';

function EditCalamityForm({calamityID, setShowModal}) {
  const {areas, setAreas} = useContext(AreasContext);
  const [description, setDescription] = useState()
  const [dateFrom, setDateFrom] = useState()
  const [dateTo, setDateTo] = useState()
  const [calamityType, setCalamityType] = useState()
  const [areaID, setAreaID] = useState()

  useEffect(() => {
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
      console.log("calamity to edit: ", data)
      setDescription(data.description)
      setDateFrom(data.estimated_date_from)
      setDateTo(data.estimated_date_to)
      setCalamityType(data.calamity_type)
      setAreaID(data.area_id)
      return data
    })
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://calamity-response-be.herokuapp.com/edit_calamity", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: calamityID,
        calamity: {
          estimated_date_from: dateFrom,
          estimated_date_to: dateTo,
          description: description,
          calamity_type: calamityType,
          area_id: areaID
        }
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      setShowModal(false);
      return data;
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
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
              />
            </div>
          </div>

          <div>
            <label
              for="calamity_type"
              className="block text-sm font-medium text-gray-700"
            >
              Calamity Type
            </label>
            <div className="mt-1">
              <input
                id="calamity_type"
                name="calamity_type"
                type="text"
                autocomplete="calamity_type"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={calamityType}
                onChange={(e)=>{setCalamityType(e.target.value)}}
              />
            </div>
          </div>

          <div>
            <label
              for="estimated_date_from"
              className="block text-sm font-medium text-gray-700"
            >
              Date From
            </label>
            <div className="mt-1">
              <input
                id="estimated_date_from"
                name="estimated_date_from"
                type="date"
                autocomplete="estimated_date_from"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={dateFrom}
                onChange={(e)=>{setDateFrom(e.target.value)}}
              />
            </div>
          </div>

          <div>
            <label
              for="estimated_date_to"
              className="block text-sm font-medium text-gray-700"
            >
              Date From
            </label>
            <div className="mt-1">
              <input
                id="estimated_date_to"
                name="estimated_date_to"
                type="date"
                autocomplete="estimated_date_to"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={dateTo}
                onChange={(e)=>{setDateTo(e.target.value)}}
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
                <select name="area" id="area" className="" required onChange={(e)=>{setAreaID(e.target.value)}}>
                  <option value="" disabled>Please select</option>
                  {areas && areas.map((area, index) => (
                    <option value={area.id} selected={area.id == areaID ? true : false }>{area.name}</option>
                  ))}
                </select>
              </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default EditCalamityForm