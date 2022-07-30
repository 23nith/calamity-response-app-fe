import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function ShowNeed({needID}) {
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
  
  return (
    <>
      <div>ShowNeed</div>
      {need && 
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
      }
    </>
  )
}

export default ShowNeed