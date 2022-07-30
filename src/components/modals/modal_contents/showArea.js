import React, { useEffect } from 'react'
import { useState } from 'react'

function ShowArea({areaID}) {
  const [area, setArea] = useState()

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
      console.log("Need: ", data)
      setArea(data)
      return data
    })
  }, [])
  

  return (
    <>
      <div>ShowArea</div>
      {area && 
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
          <li>
            longitude: {area.longitude}
          </li>
          <li>
            latitude: {area.latitude}
          </li>
          <li>
            radius: {area.radius}
          </li>
        </ul>
      }
    </>
  )
}

export default ShowArea