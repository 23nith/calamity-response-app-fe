import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function ShowUser({userID}) {
  const [user, setUser] = useState("user")

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

  return (
    <>
      <div>ShowArea</div>
      {user && 
        <ul className='text-sm p-4'>
          <li>
            id: {user.id}
          </li>
          <li>
            email: {user.email}
          </li>
          <li>
            area_id: {user.area_id}
          </li>
          <li>
            address: {user.address}
          </li>
          <li>
            first_name: {user.first_name}
          </li>
          <li>
            last_name: {user.last_name}
          </li>
          <li>
            role: {user.role}
          </li>
          
        </ul>
      }
    </>
  )
}

export default ShowUser