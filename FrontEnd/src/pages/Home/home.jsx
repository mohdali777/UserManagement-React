import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/navbar'
import Loading from '../../components/Loading/loading'
import { AppContext } from '../../context'
export default function Home() {
    
    const {LoadingState,SetLoading} = useContext(AppContext)
  return (
    <div className='relative'>
{LoadingState &&  <div className='absolute'> 
        <Loading/>
        </div>}
        <Navbar/>
    </div>
  )
}
