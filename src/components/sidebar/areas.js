import React from 'react'
import { useMemo } from 'react'
import { useContext } from 'react'
import { AreasContext } from '../../contexts/AreasContext'

function Areas() {
  const {areas} = useContext(AreasContext)
   

  return (
    <>
      <div>Areas</div>
      {areas.map((area, index)=>(
        <li key={index}>
          {area.name}
        </li>
      ))}
    </>
  )
}

export default Areas