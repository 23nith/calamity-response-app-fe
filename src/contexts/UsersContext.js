import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const UsersContext = createContext();

function UsersContextProvider(props) {
  const [users, setUsers] = useState([]);

  return (
    <UsersContext.Provider value={{users, setUsers}}>
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider