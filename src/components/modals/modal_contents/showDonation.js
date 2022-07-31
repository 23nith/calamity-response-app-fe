import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function ShowDonation({donationID}) {
  const [donation, setDonation] = useState("donation")

  useEffect(() => {
    fetch("http://localhost:3000/donation", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: donationID
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("DONATION data", data)
      setDonation(data)
      return(data)
    })
    
  }, [])
  
  return (
    <>
      <div>ShowDonation</div>
      {donation && 
        <ul className='text-sm p-4'>
          <li>
            id: {donation.id}
          </li>
          <li>
            user_id: {donation.user_id}
          </li>
          <li>
            need_id: {donation.need_id}
          </li>
          <li>
            amount: {donation.amount}
          </li>
          <li>
            created_at: {donation.created_at}
          </li>
          <li>
            payment_type: {donation.payment_type}
          </li>
        </ul>
      }
    </>
  )
}

export default ShowDonation