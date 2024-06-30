import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Chart } from '../components/Chart'
import Navbar from '../components/Navbar'
import Autocomplete from '../components/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import { pagedata, updatemodal, removelistofwatchlist, setTabKey, removefromwatchlist } from '../stores'
import { AiFillFolderAdd } from 'react-icons/ai'
import { FaClipboardList } from 'react-icons/fa'
import AddtoWatchlist from '../components/AddtoWatchlist'
import { MdOutlineDelete } from 'react-icons/md'
import Toastbox from '../components/toastbox'
function Watchlistpage(props) {
  const { name } = useParams();
  const symbol = useSelector((state) => state.stock.pg);
  const dispatch = useDispatch()
  const [add, setAdd] = useState(false)
  const [index, setIndex] = useState(null)
  const [showtogo, setShowtogo] = useState(null)
  const [showtogodiv, setShowtogodiv] = useState(false)
  const [serach, setSerach] = useState("")
  const [count, setCount] = useState(10)
  const navigate = useNavigate();
  let filterdata = []

 const getwatchllistlist=async()=>{
  try {
    dispatch(pagedata({ name: name }))
      .then((action) => {
        if (action.payload.success && action.payload.success===false) {
            navigate('/login')
          }


      });
  } catch (error) {
   console.log(error)
  }
 }

  useEffect(() => {
     getwatchllistlist();
    
  }, [pagedata,removefromwatchlist]);


  console.log(filterdata, "Tttttttttttttt")
  const serachvalue = (value) => {
    setSerach(value)
  }
  useEffect(() => {
    dispatch(setTabKey({item:'watchlist'})) 
  
  }, [ ])
  return (
    <>
    <Toastbox/>
    <div className=' min-h-screen bg-gray-200 ' >
      <Navbar className=' z-20 ' />
      <div className={`p-4 sm:ml-64  `} >
        <div className='my-3  left-0     top-16 md:top-0   flex-wrap  ' >
          <Autocomplete data={symbol.share} filtersymbol={serachvalue} />
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
                  <th scope="col" class="px-6 py-4">Remove watchlist</th>

                </tr>
              </thead>
              <tbody className=' my-2 '>
                {
                  symbol.share && symbol.share.filter((data) => {
                    return (serach.length <= 0 ? data : data.value.includes(serach))
                  }
                  ).slice(0, count).map((data) => {
                    return (
                      <tr className=' relative font-semibold  text-black h-20 hover:border-2 hover:border-indigo-500  '
                      >
                        <td className='w-[12rem] text-center h-20' onClick={() => {
                          setShowtogo(data.value)
                          setShowtogodiv(!showtogodiv)
                        }}>{data.label}  {showtogo === data.value && showtogodiv === true && <div className='absolute z-20 shadow-lg w-[10rem] bg-gray-100  top-0 text-base left-[10%] hover:text-indigo-700 font-semibold text-indigo-400 text-center p-4 rounded-lg '
                          style={{ display: `${showtogodiv === true ? "block" : 'none'}` }} onClick={() => {
                            navigate(`/stockpage/${data.value}`)
                          }}>Know more?only give data of US Stocks   </div>} </td>
                        <td className='text-center h-20'>{data.value}</td>
                        <td className='text-center h-20'>{data.price}</td>
                        <td className='w-[12rem] text-center h-20'>{data.exchange}</td>
                        <td className='text-center h-20'>{data.type}</td>
                        <td className=' relative text-center flex h-20 items-center justify-center w-[16rem] '>
                          {/* {index === data.value && add === true && <AddtoWatchlist add={add} setAdd={setAdd} />} */}
                          <MdOutlineDelete size={'20px'} className='cursor-pointer'
                            onClick={() => {
                              dispatch(updatemodal(
                                {
                                  state: true,
                                  title: `Do you want  remove ${data.label} from ${name} `,
                                  but2: "Cancel",
                                  but1: "Sure",
                                  fun: () => {
                                    dispatch(removelistofwatchlist({
                                      watchlistname: name,
                                      value: data.value
                                    })).then((action)=>{
                                       getwatchllistlist()
                                    })
                                    
                                  }
                                }
                              ))
                            }} /></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

          </div>


        </div>
        <div className={`flex justify-center items-center ${symbol.share && count >symbol.share.length  ? "hidden" : " "}`}>
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

export default Watchlistpage