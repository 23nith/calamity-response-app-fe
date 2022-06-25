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

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      #
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      First
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Last
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index)=>(
                    <tr className="border-b" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button className='mr-5'>Show</button>
                        <button className='mr-5'>Edit</button>
                        <button className='mr-5'>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        <button className='rounded-full bg-slate-300 px-5 py-1 text-base'>Add User</button>
      </div>
    </>
  )
}

export default Users