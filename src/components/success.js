import React from 'react'
import { useEffect } from 'react'

function Success({setShowLogin, setShowPaymentStatus}) {
  useEffect(() => {
    console.log("On mount Success page")
    setShowLogin(false)
    setShowPaymentStatus(true)
  }, [])
  
  const handleClose = () => {
    window.close()
  }

  return (
    <div className="p-7 text-2xl font-semibold flex-1">
      <div className='App'>Success</div>
      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleClose}>Close</button>
    </div>
  )
}

export default Success