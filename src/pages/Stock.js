import React, { memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Chart } from '../components/Chart'
import Navbar from '../components/Navbar'
import Autocomplete from '../components/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import { getSymbol, addtowatchlist, updatemodal ,getwatchlist, setTabKey} from '../stores'
import { AiFillFolderAdd } from 'react-icons/ai'
import { FaClipboardList } from 'react-icons/fa'
import AddtoWatchlist from '../components/AddtoWatchlist'
import Toastbox from '../components/toastbox'
import { ToastContainer } from 'react-toastify'
import Modal from '../components/modal'
function Stock(props) {

  const symbol = useSelector((state) => state.stock.symbol);
  const enablesymbol = useSelector((state) => state.stock.enablesymbol);
  const dispatch = useDispatch()
  const [add, setAdd] = useState(false)
  const [index, setIndex] = useState(null)
  const [showtogo, setShowtogo] = useState(null)
  const [showtogodiv, setShowtogodiv] = useState(false)
  const [serach, setSerach] = useState("")
  const [count, setCount] = useState(100)
  const navigate = useNavigate();
  let filterdata = []
  const w = useSelector((state) => state.stock.watchlistarray);


  useEffect(() => {
    try {
      dispatch(getSymbol());
    } catch (error) {
       console.log(error);
    }
  }, []);
  useEffect(() => {
    if (w.length === 0) {
      dispatch(getwatchlist())
      .then((action)=>{
        if(action.payload.success=== false && action.payload.error=='Please authenticate using a valid token')
        {
         navigate('/login')
        }
    })
    }

   
  }, [w])

  


  console.log(filterdata, "Tttttttttttttt")
  const serachvalue = (value) => {
    setSerach(value)
  }
  useEffect(() => {
    dispatch(setTabKey({item:'stock'})) 
  }, [ ])
  useEffect(() => {
    const news =localStorage.getItem("news")
    const stock =localStorage.getItem("stock")
    if (!news || !stock || stock.length===0 || news.length===0 ) {
     dispatch(updatemodal({
       state: true,
       title: ` for using the stock and  news  component  you have to  save  newsapi and  stockapi in db  from  stockapi -https://financialmodelingprep.com/ newsapi api-  https://www.alphavantage.co`,
       but2: "Cancel",
       but1: "Sure",
       fun: () => {  navigate("/account")}
   }))
    }
    
  
 }, [])
  return (
    <>
    <Toastbox/>
    {/* <Modal/> */}
    <div className=' min-h-screen bg-gray-200 ' >
      <Navbar className=' z-20 ' />
      <div className={`p-4 sm:ml-64  `} >
        <div className='my-3  left-0     top-16 md:top-0   flex-wrap  ' >
          <Autocomplete data={Array.isArray(symbol)?symbol:[ ]} filtersymbol={serachvalue} />
          <div className='flex justify-normal w-5/6  my-3  bg-white overflow-x-auto mx-auto p-6 rounded-md border-2 border-indigo-400
           rounded-es-xl'>
            <table
              className=' w-full  my-5   mx-auto   h-10     '>
              <thead class="border-b font-medium bg-indigo-400 text-white ">
                <tr>
                  <th scope="col" class="px-6 py-4">Name</th>
                  <th scope="col" class="px-6 py-4">Symbol</th>
                  <th scope="col" class="px-6 py-4">Price</th>
                  <th scope="col" class="px-6 py-4">Exchange</th>
                  <th scope="col" class="px-6 py-4">Type</th>
                  <th scope="col" class="px-6 py-4">Add to watchlist</th>

                </tr>
              </thead>
              <tbody className=' my-2 '>
                {
                 Array.isArray(symbol)&& symbol.filter((data) => {
                    return (serach.length <= 0 ? data : data.value.includes(serach))
                  }
                  ).slice(0, count).map((data) => {
                    return (
                      <tr className=' relative font-semibold  text-black h-20 hover:border-2 hover:border-indigo-500  '
                      >
                        <td className='w-[12rem] text-center h-20' onClick={() => {
                          setShowtogo(data.value)
                          setShowtogodiv(!showtogodiv)
                        }}>{data.label}  {showtogo === data.value && showtogodiv === true && <div className='absolute z-20 shadow-lg w-[10rem] bg-gray-100  top-0 text-base left-[10%] hover:text-indigo-700 font-semibold text-indigo-400 cursor-pointer text-center p-4 rounded-lg '
                          style={{ display: `${showtogodiv === true ? "block" : 'none'}` }} onClick={() => {
                            if (data.exchangeShortName === "NASDAQ" || data.exchangeShortName === "NYSE" || data.exchangeShortName === "NEO") {
                              navigate(`/stockpage/${data.value}`)
                            }

                          }}>Know more?only give data of US Stocks   </div>} </td>
                        <td className='text-center h-20'>{data.value}</td>
                        <td className='text-center h-20'>{data.price}</td>
                        <td className='w-[12rem] text-center h-20'>{data.exchange}</td>
                        <td className='text-center h-20'>{data.type}</td>
                        <td className=' relative text-center flex h-20 items-center justify-center w-[16rem] '>
                          {index === data.value && add === true && <div className={`${add ? ' scale-y-100 z-40'
                            : ' scale-y-0 translate-y-[-50%] opacity-0 z-[-10]'} scroll max-h-[50vh] w-[5rem] md:w-[12rem]  duration-300 absolute top-[5rem] right-0 transition-all bg-white  drop-shadow-lg rounded-md ease-linear overflow-y-auto p-3 flex flex-col items-center `}>
                            {w.array && w.array.length > 0 && w.array.map((dta) => {
                              return (
                                <p className={`rounded-md cursor-pointer mb-1  px-3 py-2 block w-full text-base border-b border-gray-200   text-indigo-500 hover:bg-indigo-500   hover:text-white hover:font-bold    `}
                                  onClick={() => {
                                    dispatch(updatemodal(
                                      {
                                        state: true,
                                        title: `Do you want add  it ${dta.watchlistname}`,
                                        but2: "Cancel",
                                        but1: "Sure",
                                        fun: () => {
                                          dispatch(addtowatchlist({
                                            watchlistname: dta.watchlistname,
                                             _id: dta._id, 
                                             dta: {
                                              value: data.value,
                                              label: data.label,
                                              exchange: data.exchange,
                                              exchangeShortName: data.exchangeShortName,
                                              price: data.price,
                                              type: data.type
                                            }
                                          }))
                                        }
                                      }
                                    ))
                                  }}  >
                                  {dta.watchlistname}
                                </p>
                              )
                            })}

                          </div>}
                          <FaClipboardList size={'20px'} className='cursor-pointer' onClick={() => {
                            setIndex(data.value);
                            setAdd(!add)
                          }} /></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

          </div>


        </div>
        <div className={`flex justify-center items-center ${count >= symbol.length ? "hidden" : " "}`}>
          <Button title={"Load More"} funcaction=
            {() => {
              setCount(count + 20)
            }} />
        </div>



      </div>


    </div>
    </>
  )
}

export default Stock