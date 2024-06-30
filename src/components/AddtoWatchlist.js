import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getwatchlist } from '../stores';
import { AiFillFolderAdd } from 'react-icons/ai'

function AddtoWatchlist(props) {
     const {add ,setAdd}=props
    const w = useSelector((state) => state.stock.watchlistarray);
  return (
    <div className={` z-10 rounded-md text-sm right-[0%] min-w-[10rem] max-w-[10rem] py-2  top-[60%] transition-all delay-[1s]  absolute shadow-lg  bg-gray-100 text-indigo-400  ` } style={{display:`${add===true?'block':'none'}`}}>
        {
                  w && w.map((data)=>{
                        return (<h1 className="min-w-[10rem]   mx-auto text-base cursor-pointer flex  text-center  items-center justify-center gap-x-1 py-2 hover:text-white  hover:bg-indigo-300 rounded-md" onClick={()=>{
                           console.log('hepp')
                        }} >
                       <h1 className=''> {data.watchlistname}</h1> <AiFillFolderAdd/>
                    </h1>)
                    })
                }
    </div>
  )
}

export default AddtoWatchlist