import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/navbar'
import Loading from '../../components/Loading/loading'
import { useDispatch, useSelector } from 'react-redux'
import { changeStateHome } from '../../redux/Slices/iconReducer'
export default function Home() {
    const dispatch = useDispatch()
    const iconstate = useSelector((state)=> state.icon.iconState)
    useEffect(()=>{
     dispatch(changeStateHome())
     console.log(iconstate);
     console.log("Dispatched: changeStateHome");
    },[])
  return (
    <div className='relative'>
        <Navbar/>
    </div>
  )
}
