import React, { useEffect } from 'react'
import { useState } from 'react'

function DeleteNeed({needID}) {
  const [need, setNeed] = useState("need")

  useEffect(() => {
    fetch("http://localhost:3000/need", {
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
      console.log("data: ", data);
      setNeed(data)
      return data
    })
  }, [])

  const handleDelete = () => {
    fetch("http://localhost:3000/need", {
      method: "delete",
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
      return data
    })
    
  }
  
  return (
    <div>DeleteNeed

      Are you sure you want to delete 
      {need && 
        <>
          <ul className='text-sm p-4'>
            <li>
              id: {need.id}
            </li>
            <li>
              cost: {need.cost}
            </li>
            <li>
              count: {need.count}
            </li>
            <li>
              total cost: {need.cost * need.count}
            </li>
          </ul>

          <button className="rounded-full bg-slate-300 px-5 py-1 text-base" onClick={handleDelete}>Yes</button>
          <button className="rounded-full bg-slate-300 px-5 py-1 text-base">Cancel</button>
        </>
      }
    </div>
  )
}

export default DeleteNeed