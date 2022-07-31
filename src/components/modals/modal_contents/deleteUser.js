import React, { useEffect } from 'react'
import { useState } from 'react'

function DeleteUser({userID}) {
  const [user, setUser] = useState("User")

  useEffect(() => {
    fetch("http://localhost:3000/account", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: userID
      })
      
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("data: ", data);
      setUser(data)
      return data
    })
  }, [])

  const handleDelete = () => {
    fetch("http://localhost:3000/account", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: userID
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("User: ", data)
      return data
    })
    
  }
  
  return (
    <div>DeleteUser

      Are you sure you want to delete ?
      {user && 
        <>
          <ul className='text-sm p-4'>
            <li>
              id: {user.id}
            </li>
          </ul>

          <button className="rounded-full bg-slate-300 px-5 py-1 text-base" onClick={handleDelete}>Yes</button>
          <button className="rounded-full bg-slate-300 px-5 py-1 text-base">Cancel</button>
        </>
      }
    </div>
  )
}

export default DeleteUser