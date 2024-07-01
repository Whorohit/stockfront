import React, { useEffect } from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { modalview, updatemodal } from '../stores';

function Modal() {
    const dispatch=useDispatch();
    const w = useSelector((state) => state.stock.modaldata);
    // { title, fun, but1, but2, showmodal, setShowmodal }
    // useEffect(() => {
    //     dispatch(modalview())
    //   }, [w])
   
    const { state,title,but2,but1,fun } = w;
  
   
    
    return (
        <>
            <div className={`fixed bg-black opacity-75 z-[80] min-h-screen w-screen   `}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, maxime?
            </div>
            <div class={`fixed top-10  left-0  right-0  md:left-[27%]  z-[81]  md:w-[50%]  p-4  h-[calc(100%)] max-h-full`}>

                <div class="relative bg-white rounded-lg shadow ">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="popup-modal" onClick={() => {
                        dispatch(updatemodal({state:false}))
                    }}>
                        <RxCross2 />
                    </button>
                    <div class="p-6 text-center">
                        <div className='flex justify-center items-center '>
                            <AiOutlineExclamationCircle className='text-gray-400 my-4' size={'70px'} />
                        </div>
                        <h3 class="mb-5  text-base md:text-lg font-normal  text-gray-500 dark:text-gray-400">{title} ?</h3>
                        <button data-modal-hide="popup-modal" type="button" class="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            onClick={
                                () => {
                                    dispatch(updatemodal({state:false,yes:true}))
                                }
                            }>
                            {but1}
                        </button>
                        <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10  " onClick={() => {
                          dispatch(updatemodal({state:false}))
                        }}>{but2}</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Modal