import React, { useContext } from 'react'
import { BiUserCircle } from "react-icons/bi";
import { UserContext } from '../contexts/UserContext';

function Navbar() {
  const {currentUser} = useContext(UserContext)
  return (
    <div className="border-b-2 border-b-grey flex flex-row justify-end">
      <div className="px-5 py-2 flex flex-row">
        <div className="flex flex-col justify-end text-dark-grey">
          <div className="text-md text-end">{currentUser.first_name}</div>
          <div className="text-sm text-end">account settings</div>
        </div>

        <BiUserCircle
          className="flex justify-items-center items-center ml-2 text-dark-grey"
          size={52}
        />
      </div>
    </div>
  )
}

export default Navbar