import React, { useState } from 'react'
import { firebaseAuth } from '../auth/config'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { usersignup } from '../stores'
import { useDispatch } from 'react-redux'
import Toastbox from '../components/toastbox'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({ email: "", password: "", firstname: "", lastname: "" })
    const handleonchange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleSignIn = async () => {
        try {
            const { firstname, lastname, email, password } = userData
            const dta = await dispatch(usersignup({ firstname: firstname, lastname: lastname, email: email, password: password }))
            // console.log(dta.payload);
            if (dta.payload.success === true) {
                const nowIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                const expirationTime = new Date(new Date().getTime() + 30 * 60000); // 30 minutes in milliseconds
                const expirationTimeIST = expirationTime
                localStorage.setItem('id', dta.payload.token)
                localStorage.setItem('time', expirationTimeIST);
                localStorage.setItem('firstname', dta.payload.firstname)
                navigate('/')


            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Toastbox />
            <div className=' min-h-screen min-w-screen mx-auto  flex justify-center items-center   bg-gray-200 '>
                <div className="   md:flex justify-center md:w-3/5  " >
                    <div class="hidden md:flex justify-evenly  flex-col  font-semibold w-3/5  md:rounded-s-3xl  bg-indigo-500 text-white " style={{ minHeight: "80vh" }}>

                        <h1 className='text-5xl text-center ' >Hey There!</h1>
                        <div>
                            <h1 className='text-2xl text-center font-semibold'> WELCOME BACK</h1>
                            <h1 className='text-base text-center'> you are one step away your feed </h1>
                        </div>

                        <div className="container text-xs flex justify-between flex-col items-center">
                            <h1 className='text-base text-center mb-3 font-normal text-gray-400'><a href='/'>already have an account ?</a></h1>
                            <button onClick={() => {
                                navigate('/login')
                            }} class="rounded-full border-2 w-36 text-center  border-white py-2 px-4 hover:bg-indigo-700 focus:bg-indigo-700"><Link to='/login'
                            ></Link>Login</button>
                        </div>


                    </div>
                    <div className="container bg-gray-50  md:w-3/5 w-4/5  md:mx-0 mx-auto flex flex-col   md:rounded-ee-3xl md:rounded-e-3xl" style={{ minHeight: "80vh" }} >
                        <h1 className='text-indigo-500 text-2xl font-semibold  mx-6 mt-24'>Login</h1>
                        <div className='mx-5' >
                            <p class="mb-4 mt-2 ">Please login to your account</p>
                            <div class="flex -mx-3 ">
                                <div class="w-1/2 px-3 mb-5 h-14">
                                    <label for="" class="text-xs font-semibold px-1">First name</label>
                                    <div class="flex">
                                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                        <input type="text" name='firstname' id='firstname' class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" onChange={handleonchange} />
                                    </div>
                                </div>
                                <div class="w-1/2 px-3 mb-2">
                                    <label for="" class="text-xs font-semibold px-1">Last name</label>
                                    <div class="flex">
                                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                        <input type="text" name='lastname' id='lastname' class=" name='last' id='last'  w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Smith" onChange={handleonchange} />
                                    </div>
                                </div>
                            </div>
                            <div className="container flex flex-col">
                                <label htmlFor="email " className='text-black text-xs my-1 font-semibold' >  Email or Phone no</label>
                                <input type="text" className='w-3/4   text-sm border-2  py-2 border-gray-200 rounded-lg focus:border-indigo-500 ' name="email" id="email" style={{ minHeight: "1.8rem" }} onChange={handleonchange} />
                            </div>
                            <div className="container flex flex-col mb-2">
                                <label htmlFor="password " className='text-black text-xs my-1 font-semibold' >Password</label>
                                <input type="password" className='w-3/4  text-sm border-2 py-2 border-gray-200 rounded-lg focus:border-indigo-500 ' name="password" id="password" style={{ minHeight: "1.8rem" }} onChange={handleonchange} />

                            </div>
                            <div class="flex -mx-3">
                                <div class="w-full px-3 mb-5">
                                    <button type='submit' class="block   max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold  md:w-2/5  md:text-xs " onClick={handleSignIn}>REGISTER NOW</button>
                                </div>
                            </div>

                        </div><div className='md:hidden block'>
                            <h1 className='text-indigo-500  font-light text-base text-center'>Already  have account? </h1>
                            <h1 onClick={() => {
                                navigate('/signup')
                            }} className='text-center font-bold text-base text-indigo-600'>Login then</h1>
                        </div>


                    </div>


                </div>
            </div>
        </>
    )
}

export default Signup