import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import { NeedsContext } from '../../contexts/NeedsContext';

function Needs() {
  const {needs, setNeeds} = useContext(NeedsContext);

  useState(()=>{
    fetch("https://calamity-response-be.herokuapp.com/needs", {
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
      console.log("needs: ", data)
      setNeeds(data);
      return data
    })
  }, [])

  return (
    <>
      <div>Needs</div>
      <ul>
        {needs.map((need, index)=>(
          <li>{need.description}</li>
        ))}
      </ul>
    </>
  )
}

export default Needs