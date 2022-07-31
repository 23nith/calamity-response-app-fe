import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const NeedsContext = createContext();

function NeedsContextProvider(props) {
  const [needs, setNeeds] = useState([]);

  const updateNeeds = () => {
    fetch("http://localhost:3000/needs", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res)=>{
        if(res.ok){
          return res.json()
        }else{
          throw new Error(res)
        }
      })
      .then((data)=>{
        console.log("areas data: ", data)
        setNeeds(data)
      })
  }


  return (
    <NeedsContext.Provider value={{needs, setNeeds, updateNeeds}}>
      {props.children}
    </NeedsContext.Provider>
  )
}

export default NeedsContextProvider