import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createwatchlist, getwatchlist } from '../stores'


function Createwatchlist(props) {
    const [name, setName] = useState('')
    const dispatch = useDispatch();
    const w = useSelector((state) => state.stock.watchlistarray);
    const { watchlist, setwatchlist, setWatchlistarray, watchlistarray } = props
    const handleChange = (event) => {
        setName(event.target.value);
    }
    const oncreate = () => {
        let l = watchlistarray
        l.push(name)
        setWatchlistarray(l)
        setwatchlist('hidden')
        dispatch(createwatchlist(name))
        setName('')
    }


    return (
        <>
            <div className={`fixed top-0 bg-black opacity-75 w-screen h-screen ${watchlist} z-[29] `}></div>
            <div class={` fixed z-30  bg-white rounded-lg shadow top-[15rem] w-[90%] ml-[1%] lg:ml-[35%]  md:w-5/12 mx-auto border-[1px] border-gray-200 ${watchlist}  w-[98%]`} >
                <div class="flex items-center justify-between p-5 border-b rounded-t  ">
                    <h3 class="text-xl font-bold text-gray-900 py-4 ">
                        Create Watchlist
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal"
                        onClick={() => {
                            setwatchlist('hidden')
                        }}>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>

                <div class="p-6 space-y-6 h-[100%]">

                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 ">
                        <label htmlFor="watchlistName" className='mx-4 font-bold text-base'>Name</label>
                        <input type="text" name='watchlistName' id='watchlistName' value={name}
                            className=' w-2/3 max-h-fit focus:border-b-[2px]  focus:border-b-indigo-400   '
                            onChange={handleChange} />

                    </p>
                    <p class={`text-sm  text-red-400 h-10  `} style={{ display: `${name.length > 20 ? "block" : 'none'}` }} >The name should be small then  20 character </p>
                </div>
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                    <button data-modal-hide="small-modal" type="button" class="text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800" onClick={() => {
                        oncreate()
                    }}>Created</button>

                </div>
            </div>
        </>

    )
}

export default Createwatchlist