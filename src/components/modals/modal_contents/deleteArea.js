import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function DeleteArea({areaID}) {
  const [area, setArea] = useState("area")

  useEffect(() => {
    fetch("http://localhost:3000/area", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: areaID
      })
      
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("data: ", data);
      setArea(data)
      return data
    })
  }, [])
  
  const handleDelete = () => {
    fetch("http://localhost:3000/area", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: areaID
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("Area: ", data)
      return data
    })
    
  }

  return (
    <div>
      Are you sure you want to delete?
      {area && 
        <>
          <ul className='text-sm p-4'>
            <li>
              id: {area.id}
            </li>
            <li>
              address: {area.address}
            </li>
            <li>
              name: {area.name}
            </li>
          </ul>

          <button className="rounded-full bg-slate-300 px-5 py-1 text-base" onClick={handleDelete}>Yes</button>
          <button className="rounded-full bg-slate-300 px-5 py-1 text-base">Cancel</button>
        </>
      }
    </div>
  )
}

export default DeleteArea