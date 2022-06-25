import React from 'react'

function Modal(props) {
  const handleToggleModal = () => {
    props.setShowModal(!props.showModal)
  }

  const stopBubbling = (e) => {
    e.stopPropagation()
  }

  return (
    <div onClick={handleToggleModal}
     className='w-full h-screen absolute top-0 left-0 flex justify-center items-center'>
      <div onClick={stopBubbling} className='w-6/12 h-3/6 bg-white drop-shadow-2xl p-3'>
        {props.children}
      </div>
    </div>
  )
}

export default Modal