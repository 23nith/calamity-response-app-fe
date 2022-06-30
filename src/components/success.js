import React from 'react'
import { useEffect } from 'react'

function Success({setShowLogin}) {
  useEffect(() => {
    console.log("On mount Success page")
    setShowLogin(false)
  }, [])
  
  return (
    <div className="p-7 text-2xl font-semibold flex-1">
      <div className='App'>Success</div>
    </div>
  )
}

export default Success