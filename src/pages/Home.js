import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Info from '../components/Info'
import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDotsVertical, BsVolumeUpFill } from 'react-icons/bs'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { faArrowTrendUp, faArrowTrendDown, faVolumeHigh, faWallet } from '@fortawesome/free-solid-svg-icons'
import { getCarddata, getUserdata, getuserinfo, setTabKey, usergraphdata } from '../stores'
import HomeLine from '../components/HomeLine'
import News from '../components/News'
import Createwatchlist from '../components/Createwatchlist'
import { useNavigate } from 'react-router-dom'
import Option from '../components/option'
import { BiSolidCalendarX } from 'react-icons/bi'
import { fa } from '@faker-js/faker'
import { DatePicker } from 'antd'
import Toastbox from '../components/toastbox'
function Home(props) {

  const { p } = props
  const [cardMonth, setCardMonth] = useState('')
  const [cardYear, setCardYear] = useState('')
  const [graphMonth, setGraphMonth] = useState('')
  const [grapYear, setGraphYear] = useState('')
  const currentYear = new Date().getFullYear();
  const options = [];
  for (let year = currentYear; year >= currentYear - 10; year--) {
    options.push(year)
  }
  const [profit, setprofit] = useState([])
  const [loss, setloss] = useState([])
  const [label, setlabel] = useState([])
  const navigate = useNavigate()
  const [cardData, setcardData] = useState({})
  const [graphdate, setGraphdate] = useState(new Date())
  const [graphoption, setGraphoption] = useState(false)
  const [graphinfo, setgraphinfo] = useState({})
  const userdata = useSelector((state) => state.stock.userdata);
  const enabledata = useSelector((state) => state.stock.enabledata);
  const enblecarddata = useSelector((state) => state.stock.enblecarddata)
  const dtaofcard = useSelector((state) => state.stock.cardData)
  const dispatch = useDispatch();
  const onchange = (date, dateString) => {
    console.log(dateString);
    setGraphdate(dateString)
  };
  const [optionmonth, setoptionmonth] = useState({ type: "month", state: false })
  const [optionmyear, setoptionyear] = useState({ type: "year", state: false })
  const [showcalender, setShowcalender] = useState(false)
  const [month, setMonth] = useState(parseInt(new Date().getMonth()) + 1);
  const [year, setYear] = useState(parseInt(new Date().getFullYear()));
  const [selectMonth, setSelectMonth] = useState(false)
  const [selectYear, setSelectYear] = useState(false)

  const apiCallInProgress = useRef(false);
  const carddta = async () => {
    const dta = await dispatch(getCarddata({ month: cardMonth, year: cardYear }))
     if(dta.payload.success=== true && dta.payload.error=='Please authenticate using a valid token')
     {
      console.log('heee');
      navigate('/login')
     }
    let profitcount;
    let losscount;
    let totalPrice;
    let totalQuantity;


    const profitlosslist = dta.payload.results && dta.payload.results[0] && dta.payload.results[0].Profit_Loss?dta.payload.results[0].Profit_Loss:[];

    const totallist = dta.payload.results && dta.payload.results[0] && dta.payload.results[0].totals?dta.payload.results[0].totals:[];
    if (profitlosslist.length > 0 && totallist.length > 0) {
      profitcount = profitlosslist.find((dta) => dta._id === 'Profit').count
      losscount = profitlosslist.find((dta) => dta._id === 'Loss').count
      totalQuantity = totallist.find((data) => data._id === null).totalQuantity;
      totalPrice = totallist.find((data) => data._id === null).totalPrice;
    }
    else {
      profitcount = 0
      losscount = 0
      totalPrice = 0
      totalQuantity = 0;
    }

    setcardData({ profitcount, losscount, totalQuantity, totalPrice })

  }
  const grpahdta = async () => {
    let profit=[];
    let loss=[];
    let label=[];
    const dta = await dispatch(usergraphdata({ month:month, year:year }))
    if(dta.payload.success===false && dta.payload.error=='Please authenticate using a valid token')
    {
     console.log('heee');
     navigate('/login')
    }
     const results=dta.payload.result?dta.payload.result:[]
     console.log(dta.payload.results);
     if(results.length>1)
     {
      profit=results.map((data)=>{
         return(data.totalProfit)
         
      })
      loss=results.map((data)=>{
         return(data.totalLoss)

      })
      label=results.map((data)=>{
        return(data.time)

     })
     console.log(profit,loss,label);
     setprofit(profit)
     setloss(loss)
     setlabel(label)
     
     }
     else
     {
       label=[ ]
       profit=[ ]
       loss=[ ]
     } 
  }
  useEffect(() => {
    dispatch(setTabKey({ item: 'home' }))
   
  }, [])
  useEffect(() => {
    try {
      carddta()
    } catch (error) {
      
    }
  }, [cardMonth, cardYear])
  useEffect(() => {
    try {
      grpahdta() 
      
    } catch (error) {
      
    }
  }, [month,year])
  
  const closeOptions = () => {
    setoptionmonth({ ...optionmonth, state: false });
    setoptionyear({ ...optionmyear, state: false });
  };

  return (
    <>
    <Toastbox/>
    <div className='relative bg-gray-200'  >
      <Navbar className=' z-20 ' />
      <div className={`p-4 sm:ml-[18rem]  `} >
        <div className='my-3  left-0     top-16 md:top-0   flex-wrap         '>
          <div className='flex   justify-between  items-center flex-wrap mb-5 w-[95%] mx-auto'>
            <div >
              <h1 className='text-gray-800 text-sm uppercase tracking-widest w-[95%] mx-auto '>Overview
              </h1>
              <h1 className='text-gray-900  font-bold  mx-auto text-xl  '> Analysis</h1>

            </div>
            <div className='justify-center gap-0 flex'>
              <select className='text-white bg-indigo-500  py-2     font-medium rounded-l-md text-lg    text-center  ' name="month" id="month"
                value={cardMonth}
                onChange={(e) => {
                  setCardMonth(e.target.value)
                  console.log(e.target.value);
                }} >

                {
                  [{ name: "month", value: "All" },
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
                      <option className='tracking-wide bg-white  w-8   text-gray-700' value={data.value}>{data.name}
                      </option>
                    )
                  })
                }
              </select>
              <select className='text-white bg-indigo-500 font-medium rounded-r-md py-2 text-lg text-center' name="year" id="year"

                value={cardYear}
                onChange={(e) => {
                  setCardYear(e.target.value)
                  console.log(e.target.value);
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
          <div className='flex   md:gap-0 gap-8 justify-between  items-center flex-wrap mb-5 w-[95%] mx-auto'>
            <Info arrow={faArrowTrendUp} color={"bg-blue-400"} incre={{ value: 5.6, bg: "bg-green-100", arrow: AiOutlineArrowUp, color: "rgb(134 239 172)", text: "green-500", border: 'border-blue-400' }} info={{ des: "Net Profit", info: `₹${cardData.profitcount ? cardData.profitcount : "₹0"}` }} />
            <Info arrow={faArrowTrendDown} color={" bg-rose-400 "} incre={{ value: 5.6, bg: "bg-green-100", arrow: AiOutlineArrowUp, color: "rgb(134 239 172)", text: "green-500", border: 'border-rose-400' }} info={{ des: "Net Loss", info: `₹${cardData.losscount ? cardData.losscount : "₹0"} ` }} />
            <Info arrow={faVolumeHigh} color={"bg-purple-400"} incre={{ value: 5.6, bg: "bg-red-100", arrow: AiOutlineArrowDown, color: "rgb(244 63 94)", text: "red-500", border: 'border-purple-400' }} info={{ des: "Total Vol.", info: `${cardData.totalQuantity ? cardData.totalQuantity : "0"}sh.` }} />
            <Info arrow={faWallet} color={"bg-emerald-400"} incre={{ value: 5.6, bg: "bg-red-100", arrow: AiOutlineArrowDown, color: "rgb(244 63 94)", text: "red-500", border: 'border-emerald-400' }} info={{ des: "Total Trade", info: cardData.totalPrice ? cardData.totalPrice : "0" }} />
          </div>
          <div className='md:w-[95%]  bg-white  mx-auto  w-full  rounded-md border-2 border-indigo-500'>
            <div className='text-center h-16 pb-5 flex justify-between  font-bold   flex-col  md:flex-row
               pt-2 px-1'>
              <h1 className=' text-xs md:text-lg '> Data Analysis:
                <span className='md:text-lg font-semibold text-indigo-400  text-right w-[50%] mx-auto items-center'> {month}-{year}</span>
              </h1>


              <div className='flex justify-center  py-1    md:text-sm text-indigo-500 relative'>
                <button className={`bg-indigo-500  text-white  px-1.5 rounded-l-md  font-extralight hover:bg-indigo-700 hover:text-gray-200  border-l  border-l-white `}
                  onClick={() => {
                    setoptionmonth({
                      type: "month", state: !optionmonth.state
                    })
                  }}>Monthly</button>
                <button className={`bg-indigo-500  rounded-r-md  text-white px-1.5 font-extralight hover:bg-indigo-700 hover:text-gray-200 border-l  border-l-white `}
                  onClick={() => {
                    setoptionyear({
                      type: "year", state: !optionmyear.state
                    })
                  }}
                >Yearly</button>
                {
                  optionmonth.state && optionmonth.type === 'month' &&
                  <div className='flex flex-col top-7 md:top-9 right-[50%] absolute  bg-gray-100 rounded-sm shadow-lg  w-[5.5rem] xl:w-[8rem] py-2  h-[10rem] overflow-y-auto scroll-auto'>

                    {[{ name: "month", value: "" },
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
                  ].map((data) => (
                      <h1
                        key={data.value}
                        className={`text-gray-700  text-xs xl:text-sm  text-center   rounded-md p-2 ${data.value===month?"bg-gray-300":"" } hover:bg-gray-300 `}
                         onClick={()=>{
                          setMonth(data.value)
                         }}
                      >
                        {data.name}
                      </h1>
                    ))}
                  </div>
                }
                {
                  optionmyear.state && optionmyear.type === 'year' &&
                  <div className='flex flex-col top-7 md:top-9 right-20  md:right-0 absolute bg-gray-100 rounded-sm shadow-lg  w-[3.5rem] xl:w-[6rem] py-2 h-[10rem] overflow-y-auto scroll-auto'>

                    {options.map((data) => (
                      <h1
                        key={data}
                        className={`text-gray-700  text-xs xl:text-sm  text-center   rounded-md p-2 ${data===year?"bg-gray-300":""  } hover:bg-gray-300`}
                        onClick={()=>{
                          setYear(data)
                         }}
                      >
                        {data}
                      </h1>
                    ))}

                  </div>
                }

              </div>

            </div>
            <HomeLine mydata={userdata.notes} label={label} profit={profit} loss={loss}  graphinfo={graphinfo}/>
          </div>
          {/* <div className='  mx-auto my-4  w-full h-1/2'>
             <News/>
          </div> */}
          <div >

          </div>


        </div>


      </div>


    </div>
    </>
  )
}

export default Home