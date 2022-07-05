import React from 'react'
import { useEffect } from 'react'

function Failed({setShowLogin, setShowPaymentStatus}) {
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
      <div className='App'>Failed</div>
      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={handleClose}>Close</button>
    </div>
  )
}

export default Failed