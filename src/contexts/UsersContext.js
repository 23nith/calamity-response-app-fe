import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const UsersContext = createContext();

function UsersContextProvider(props) {
  const [users, setUsers] = useState([]);

  const updateUsers = () => {
    fetch("http://localhost:3000/accounts", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
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
        setUsers(data)
      })
  }

  return (
    <UsersContext.Provider value={{updateUsers, users, setUsers}}>
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider