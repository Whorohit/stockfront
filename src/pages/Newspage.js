import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NewsTopic from '../components/NewsTopic'
import News from '../components/News'
import { getwatchlist, setResponseToast, setTabKey } from '../stores'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Toastbox from '../components/toastbox'
import { toast, ToastContainer } from 'react-toastify'
import { getkeys } from '../stores/apikeyslice'

function Newspage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const topic = useState("all")
    const newsKey = useSelector((state) => state.apikey.newskey);
    useEffect(() => {
        dispatch(setTabKey({ item: 'news' }));
        // if (!newsKey) {
        //     toast.error("Please provide  login to news website and  provide  new api key", {
        //         position: 'top-right',
        //         className: `font-bold text-xl`,
        //         autoClose: 3000,
        //         style: {
        //             backgroundColor: 'white',
        //             color: 'rgb(92, 92, 92)',
        //             fontSize: '10px',
        //         },
        //     })
        // }
    }, [dispatch]);



    useEffect(() => {
        dispatch(getwatchlist())
            .then((action) => {
                if (action.payload.success === false && action.payload.error == 'Please authenticate using a valid token') {
                    navigate('/login')
                }
            })


    }, [])

    return (
        <>
            
            <div className='bg-gray-200  min-h-screen  ' >
                <Navbar className=' z-20 ' />
                <div className={`p-4 sm:ml-64   z-0 md:left-[300px]   left-0  bg-gray-200   top-16 md:top-0  w-full md:w-3/4 xl:w-4/5  `} >
                    <div className='my-8  flex-wrap  '>
                        <NewsTopic topic={topic} />
                    </div>
                    <div className='  mx-auto my-4  w-full h-1/2'>
                        <News />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Newspage