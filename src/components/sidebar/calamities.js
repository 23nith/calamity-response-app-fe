import React, { useContext, useState } from 'react'
import { CalamitiesContext } from '../../contexts/CalamitiesContext'

function Calamities() {
  const {calamities, setCalamities} = useContext(CalamitiesContext)

  useState(()=>{
    fetch("https://calamity-response-be.herokuapp.com/calamities", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log("calamities: ", data)
      setCalamities(data)
      return data
    })

  }, [])

  return (
    <>
      <div>Calamities</div>
      <ul>
      {calamities.map((calamity, index)=>(
        <li>
          {calamity.calamity_type} {calamity.description}
        </li>
      ))}
      </ul>
    </>
  )
}

export default Calamities