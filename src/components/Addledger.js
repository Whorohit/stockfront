import React, { useState } from 'react'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { adduserdata } from '../stores'

function Addledger(props) {
    const {showornot,showledger, setShowledger,title,notevalue,setNotevalue,notefunction} = props
    const update=(event)=>{
        setNotevalue({ ...notevalue, [event.target.name]: event.target.value })

    }

    return (
        <>
            <div className='fixed bg-black opacity-75 z-50 w-screen h-screen ' style={{ display: `${showledger}` }}></div>
            <div class="fixed md:w-[65%] top-[2%] md:left-[20%] left-[5%]  z-[60]  w-[90%] mx-auto    border-2 bg-white rounded-lg shadow-2xl opacity-95 " style={{ display: `${showledger}` }}>

                <div class="flex items-start justify-between p-4 border-b rounded-t mt-4 ">
                    <h3 class="text-xl font-semibold text-gray-900  ">
                        {title}
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="staticModal" 
                    onClick={() => {
                      showornot();
                      setNotevalue({ _id: "", share: " ", profit_loss: "",quantity:null, time: "", price: null, margin: "", date: " ", action: " " })

                    }}>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <form class="p-6 space-y-6" >
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="share" id="share" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required  value={notevalue.share} onChange={update}/>
                        <label htmlFor="share" class="peer-focus:font-medium absolute text-sm text-gray-500   dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Share Name</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <select type="text" name="profit_loss" id="profit_loss" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required  value={notevalue.profit_loss} onChange={update}>
                            {['Profit','Loss','No'].map((data)=>{
                                return(<option  selected={data==='Profit'} >{data}</option>)
                            })}
                            </select>
                        <label for="profit_loss" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Profit or Loss</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="time" name="time" id="time" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required value={notevalue.time} onChange={update} />
                        <label for="time" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">time</label>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="number" name="price" id="price" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required value={notevalue.price}  onChange={update}/>
                            <label for="price" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="number" name="margin" id="margin" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required value={notevalue.margin} onChange={update} />
                            <label for="margin" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Margin</label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="date" name="date" id="date" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required value={notevalue.date} onChange={update} />
                            <label for="date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Margin</label>
                        </div>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="quantity" id="quantity" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" "   value={notevalue.quantity} onChange={update} />
                        <label for="quantity" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantity</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="action" id="action" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" "   value={notevalue.action} onChange={update} required />
                        <label for="action" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Action(write in  smallcase with space)</label>
                    </div>

                    <Button type={'submit'} title={'Submit'} funcaction={()=>
                    {
                        notefunction();
                    }}/>
                </form>


            </div>

        </>

    )
}

export default Addledger