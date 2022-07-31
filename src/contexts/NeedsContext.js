import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const NeedsContext = createContext();

function NeedsContextProvider(props) {
  const [needs, setNeeds] = useState([]);

  return (
    <NeedsContext.Provider value={{needs, setNeeds}}>
      {props.children}
    </NeedsContext.Provider>
  )
}

export default NeedsContextProvider