import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineDatabase, AiOutlinePlus, AiOutlineUnorderedList, AiOutlineStock, AiOutlineQuestion, AiOutlineSetting, } from 'react-icons/ai'
import { CiSettings, CiSquareRemove } from 'react-icons/ci'
import { BiHomeAlt2, BiBookAlt, BiNews, BiMessageSquare, BiMenu } from 'react-icons/bi'
import { FcNeutralTrading } from 'react-icons/fc'
import { BsSun, BsMoon } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import { HiMenuAlt3 } from 'react-icons/hi'
import { LuLogOut } from 'react-icons/lu'
import Createwatchlist from './Createwatchlist'
import { useDispatch, useSelector } from 'react-redux';
import {getwatchlist,modalview,removefromwatchlist,updatemodal } from '../stores'
import Modal from './modal'
import Topbar from './Topbar'
import { useParams } from 'react-router-dom'



function Navbar(props) {
    const navigate = useNavigate();
    const params = useParams()
    const [showmodal, setShowmodal] = useState(false)
    const w = useSelector((state) => state.stock.watchlistarray);
    const m = useSelector((state) => state.stock.modaldata);
    const dashtab = useSelector((state) => state.dash.tab);
    const [watchlist, setWatchlist] = useState('hidden')
    const dispatch = useDispatch();
    const [display, setDisplay] = useState('none')
    const [display1, setDisplay1] = useState('none')
    const [mode, setMode] = useState({ text: "text-gray-900", bg: "bg-white" })
    const [menu, setMenu] = useState(" ")
    const [watchlistarray, setWatchlistarray] = useState([])
    const [menubar, setMenubar] = useState("hidden")
    const [modalparameter, setModalparameter] = useState({})
    // const [modalparameter, setModalparameter] = useState({ title: "", yes: "", no: "", fun: null })
    const e = () => {
        dispatch(updatemodal({
            state: true,
            title: `Do you want delete it ${modalparameter.watchlistname}`,
            but2: "Cancel",
            but1: "Sure",
            fun: () => { dispatch(removefromwatchlist(modalparameter.watchlistname))
             }
        }))
    }
    useEffect(() => {
        try {

            dispatch(getwatchlist())

        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        try {
            if (w.array && w.array.length > 0) {
                const watch = w.array.map((data) => {
                    return data;
                });
                setWatchlistarray(watch);
            }
        } catch (error) {
            console.log(error)
        }
    }, [w]);
    useEffect(() => {
        dispatch(modalview())
    }, [])
    return (<>
        {/* {<Modal showmodal={showmodal} setShowmodal={setShowmodal} title={modalparameter.title} but1={modalparameter.yes} but2={modalparameter.no} fun={modalparameter.fun} />} */}
        {m.state == true && <Modal />}
        <aside
            className={`sidebar fixed z-20 top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center  transition-all duration-500  ${mode.bg}  
            ${mode.text} ${menu}`}
        >
            <div className="  text-xl">
                <div className="p-5 rounded-md mt-1 flex items-center justify-between sm:justify-normal">
                    <FcNeutralTrading />
                    <h1 className="font-bold  text-[15px] ml-3">Traboo</h1>
                    <MdOutlineCancel className='sm:hidden' onClick={() => {
                        setMenu('hidden')
                        setMenubar('block')
                    }} />
                </div>
                <div className=" bg-gray-300 h-[1px]"></div>
            </div>

            <Link to={'/'}
                className={`${dashtab.home === true ? "border-l-4 border-l-indigo-600 rounded-l-none  text-indigo-600 " : ""} p-5 rounded-md  flex items-center justify-start  px-4 duration-300 cursor-pointer hover:bg-indigo-300  hover:text-indigo-600  transition-all duration-300 `}
            >
                <BiHomeAlt2 />
                <Link className="text-[15px] ml-4  font-black" to={'/'}>Home</Link>
            </Link>
            <div className=" bg-gray-300 h-[.5px]"></div>
            <Link to={'/stock'}
                className={`${dashtab.stock === true ? "border-l-4 border-l-indigo-600 rounded-l-none  text-indigo-600 " : ""} p-5 rounded-md  flex items-center justify-start  px-4 duration-300 cursor-pointer hover:bg-indigo-300  hover:text-indigo-600 transition-all duration-300  `}
            >
                <AiOutlineStock />
                <span className="text-[15px] ml-4  font-black" > stock</span>
            </Link>
            <div className=" bg-gray-300 h-[1px]"></div>
            <Link
                to={'/ledger'}
                className={`${dashtab.ledger === true ? "border-l-4 border-l-indigo-600 rounded-l-none  text-indigo-600 " : ""} p-5 rounded-md  flex items-center justify-start  px-4 duration-300 cursor-pointer hover:bg-indigo-300  hover:text-indigo-600 transition-all   `}
            >
                <AiOutlineDatabase />
                <span className="text-[15px] ml-4  font-bold">Ledger</span>
            </Link>
            <div className=" bg-gray-300 h-[1px]"></div>
            <Link to={'/newspage'}
                className={`${dashtab.news === true ? "border-l-4 border-l-indigo-600 rounded-l-none  text-indigo-600 " : ""} p-5 rounded-md  flex items-center justify-start  px-4 duration-300 cursor-pointer hover:bg-indigo-300  hover:text-indigo-600  transition-all  `}
            >
                <BiNews />
                <Link className="text-[15px] ml-4  font-bold" to={'/newspage'}>News</Link>
            </Link>
            <div className=" bg-gray-300 h-[1px]"></div>
            <div
                className={`${dashtab.watchlist === true ? "border-l-4 border-l-indigo-600 rounded-l-none  text-indigo-600 " : ""} p-5 rounded-md  flex items-center justify-start  px-4 duration-300 cursor-pointer hover:bg-indigo-300  hover:text-indigo-600  transition-all  `}
                onClick={() => {
                    if (display === 'none') {
                        setDisplay('block')

                    }
                    if (display === 'block') {
                        setDisplay('none')
                    }
                }}>
                <AiOutlineUnorderedList />
                <div className={`flex justify-between w-full items-center`} >
                    <span className="text-[15px] ml-4  font-bold">Watchlist</span>
                    <AiOutlinePlus />
                </div>
            </div>
            <div
                className={`text-left    text-sm mt-2 w-[80%]  ml-10    font-bold }`}
                style={{ display: `${display}` }}

            >
                <h1 className="cursor-pointer p-2 hover:bg-indigo-300  mt-1"
                    onClick={() => {
                        if (watchlist == 'hidden') {
                            setWatchlist('block')
                        }
                        if (watchlist == 'block') {
                            setWatchlist('hidden')

                        }
                    }}>
                    Create
                </h1>
                {
                    watchlistarray && watchlistarray.map((data) => {
                        return (<h1 className="cursor-pointer p-2 flex justify-start gap-x-2 items-center hover:bg-indigo-300  mt-1" >
                            <Link to={`/watchlist/${data.watchlistname}`}> {data.watchlistname} </Link> <CiSquareRemove size={'25px'} className='hover:text-red-500 font-bold' onClick={() => {
                                dispatch(updatemodal({
                                    state: true,
                                    title: `Do you want delete it ${data.watchlistname}`,
                                    but2: "Cancel",
                                    but1: "Sure",
                                    fun: () => { dispatch(removefromwatchlist(data.watchlistname)) }
                                }))
                                    .then((action) => {
                                        if (updatemodal.fulfilled.match(action)) {
                                            console.log(m)
                                        }

                                    });

                            }

                            } />
                        </h1>)
                    })
                }
            </div>
            <div className=" bg-gray-300 h-[.5px]"></div>
            <div
            onClick={()=>{
                navigate('/account')
            }}
                className={`${dashtab.settings === true ? "border-l-4 border-l-indigo-600 rounded-l-none  text-indigo-600 " : ""} p-5 rounded-md  flex items-center justify-start  px-4 cursor-pointer hover:bg-indigo-300  hover:text-indigo-600 transition-all duration-300  `}
            >
                <AiOutlineSetting />
                <span className="text-[15px] ml-4  font-bold"> Settings</span>
            </div>
            <div className=" bg-gray-300 h-[.5px]"></div>
            <div
                className={`${dashtab.feedback === true ? "border-l-4 border-l-indigo-600 rounded-l-none  text-indigo-600 " : ""} p-5 rounded-md  flex items-center justify-start  px-4  cursor-pointer hover:bg-indigo-300  hover:text-indigo-600 transition-all duration-300   `}
            >
                <BiMessageSquare />
                <span className="text-[15px] ml-4  font-bold">Feedback</span>
            </div>
            <div className=" bg-gray-300 h-[1px]"></div>
            {/* <div
                className="p-2  flex items-center  h-12  justify-evenly      duration-300 "
            >
                <div className={`flex items-center justify-evenly ${mode.bg !== 'bg-indigo-400' ? 'bg-indigo-400 text-white' : "bg-gray-400 text-gray-900"} px-4 h-10  mx-1  py-1 w-52  text-xs font-semibold   `} onClick={() => setMode({ text: "text-grayyy-900", bg: "bg-white" })}>
                    Light
                    <BsSun className='mx-1' />
                </div>
                <div className={`flex items-center justify-evenly ${mode.bg !== 'bg-gray-900' ? 'bg-gray-100 text-gray-600' : "bg-gray-400 text-gray-900"} px-4 h-10 py-1  mx-1   text-xs w-52 font-semibold  `} onClick={() => setMode({ text: "text-gray-100", bg: "bg-gray-900" })}>
                    Dark
                    <BsMoon className='mx-1' />
                </div>
            </div> */}

        </aside>
        {/* <h1 className='h-0.5'></h1> */}
        <span className='h-[3rem]  '>
            <span className={`flex             items-center  ml-[.5rem] sm:ml-[18.9rem]  mr-[.3rem] sm:block justify-between `}>
                <span
                    class={` h-9 w-10 ml-2     flex justify-center items-center md:hidden text-4xl cursor-pointer bg-gray-200  ${menubar}`}
                    onClick={() => {
                        setMenu('block')
                        setMenubar('hidden')
                    }}
                >  <BiMenu />
                </span>
                <span
                    className='md:w-full'
                >  <Topbar />
                </span >
            </span>
        </span>
        <Createwatchlist watchlist={watchlist} setwatchlist={setWatchlist} setWatchlistarray={setWatchlistarray} watchlistarray={watchlistarray} />
    </>
    )
}

export default Navbar