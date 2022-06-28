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
    //  className='w-full h-screen absolute top-0 left-0 flex justify-center items-center'>
     className={props.className}>
      <div onClick={stopBubbling} className={props.className2}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal