import React, { createContext, useState } from 'react'

export const AreasContext = createContext()

function AreasContextProvider(props) {
  const [areas, setAreas] = useState([])

  const updateAreas = () => {
    fetch("http://localhost:3000/areas", {
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
        setAreas(data)
      })
  }

  return (
    <AreasContext.Provider value={{updateAreas, areas, setAreas}}>
      {props.children}
    </AreasContext.Provider>
  )
}

export default AreasContextProvider