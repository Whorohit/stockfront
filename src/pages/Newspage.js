import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import NewsTopic from '../components/NewsTopic'
import News from '../components/News'
import { getwatchlist, setTabKey } from '../stores'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Newspage() {
    const navigate=useNavigate()
     const dispatch=useDispatch()
    useEffect(() => {
        dispatch(setTabKey({item:'news'})) 
      
      }, [])
      useEffect(() => {
        dispatch(getwatchlist())
        .then((action)=>{
           if(action.payload.success=== false && action.payload.error=='Please authenticate using a valid token')
           {
            navigate('/login')
           }
        })
    
       
      }, [ ])
    
    return (
        <div className='bg-gray-200 min-h-screen' >
            <Navbar className=' z-20 ' />
            <div className={`absolute   z-0 md:left-[300px]   left-0  bg-gray-200   top-16 md:top-0  w-full md:w-3/4 xl:w-4/5  `} >
                <div className='my-8        flex-wrap         '>
                    <NewsTopic />
                </div>
                <div className='  mx-auto my-4  w-full h-1/2'>
                    <News />
                </div>
            </div>
        </div>
    )
}

export default Newspage