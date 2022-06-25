import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import { NeedsContext } from '../../contexts/NeedsContext';

function Needs() {
  const {needs, setNeeds} = useContext(NeedsContext);

  useState(()=>{
    fetch("https://calamity-response-be.herokuapp.com/needs", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log("needs: ", data)
      setNeeds(data);
      return data
    })
  }, [])

  return (
    <>
      <div>Needs</div>

      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="border-b bg-gray-50">
                  <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      #
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      First
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Last
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {needs.map((need, index)=>(
                    <tr class="border-b" key={index}>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {need.description}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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
        <button className='rounded-full bg-slate-300 px-5 py-1 text-base'>Add Need</button>
      </div>
    </>
  )
}

export default Needs