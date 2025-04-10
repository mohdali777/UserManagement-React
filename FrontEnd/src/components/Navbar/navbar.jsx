import React from 'react'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Navbar() {
    const Navigate = useNavigate()
    const iconstate = useSelector((state)=> state.icon.iconState)
    function ToProfile(){
            Navigate('/profile')       
    } 
  return (
    <div className='w-full flex justify-between py-3 px-10 bg-gray-100 shadow'>
      <div className='w-full'>
        <img src={logo} className='w-[68px] h-[68px]' alt="" />
      </div>
      {iconstate === 'Home' &&<div className='w-full flex justify-end items-center relative'>
      <FontAwesomeIcon icon={faUserCircle} onClick={ToProfile} className="text-[25px] text-gray-500" />
     </div>}
    </div>
  )
}
