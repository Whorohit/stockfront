import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Info from '../components/Info'
import { useDispatch, useSelector } from 'react-redux'
import { BsVolumeUpFill, BsFillCalendar2Fill, BsCalendarDate } from 'react-icons/bs'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { FaCalenderPlus } from 'react-icons/fa'
import { faArrowTrendUp, faArrowTrendDown, faVolumeHigh, faWallet, faChartPie, faPiggyBank, faIndustry, faEarthAsia, faRocket } from '@fortawesome/free-solid-svg-icons'
import { addtowatchlist, getStockInfo, getStockgraph, getUserdata, getwatchlist, setTabKey, updatemodal } from '../stores'
import HomeLine from '../components/HomeLine'
import { DatePicker } from 'antd';
import News from '../components/News'
import millify from "millify";
import { IoMdAdd } from 'react-icons/io'
import {
  BsThreeDotsVertical
} from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { BiSolidCalendarX } from 'react-icons/bi'
import AddtoWatchlist from '../components/AddtoWatchlist'
import Modal from '../components/modal'

function Stockpage(props) {
  const { id } = useParams();
  const navigate = useNavigate()
  const [profit, setprofit] = useState([ ])
  const [label, setlabel] = useState([ ])
  const [timeoptionarray, setTimeoptionarray] = useState(['1min', '5min', '15min', '30min', '1hour'])
  const [showcalender, setShowcalender] = useState(false)
  const [timeoption, setTimeoption] = useState(false)
  const w = useSelector((state) => state.stock.watchlistarray);
  const [timevalue, setTimevalue] = useState('1min')
  const [graphdate, setGraphdate] = useState(new Date())
  const { p } = props;
  const [addtolist, setAddtolist] = useState(false)
  const graphdata = useSelector((state) => state.stock.graph);
  const usercoreinfo = useSelector((state) => state.stock.stockdata);
  const dispatch = useDispatch();
  const onchange = (date, dateString) => {
    console.log(dateString);
    setGraphdate(dateString)
  };
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
    const day = String(today.getDate()).padStart(2, '0');



    return `${year}/${month}/${day}`;
  }
  const grpahdta = async () => {
    let profit=[];
    let label=[];
    const dta = await dispatch(getStockgraph({ symbol: id, date: graphdate, time: timevalue }))
     const results=Array.isArray(dta.payload)>0?dta.payload:[]
     console.log(dta.payload);
     if(dta.payload.length>1)
     {
      profit=dta.payload.map((data)=>{
          return(data.margin)
         
      })
      label=dta.payload.map((data)=>{
         return(data.time)

      })
     }
     else
     {
       label=[ ]
       profit=[ ]
       
     }
     setlabel(label)
     setprofit(profit)
     console.log(profit,label);
  }
  useEffect(() => {
    dispatch(getwatchlist())
    .then((action)=>{
       if(action.payload.success=== false && action.payload.error=='Please authenticate using a valid token')
       {
        navigate('/login')
       }
    })

    console.log(w, "ttt")
  }, [ ])


  useEffect(() => {
    setGraphdate(getCurrentDate());

  }, [])

  useEffect(() => {
    try {
      grpahdta();
      dispatch(getStockInfo(id))
    } catch (error) {
      console.log(error)
    }
  }, [timevalue, graphdate])
  useEffect(() => {
    dispatch(setTabKey({item:'stock'})) 
  
  }, [])

  return (
    <>

      <div className='bg-gray-200  min-h-screen ' >
        <Navbar className=' z-20 ' />
        <div className={`p-4 sm:ml-[18rem]   `} >
          <div className='my-3  left-0     top-16 md:top-0   flex-wrap         '>
            <div className='flex   flex-wrap  gap-y-5  gap-x-6 md:gap-x-12 justify-between md:mb-5'>
              <Info arrow={faChartPie} color={"bg-indigo-400"} incre={{ value: 6.7, bg: "bg-green-100", arrow: AiOutlineArrowUp, color: "rgb(134 239 172)", text: "green-500", border: 'border-indigo-400' }} info={{ des: "Share Value", info: "$" + usercoreinfo.range ? usercoreinfo.range : "00" }} />
              <Info arrow={faIndustry} color={"bg-indigo-400"} incre={{ value: 5.6, bg: "bg-green-100", arrow: AiOutlineArrowUp, color: "rgb(134 239 172)", text: "green-500", border: 'border-indigo-400' }} info={{ des: "Industry", info: usercoreinfo.industry }} />
              <Info arrow={faPiggyBank} color={"bg-indigo-400"} incre={{ value: (2.4200134).toFixed(1), bg: "bg-red-100", arrow: AiOutlineArrowDown, color: "rgb(244 63 94)", text: "red-500", border: 'border-indigo-400' }} info={{ des: "Net Cap.", info: "$ " + usercoreinfo && millify(usercoreinfo.mktCap) }} />
              <Info arrow={faVolumeHigh} color={"bg-indigo-400"} incre={{ value: 5.6, bg: "bg-red-100", arrow: AiOutlineArrowDown, color: "rgb(244 63 94)", text: "red-500", border: 'border-indigo-400' }} info={{ des: "Net Volume", info: usercoreinfo && millify(usercoreinfo.volAvg) + " Shares" }} />
            </div>
            <div className='flex  relative justify-between  xl:flex-row  flex-col-reverse gap-y-4'>
              <div className='xl:w-[75%]  bg-white   w-full h-full  rounded-md border-2 border-indigo-500'>
                <div className='flex  relative justify-end mt-4 flex-row mx-4 items-start text-indigo-700 h-[2rem] '>
                  {showcalender && <DatePicker className='border-[2px] border-indigo-400 ' onChange={onchange}  size={'small'} />}
                  <BiSolidCalendarX size={'20px'} className='mx-2 cursor-pointer' onClick={() => {
                    setShowcalender(!showcalender)
                  }} />
                  < BsThreeDotsVertical size={'20px'} className='mx-2 cursor-pointer' onClick={() => {
                    setTimeoption(!timeoption)
                  }} />
                  {timeoption === true ? <div className='flex flex-col top-4 right-[1%]  absolute bg-gray-100 rounded-sm shadow-lg  w-[3.5rem] xl:w-[6rem] py-2  '>
                    {timeoptionarray.map((data) => {
                      return (<h1 className={`text-gray-700  text-xs xl:text-sm  text-center   rounded-md p-2  ${timevalue === data && "bg-indigo-400"}`} onClick={() => {
                        setTimevalue(data)
                      }}>{data}</h1>)
                    })} </div> : " "}
                  <IoMdAdd size={'20px'} onClick={() => {
                    setAddtolist(!addtolist)
                  }} />
                  <div className={`${addtolist ? ' scale-y-100 z-40'
                    : ' scale-y-0 translate-y-[-50%] opacity-0 z-[-10]'} scroll max-h-[50vh] w-[5rem] md:w-[8rem]  duration-300 absolute top-5 right-0 transition-all bg-white  drop-shadow-lg rounded-md ease-linear overflow-y-auto p-3 flex flex-col items-center`}>
                    {w.array && w.array.length > 0 && w && w.array.map((data) => {
                      return (
                        <p className={`rounded-md cursor-pointer mb-1  px-3 py-1 block w-full text-base border-b border-gray-200 hover:bg-indigo-500   hover:text-white hover:font-bold   `}
                          onClick={() => {
                            dispatch(updatemodal(
                              {
                                state: true,
                                title: `Do you want add  it ${data.watchlistname}`,
                                but2: "Cancel",
                                but1: "Sure",
                                fun: () => {
                                  dispatch(addtowatchlist({
                                    watchlistname: data.watchlistname, _id: data._id, dta: {
                                      value: usercoreinfo.symbol,
                                      label: usercoreinfo.companyName,
                                      exchange: usercoreinfo.exchange,
                                      exchangeShortName: usercoreinfo.exchangeShortName,
                                      price: usercoreinfo.price,
                                      type: usercoreinfo.industry
                                    }
                                  }))
                                }
                              }
                            ))
                          }}  >
                          {data.watchlistname}
                        </p>
                      )
                    })}

                  </div>
                </div>
                <HomeLine mydata={graphdata} label={label} profit={profit}  />
              </div>
              <div className=' xl:space-y-36 flex xl:block justify-between  max-md:my-6  ' >
                <Info arrow={faEarthAsia} color={"bg-indigo-400"} incre={{ value: (2.4200134).toFixed(3), bg: "bg-red-100", arrow: AiOutlineArrowDown, color: "rgb(244 63 94)", text: "red-500", border: 'border-indigo-400' }} info={{ des: "Country,State", info: usercoreinfo.country + "," + usercoreinfo.state }} />
                <Info arrow={faRocket} color={"bg-indigo-400"} incre={{ value: 5.6, bg: "bg-red-100", arrow: AiOutlineArrowDown, color: "rgb(244 63 94)", text: "red-500", border: 'border-indigo-400' }} info={{ des: "Net Volume", info: millify(usercoreinfo.volAvg) + " Shares" }} />
              </div>
            </div>

          </div>
          <div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Stockpage