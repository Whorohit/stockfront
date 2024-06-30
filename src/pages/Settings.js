import React, { memo, useCallback, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { IoCall, IoCallOutline } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { FaBirthdayCake, FaLocationArrow } from 'react-icons/fa';
import { IoIosBusiness } from 'react-icons/io';
import { TbMapPinCode } from "react-icons/tb";
import { SlUser } from "react-icons/sl";
import { getuserinfo, setTabKey, updateuserpersonalinfo } from '../stores';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Toastbox from '../components/toastbox';
import { BsNewspaper } from 'react-icons/bs';

function Settings() {
  const dispatch = useDispatch();
  const [userview, setuserbview] = useState("general")
  const [image, setImage] = useState(null)
  const [userdta, setuserdta] = useState({
    _id: "",
    firstname: "",
    email: "",
    address2: "",
    date: "",
    address: "",
    business: "",
    dob: "",
    lastname: "",
    mobile: "",
    pincode: "",
    userprofile:"",
    newsapi:"",
    stockapi:"",
  })
  const handleImageChange = useCallback((event) => {
    let reader = new FileReader();
   let a=   reader.readAsDataURL(event.target.files[0]);
    console.log(a);
    reader.onload = () => {
      setImage(reader.result);
      setuserdta(prev => ({ ...prev, userprofile: reader.result }));
    };
    reader.onerror = error => {
      console.log(error);
    };
  }, []);

  const ondtachange=(event)=>{
  setuserdta({...userdta, [event.target.name]: event.target.value})
  }
  const userinfo = useCallback(async () => {
    const dta = await dispatch(getuserinfo());
    if (dta.payload.user) {
      setuserdta(dta.payload.user);
    }
  }, [dispatch]);
  const updateinfo = useCallback(async () => {
   
    await dispatch(updateuserpersonalinfo({ userinfo: userdta }));
  }, [dispatch,userdta]);
  
  useEffect(() => {
    dispatch(setTabKey({ item: 'settings' }))
    userinfo()
  }, [])
   

  const memoizedUserProfile = useMemo(() => {
    return userdta.userprofile ? (
      <img src={userdta.userprofile} alt="Selected Image" className='rounded-full w-[7rem] h-[7rem]' />
    ) : (
      <SlUser size={'60px'} />
    );
  }, [userdta.userprofile]);

  return (
    <>
    <Toastbox/>
    <div className='bg-gray-200  min-h-screen ' >
      <Navbar className=' z-20 ' />
      <div className={`p-4 sm:ml-64  `} >
        <div className='my-3  left-0     top-16 md:top-0   flex-wrap         '>
          <div className=' md:w-4/5 w-full h-full   my-3  bg-white overflow-x-auto mx-auto p-6  rounded-lg'>
            <h1 className='text-center font-bold text-2xl '>User Info</h1>
            <div className='flex  justify-start my-4   gap-2 '>
              <button className='text-base  border-black border p-1  text-left  rounded-md  font-bold hover:bg-gray-200 focus:bg-gray-200  focus:scale-105 '>General</button>
              <button className='text-base  border-black border p-1  text-left  rounded-md  font-bold  hover:bg-gray-200 focus:bg-gray-200  focus:scale-105 '>Advanced</button>
            </div>
            <h1 className='text-black text-sm  w-[95%] mx-auto  '>Setup your  profile info</h1>
            <div className='flex justify-center   flex-col-reverse   md:flex-row ' >
              <div className='md:w-1/2'>
              {
                userview==="general"?<>
                 <div className='flex  w-full gap-x-2  flex-row  py-2 px-2 '  >
                  <div className='w-1/2'>
                    <label htmlFor="firstname" className='block text-gray-600 font-bold pb-2'>
                      First Name
                    </label>
                    <input type="text" name="firstname" id="firstname" className='w-full rounded-md border  py-1 border-gray-400'  onChange={ondtachange} value={userdta.firstname}/>
                  </div>
                  <div className='w-1/2'>
                    <label htmlFor="lastname" className='block text-gray-700  font-bold pb-2'>
                      Last Name
                    </label>
                    <input type="text" name="lastname" id="lastname" className='w-full rounded-md border py-1 border-gray-400' onChange={ondtachange}  value={userdta.lastname} />
                  </div>

                </div>
                <div className='flex justify-center w-full gap-x-2  flex-row  py-2 px-2 '  >
                  <div className='w-1/2 relative '>
                    <label htmlFor="email" className='block text-gray-600 font-bold pb-2'>
                      Email Id
                    </label>

                    <div className='flex justify-between gap-0 rounded-l-lg  '>
                      <button className='text-center flex justify-center items-center px-2 border-l border-t  border-b border-gray-400  rounded-l-lg '>
                        <MdAlternateEmail />
                      </button>
                      <input type="email" name="email" id="email" className='w-full rounded-r-lg border-r border-t border-b py-1 border-gray-400' onChange={ondtachange}  value={userdta.email} />
                    </div>
                    {/* <MdAlternateEmail size={'20px'} className='mt-[2%] ml-[1%] absolute' /> */}
                  </div>
                  <div className='w-1/2 relative'>
                    <label htmlFor="mobile" className='block text-gray-700  font-bold pb-2'>
                      Mobile No
                    </label>

                    <div className='flex justify-between gap-0 rounded-l-lg  '>
                      <button className='text-center flex justify-center items-center px-2 border-l border-t border-b border-gray-400  rounded-l-lg '>
                        <IoCall />
                      </button>
                      <input type="number" name="mobile" id="mobile" className='w-full rounded-r-lg border-r border-t border-b py-1 border-gray-400' onChange={ondtachange}  value={userdta.mobile} />
                    </div>
                    {/* <IoCall size={'20px'} className='mt-[2%] ml-[1%] absolute'/> */}
                  </div>
                </div>
                <div>
                  <div className=' relative px-2'>
                    <label htmlFor="address " className='block text-gray-700  font-bold pb-2'>
                      Address
                    </label>

                    <div className='flex justify-between gap-0 rounded-l-lg    '>
                      <button className='text-center flex justify-center items-center px-2 border-l border-t border-b border-gray-400  rounded-l-lg '>
                        <FaLocationArrow />
                      </button>
                      <input type="text" name="address" id="address" className='w-full rounded-r-lg border-r border-t border-b py-1 border-gray-400' onChange={ondtachange}   value={userdta.address}/>
                    </div>

                  </div>
                </div>
                <div>
                  <div className=' relative px-2'>


                    <div className='flex justify-between gap-0 rounded-l-lg  py-2   '>

                      <input type="text" name="address2" id="address2" className='w-full rounded-lg  border  py-1 border-gray-400'   value={userdta.address2} />
                    </div>

                  </div>
                </div>
                <div className=' '  >
                  <div className=' relative px-2 '>
                    <label htmlFor="bussiness" className='block text-gray-600 font-bold pb-2'>
                      Bussiness Type
                    </label>

                    <div className='flex justify-between gap-0 rounded-l-lg  '>
                      <button className='text-center flex justify-center items-center px-2 border-l border-t  border-b border-gray-400  rounded-l-lg '>
                        <IoIosBusiness />
                      </button>
                      <input type="text" name="bussiness" id="bussiness" className='w-full rounded-r-lg border-r border-t border-b py-1 border-gray-400' onChange={ondtachange}  value={userdta.business} />
                    </div>
                    {/* <MdAlternateEmail size={'20px'} className='mt-[2%] ml-[1%] absolute' /> */}
                  </div>
                  
                </div>
                <div className='flex justify-center w-full gap-x-2  flex-row  py-2 px-2 '>
                  <div className='w-1/2 relative '>
                    <label htmlFor="dob" className='block text-gray-600 font-bold pb-2'>
                      DOB
                    </label>

                    <div className='flex justify-between gap-0 rounded-l-lg  '>
                      <button className='text-center flex justify-center items-center px-2 border-l border-t  border-b border-gray-400  rounded-l-lg '>
                      <FaBirthdayCake />
                      </button>
                      <input type="date" name="dob" id="dob" className='w-full rounded-r-lg border-r border-t border-b py-1 border-gray-400'   value={userdta.dob} onChange={ondtachange} />
                    </div>
                    {/* <MdAlternateEmail size={'20px'} className='mt-[2%] ml-[1%] absolute' /> */}
                  </div>
                  <div className='w-1/2 relative'>
                    <label htmlFor="pincode" className='block text-gray-700  font-bold pb-2'>
                      Pin Code
                    </label>

                    <div className='flex justify-between gap-0 rounded-l-lg  '>
                      <button className='text-center flex justify-center items-center px-2 border-l border-t border-b border-gray-400  rounded-l-lg '>
                        <TbMapPinCode />
                      </button>
                      <input type="text" name="pincode" id="pincode" className='w-full rounded-r-lg border-r border-t border-b py-1 border-gray-400' onChange={ondtachange} value={userdta.pincode} />
                    </div>
                    {/* <IoCall size={'20px'} className='mt-[2%] ml-[1%] absolute'/> */}
                  </div>
                </div>
                </>:<>
                <div className=' '  >
                  <div className=' relative px-2 '>
                    <label htmlFor="bussiness" className='block text-gray-600 font-bold pb-2'>
                        News  Api Key 
                    </label>
                    <div className='flex justify-between gap-0 rounded-l-lg  '>
                      <button className='text-center flex justify-center items-center px-2 border-l border-t  border-b border-gray-400  rounded-l-lg '>
                      <BsNewspaper/>
                      </button>
                      <input type="text" name="bussiness" id="bussiness" className='w-full rounded-r-lg border-r border-t border-b py-1 border-gray-400' onChange={ondtachange}  value={userdta.business} />
                    </div>
                    {/* <MdAlternateEmail size={'20px'} className='mt-[2%] ml-[1%] absolute' /> */}
                  </div>
                  <div className=' relative px-2 '>
                    <label htmlFor="bussiness" className='block text-gray-600 font-bold pb-2'>
                        Stock  Api Key 
                    </label>
                    <div className='flex justify-between gap-0 rounded-l-lg  '>
                      <button className='text-center flex justify-center items-center px-2 border-l border-t  border-b border-gray-400  rounded-l-lg '>
                      <BsNewspaper/>
                      </button>
                      <input type="text" name="bussiness" id="bussiness" className='w-full rounded-r-lg border-r border-t border-b py-1 border-gray-400' onChange={ondtachange}  value={userdta.business} />
                    </div>
                    {/* <MdAlternateEmail size={'20px'} className='mt-[2%] ml-[1%] absolute' /> */}
                  </div>
                  
                </div>

                
                </>
              }
               
              </div>
              <div className='md:w-1/2 border-l border-l-gray-200 text-center flex justify-start gap-4 items-center  flex-col '>
                <h1 className='capitalize  font-bold text-gray-500 text-2xl tracking-wide text-center '>profile photo </h1>
                <button className='flex justify-center'>
                    {memoizedUserProfile}
                  </button>
                <div className='flex justify-center'>
                  <input type="file" accept='image/*' onChange={
                    handleImageChange
                  } />
                </div>
              </div>

            </div>
           
            
            <div className='text-end py-3'>
              <button className='rounded-md bg-indigo-500 font-bold tracking-wide hover:bg-indigo-600  text-white py-1 px-2 ' onClick={updateinfo}>save changes </button>
            </div>

          </div>
           

        </div>
      </div>
    </div>
    </>
  )
}

export default memo(Settings)