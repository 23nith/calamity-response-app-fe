import React, { createContext, useState } from 'react'

export const AreasContext = createContext()

function AreasContextProvider(props) {
  const [areas, setAreas] = useState([])

  return (
    <AreasContext.Provider value={{areas, setAreas}}>
      {props.children}
    </AreasContext.Provider>
  )
}

export default AreasContextProvider