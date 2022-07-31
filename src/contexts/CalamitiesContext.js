import React, { createContext, useState } from 'react'

export const CalamitiesContext = createContext();

function CalamitiesContextProvider(props) {
  const [calamities, setCalamities] = useState([]);

  return (
    <CalamitiesContext.Provider value={{calamities, setCalamities}}>
      {props.children}
    </CalamitiesContext.Provider>
  )
}

export default CalamitiesContextProvider