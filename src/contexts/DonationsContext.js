import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const DonationsContext = createContext();

function DonationsContextProvider(props) {
  const [donations, setDonations] = useState([])

  return (
    <DonationsContext.Provider value={{donations, setDonations}}>
      {props.children}
    </DonationsContext.Provider>
  )
}

export default DonationsContextProvider