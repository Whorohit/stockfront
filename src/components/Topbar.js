import React, { useState, useEffect } from 'react'
import { BsBellFill } from 'react-icons/bs'
import { FaPowerOff } from 'react-icons/fa'
import { Navbar } from 'rsuite'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { IoIosCloseCircle } from 'react-icons/io'
import { CgProfile } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";

function Topbar() {
  function subtractMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() - minutes);
    const resultMinutes = date.getMinutes();
    return resultMinutes;
  }
  const [duration, setDuration] = useState({ minute: 30, second: 0 })
  const navigate = useNavigate();
  const [showoption, setShowoption] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      const expt = localStorage.getItem('time').toString();
      const exptime = new Date(expt)
      const currentime=new Date()
      
      if(currentime>exptime)
      {
        navigate('/login')
        localStorage.clear();
      }
      if(currentime<exptime)
      {
        let newMinutes = subtractMinutes(exptime,currentime.getMinutes());
      let newSeconds = exptime.getSeconds() - currentime.getSeconds();

      // Adjust minutes and seconds if seconds go negative
      if (newSeconds < 0) {
        newMinutes -= 1;
        newSeconds += 60;
      }

      // Ensure minutes is non-negative
      newMinutes = newMinutes

      // Ensure seconds is non-negative
      newSeconds = Math.max(newSeconds, 0);

      setDuration({ minute: newMinutes, second: newSeconds });

      }
     
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);
  return (
    <>
      <div className='bg-transparent    items-center gap-x-2        flex justify-end     '>
        <h1 className='text-bold  text-xl  px-3 py-3    '>{duration.minute.toString().padStart(2, "0")}:{duration.second.toString().padStart(2, "0")} </h1>
        <div className='flex  gap-x-1 md:gap-x-3  relative items-center'>
          <h1 className='flex  justify-between  gap-x-2 items-center pr-2 py-3  capitalize text-md  font-bold tracking-wide  '
            onClick={() => {
              setShowoption(!showoption)
            }} > {localStorage.getItem('userprofile') ? <img src={localStorage.getItem('userprofile')} alt=""  className='w-[2rem] h-[2rem]  rounded-full'/> : <CgProfile size={"25px"} className='bg-white rounded-full ' />}
          </h1>
          {
            showoption && <div className='absolute transition-all delay-150  z-[21] w-20 top-10  right-9 text-center text-xs drop-shadow-md bg-white '>
              <h1 className='py-1 px-2 hover:text-indigo-600 focus:scale-100 hover:bg-gray-200 ' >Change password</h1>
              <h1 className='py-1 px-2 hover:text-indigo-600 focus:scale-100 hover:bg-gray-200'
                onClick={() => {
                  localStorage.clear();
                  navigate('/login')
                }}>LogOut</h1>
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default Topbar