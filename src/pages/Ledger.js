import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Dough from '../components/Dough'
import { useDispatch, useSelector } from 'react-redux';
import { getUserdata, deleteuserdata, adduserdata, updateuserdata, getpagedata, setTabKey, serachdatabystockname, getwatchlist } from '../stores';
import { CiCalendarDate } from 'react-icons/ci';
import { BsFilterLeft, BsGraphUpArrow, BsQuestionCircle } from 'react-icons/bs';
import { faArrowTrendDown, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { AiOutlineArrowUp, AiOutlineDelete } from 'react-icons/ai'
import { fa } from '@faker-js/faker';
import Info from '../components/Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImArrowUpRight2 } from 'react-icons/im'
import { GrDocumentUpdate, GrUpdate } from 'react-icons/gr'
import { MdOutlineDoNotDisturbAlt, MdOutlineSecurityUpdateGood, MdOutlineClose } from 'react-icons/md';
import Addledger from '../components/Addledger';
import Button from '../components/Button';
import Dates from '../components/Date'
import { is, tr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import Option from '../components/option';
import Toastbox from '../components/toastbox';

function Ledger() {

    let profitcount = 0;
    let profitvalue = 0;
    let losscount = 0;
    let lossvalue = 0;
    const [showmonth, setShowmonth] = useState(false)
    const [showyear, setShowyear] = useState(false)

    const [orignaldata, setOrignaldata] = useState([])
    const navigate = useNavigate();
    const userdata = useSelector((state) => state.stock.userdata);
    const enabledata = useSelector((state) => state.stock.enabledata);
    const searchdata = useSelector((state) => state.Search.data)
    const [calender, setCalender] = useState(false)
    const [add, setAdd] = useState(false)
    const [update, setUpdate] = useState(false)
    const [stock, setStock] = useState('')
    const [modify, setModify] = useState([])
    const [month, setmonth] = useState(parseInt(new Date().getMonth()) + 1);
const [year, setYear] = useState(parseInt(new Date().getFullYear()));
    const [count, setCount] = useState(10)
    const [showserach, setShowserach] = useState(false)
    const dispatch = useDispatch();
    const [showledger, setShowledger] = useState('none')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [notevalue, setNotevalue] = useState(
        { _id: "", share: "", profit_loss: "profit", quantity: null, time: "", price: null, margin: "", date: " ", action: "" })

    const [selectedRange, setSelectedRange] = useState([]);
    useEffect(() => {
        dispatch(getwatchlist())
        .then((action)=>{
           if(action.payload.success=== false && action.payload.error=='Please authenticate using a valid token')
           {
            navigate('/login')
           }
        })
      }, [ ])


    function formatDateFromMilliseconds(milliseconds) {
        let date = new Date(Number(milliseconds));
        if (isNaN(date)) {
            return milliseconds;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const disabledDate = (current) => {
        // Disable dates starting from tomorrow onwards
        return current && current >= new Date().setHours(0, 0, 0, 0);
    };

    const updatenote = () => {
        try {

            dispatch(updateuserdata({
                profit_loss: notevalue.profit_loss,
                share: notevalue.share,
                time: notevalue.time,
                price: notevalue.price,
                margin: notevalue.margin,
                action: notevalue.action,
                date: notevalue.date,
                id: notevalue._id,
                quantity: notevalue.quantity,

            }))
            fetchUserData();
        } catch (error) {
            console.log(error)
        }


    }


    const fetchUserData = async () => {
        try {
            const response = await dispatch(getUserdata({ month: month, year: year }));
            console.log(response);  // Log the API response
            const modifiedData = response.payload.notes.map((data) => ({ ...data }));
            setOrignaldata(modifiedData);
            setModify(modifiedData);

        } catch (error) {
            console.log(error)
        }
    };
    const serachstock = () => {

        try {
            dispatch(serachdatabystockname({ stockname: stock, startDate, endDate })).then((action) => {


                if (serachdatabystockname.fulfilled.match(action)) {
                    setShowserach(true)
                    console.log(action.payload);
                    let data = action.payload.notes
                    setModify(data);


                }
            })


        } catch (error) {

        }
    }



    const evaluate = () => {
        modify && modify.forEach(data => {

            if (data.profit_loss == 'Profit') {
                profitcount = profitcount + 1;
                profitvalue = profitvalue + data.margin
            }
            if ((data.profit_loss == 'loss') || (data.profit_loss == 'Loss')) {
                losscount = losscount + 1;
                lossvalue = lossvalue + data.margin
            }
        });

    }
    const addnote = () => {
        try {
            console.log(notevalue.date)

            dispatch(adduserdata({
                profit_loss: notevalue.profit_loss,
                share: notevalue.share.trim(),
                time: notevalue.time,
                price: notevalue.price,
                margin: notevalue.margin,
                action: notevalue.action,
                date: notevalue.date,
                quantity: notevalue.quantity

            }))
            .then((action)=>{
                 if(action.payload.success)
                 {
                    fetchUserData();
                 }
            })
        } catch (error) {
            console.error('Error:', error);
        }
        setNotevalue({ share: " ", profit_loss: "", time: "", price: 0, margin: "", date: "", action: " ", quantity: null, })

    }
    useEffect(() => {
        fetchUserData();
    }, []); // Empty dependency array to fetch data when the component mounts

    useEffect(() => {
        fetchUserData();
    }, [month, year]); // 
    evaluate()


    const onstockchange = (e) => {
        setStock(e.target.value)
    }
    const handledelete = (id) => {
        dispatch(deleteuserdata(id))

        const data = modify.filter((data) => {
            return (data && data._id !== id)
        })
        setModify(data)

    }
    useEffect(() => {
        dispatch(setTabKey({ item: 'ledger' }))

    }, [])


    return (
        <>
        <Toastbox/>
        <div className='bg-gray-200 min-h-screen ' >
            {add && <Addledger showornot={() => {
                setShowledger('none')
                setAdd(false)
            }} showledger={showledger} setShowledger={setShowledger} title={'Add Ledger'} notevalue={notevalue} setNotevalue={setNotevalue}
                notefunction={addnote} />}
            {add !== true && update && <Addledger showornot={() => {
                setShowledger('none')
                setUpdate(false)
            }} showledger={showledger} setShowledger={setShowledger} title={'update Ledger'} notevalue={notevalue} setNotevalue={setNotevalue}
                notefunction={updatenote} />}
            <Navbar className=' z-20 ' />
            <div className={`p-4 sm:ml-64  `} >
                <div className='my-3  left-0     top-16 md:top-0   flex-wrap         '>
                    <div className=' w-[80%] mx-auto  flex gap-x-32  gap-y-16 justify-center xl:justify-between items-center flex-wrap mb-6'>
                        <div className='flex gap-2 min-w-[20rem] bg-white rounded-lg  flex-col    items-center  min-h-[16rem]  border-[2px]' style={{ borderColor: "rgb(251 113 133)" }}>
                            <h1 className='text-gray-500 font-bold md:text-xl w-full ml-6 mt-6 '>Profit And Loss Value  Count </h1>
                            <div className={`flex w-full flex-row items-center  justify-center `}>
                                <Dough className=' ' profit={profitcount} loss={losscount} des={"Count "}
                                    color=
                                    {{ major: "rgb(244 63 94)", minor: "rgb(254 205 211)" }} />
                            </div>
                            <h1 className='text-gray-500  w-5/6    text-base font-semibold  justify-normal flex items-center '>
                                Net Profit and Loss  <BsQuestionCircle color='gray' width='xl' className='mx-2' />

                            </h1>
                            <div className='flex justify-normal gap-4 '>
                                <div className={`flex  justify-center  items-center  gap-10  rounded-s-sm  `}>
                                    <h2 className='text-lg  font-semibold ml-4'>{profitcount} &  {losscount}</h2>
                                    <span className={`mx-1 rounded-xl flex justify-center  text-green-500   items-center  gap-2 bg-green-200  h-8 p-2 text-sm `} >
                                        <ImArrowUpRight2 size="15px" style={{ color: "rgb(34 197 94)" }} />5.6 %
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2 min-w-[20rem] bg-white rounded-lg  flex-col    items-center min-h-[16rem]  border-[2px]' style={{ borderColor: "rgb(74 222 128)" }}>
                            <h1 className='text-gray-500 font-bold md:text-xl w-full ml-6 mt-6 '>Profit And Loss Percent </h1>
                            <div className={`flex w-full flex-row items-center  justify-center `}>
                                <Dough className=' ' profit={profitcount} loss={losscount} des={"Percent "}
                                    color=
                                    {{ major: "rgb(74 222 128)", minor: "rgb(220 252 231)" }} />
                            </div>
                            <h1 className='text-gray-500  w-5/6     text-base font-semibold  justify-normal flex items-center '>
                                Net Profit and Loss Percent <BsQuestionCircle color='gray' width='xl' className='mx-2' />

                            </h1>
                            <div className='flex justify-normal gap-4 '>
                                <div className={`flex  justify-center  items-center  gap-10  rounded-s-sm  `}>
                                    <h2 className='text-lg  font-semibold ml-4'>{"$" + profitvalue.toFixed(2)} &  {"$" + lossvalue.toFixed(2)}</h2>
                                    <span className={`mx-1 rounded-xl flex justify-center  text-green-500   items-center  gap-2 bg-green-200  h-8 p-2 text-sm `} >
                                        <ImArrowUpRight2 size="15px" style={{ color: "rgb(34 197 94)" }} />5.6 %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' flex  relative flex-col  justify-between  md:w-4/5  w-full  my-3   bg-white  p-6 rounded-t-xl  flex-wrap  mx-auto  gap-x-16 gap-4' onClick={() => {
                        if (calender == true) {
                            setCalender(false)
                        }
                    }}>
                        <div className='flex justify-between gap-x-6 '>
                            <input type="text" value={stock} onChange={onstockchange} name='stock' className='bg-gray-50 border-2 border-indigo-500 text-gray-900 text-sm rounded-lg focus:ring-indigo-700 focus:border-indigo-700 block w-full lg:w-2/3 p-2.5  ' placeholder=' Serach Stock' />
                            {!showserach && <button className='ml-[-4.5rem] mt-[.8rem] font-extralight cursor-pointer flex justify-center focus:scale-90 hover:scale-90 focus:text-gray-600  hover:text-gray-600' disabled={stock.length === 0} ><FaSearch size={'20px'} color='gray' onClick={serachstock} /></button>}
                            {showserach && <button
                                className='ml-[-4.5rem] flex justify-center mt-[.8rem] font-extralight cursor-pointer focus:scale-90 hover:scale-90 focus:text-gray-600  hover:text-gray-600' ><MdOutlineClose size={'20px'} color='gray'
                                    onClick={() => {
                                        setShowserach(false)
                                        setModify(orignaldata)
                                        setStock('')
                                    }} /> </button>}
                            <Dates className='focus:ring-indigo-300 font-medium rounded-lg  static'
                                setStartDate={setStartDate} setEndDate={setEndDate} disabledDate={disabledDate}
                            />




                        </div>
                        <div className='flex  justify-between '>

                            <button
                                className='text-white bg-indigo-500 hover:bg-indigo-700 py-1    font-medium rounded-md text-lg px-5   text-center  flex items-center justify-center'
                                onClick={() => {
                                    if (showledger === 'none')
                                        setShowledger('block')
                                    if (showledger === 'block')
                                        setShowledger('none')
                                    setAdd(!add)
                                }}
                            > Add</button>
                            <div className='justify-center gap-0 flex'>
                                <select className='text-white bg-indigo-500      font-medium rounded-l-md text-lg    text-center ' name="month" id="month"
                                    onChange={(e) => {
                                        setmonth(e.target.value)
                                        console.log(e.target.value)
                                    }}>

                                    {
                                        [{ name: "month", value: "" },
                                        { name: 'January', value: 1 },
                                        { name: 'February', value: 2 },
                                        { name: 'March', value: 3 },
                                        { name: 'April', value: 4 },
                                        { name: 'May', value: 5 },
                                        { name: 'June', value: 6 },
                                        { name: 'July', value: 7 },
                                        { name: 'August', value: 8 },
                                        { name: 'September', value: 9 },
                                        { name: 'October', value: 10 },
                                        { name: 'November', value: 11 },
                                        { name: 'December', value: 12 },
                                        ].map((data) => {
                                            return (
                                                <option className='tracking-wide bg-white  w-8   text-gray-700' value={data.value} >{data.name} </option>
                                            )
                                        })

                                    }
                                </select>
                                <select className='text-white bg-indigo-500 font-medium rounded-r-md text-lg text-center' name="year" id="year"
                                    onChange={(e) => {
                                        setYear(e.target.value)
                                        console.log(e.target.value)
                                    }}>
                                    <option value={""}>
                                        Year
                                    </option>
                                    {(() => {
                                        const currentYear = new Date().getFullYear();
                                        const options = [];

                                        for (let year = currentYear; year >= currentYear - 10; year--) {
                                            options.push(<option className='tracking-wide bg-white  w-8   text-gray-700' key={year} value={year}>{year}</option>);
                                        }

                                        return options;
                                    })()}
                                </select>

                            </div>
                        </div>


                    </div>
                    <div
                        className='flex justify-normal md:w-4/5 w-full   my-3  bg-white overflow-x-auto mx-auto p-6 rounded-ee-xl rounded-es-xl'>
                        <table class="min-w-full text-left text-sm font-light">
                            <thead class="border-b font-medium bg-indigo-400 text-white">
                                <tr>
                                    <th scope="col" class="px-6 py-4">Name</th>
                                    <th scope="col" class="px-6 py-4">Share</th>
                                    <th scope="col" class="px-6 py-4">Profit/Loss</th>
                                    <th scope="col" class="px-6 py-4">Margin</th>
                                    <th scope="col" class="px-6 py-4">Price</th>
                                    <th scope="col" class="px-6 py-4">Date</th>
                                    <th scope="col" class="px-6 py-4">Time</th>
                                    <th scope="col" class="px-6 py-4">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {modify && modify.slice(0, count).map((data) => {
                                    return (
                                        <tr class={`border-b bg-indigo-50   transition-all duration-500 `}>
                                            <td class="whitespace-nowrap px-6 py-4 font-medium">{data.share}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{data.quantity}</td>
                                            <td class={`whitespace-nowrap px-6 py-4  ${data.profit_loss == "Profit" ? "bg-green-100" : "bg-red-100"}`}  >{data.profit_loss}</td>
                                            <td class="whitespace-nowrap px-6 py-4">&#8377; {data.margin}</td>
                                            <td class="whitespace-nowrap px-6 py-4">&#8377;{data.price} </td>
                                            <td class="whitespace-nowrap px-6 py-4">{formatDateFromMilliseconds(data.date)}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{data.time}</td>
                                            <td class="whitespace-nowrap px-6 py-4 flex gap-3 justify-center items-center"><AiOutlineDelete color={`${data.action && data.action.includes('delete') ? "rgb(59 130 246)" : "rgb(156 163 175)"}`} size={'20px'} className='hover:text-black' onClick={() => {
                                                if (data.action && data.action.includes('delete')) { handledelete(data._id) }
                                            }} />
                                                <MdOutlineSecurityUpdateGood onClick={() => {
                                                    if (data.action && data.action.includes('update')) {
                                                        if (showledger === 'none')
                                                            setShowledger('block')
                                                        if (showledger === 'block')
                                                            setShowledger('none')
                                                        setNotevalue(data)
                                                        setNotevalue({
                                                            ...data,
                                                            date: formatDateFromMilliseconds(data.date),
                                                        });
                                                        setUpdate(!update)

                                                    }
                                                }} color={`${data.action && data.action.includes('update') ? "rgb(59 130 246)" : "rgb(156 163 175)"}`} size={'20px'} />
                                                <MdOutlineDoNotDisturbAlt color={`${data.action && !data.action.includes('delete') && !data.action.includes('update') ? "rgb(59 130 246)" : "rgb(156 163 175)"}`} size={'20px'} /> </td>
                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>
                    <div className={`flex justify-center items-center ${modify && count >= modify.length ? "hidden" : " "}`}><Button title={'Load more'} funcaction={() => {
                        setCount(count + 20)
                    }} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Ledger