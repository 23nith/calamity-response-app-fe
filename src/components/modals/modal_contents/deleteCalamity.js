import React, { useEffect } from 'react'
import { useState } from 'react'

function DeleteCalamity({calamityID}) {
  const [calamity, setCalamity] = useState()

  useEffect(() => {
    fetch("http://localhost:3000/calamity", {
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
      console.log("data: ", data);
      setCalamity(data)
      return data
    })
  }, [])

  const handleDelete = () => {
    fetch("http://localhost:3000/calamity", {
      method: "delete",
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
      console.log("Calamity: ", data)
      return data
    })
  }
  

  return (
    <>
      <div>
        Are you sure you want to delete?
        {calamity && 
          <>
            <ul className='text-sm p-4'>
              <li>
                id: {calamity.id}  
              </li>    
              <li>
                area_id: {calamity.area_id}  
              </li>    
              <li>
                estimated_date_from: {calamity.estimated_date_from}  
              </li>    
              <li>
                estimated_date_to: {calamity.estimated_date_to}  
              </li>    
              <li>
                description: {calamity.description}  
              </li>    
              <li>
                calamity_type: {calamity.calamity_type}  
              </li>    
              <li>
                create_at: {calamity.create_at}  
              </li>    
            </ul>

            <button className="rounded-full bg-slate-300 px-5 py-1 text-base" onClick={handleDelete}>Yes</button>
            <button className="rounded-full bg-slate-300 px-5 py-1 text-base">Cancel</button>
          </>
        }
      </div>
    </>
  )
}

export default DeleteCalamity