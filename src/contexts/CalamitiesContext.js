import React, { createContext, useState } from 'react'

export const CalamitiesContext = createContext();

function CalamitiesContextProvider(props) {
  const [calamities, setCalamities] = useState([]);

  const updateCalamities = () => {
    fetch("http://localhost:3000/calamities", {
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
        setCalamities(data)
      })
  }


  return (
    <CalamitiesContext.Provider value={{calamities, setCalamities, updateCalamities}}>
      {props.children}
    </CalamitiesContext.Provider>
  )
}

export default CalamitiesContextProvider