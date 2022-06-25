import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { UsersContext } from '../../contexts/UsersContext'

function Users() {
  const {users, setUsers} = useContext(UsersContext);
  
  useEffect(() => {
    fetch("https://calamity-response-be.herokuapp.com/accounts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("Users: ", data)
      setUsers(data)
      return data
    })
   
  }, [])
  
  return (
    <>
      <div>Users</div>
      <ul>
        {users != "" && users.map((user, index)=>(
          <li key={index}>{user.email}</li>
        ))}
      </ul>
    </>
  )
}

export default Users