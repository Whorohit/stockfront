import React from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faArrowTrendDown, faVolumeHigh, faWallet } from '@fortawesome/free-solid-svg-icons'
import { BsVolumeUpFill } from 'react-icons/bs'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import {BsQuestionCircle} from 'react-icons/bs'

function Info(props) {
    const { arrow, color, incre,info } = props
    return (
        <div className={`  w-[8rem] lg:w-64 min-[1000px]:h-44 bg-white  rounded-lg  pb-2  border-[2px]    ${incre.border} `}>
            {/* <AiOutlineStock size='5x'/> */}
            <div className={`flex  justify-around mt-3 items-center   rounded-s-sm  flex-wrap  gap-y-3  `}>
                <FontAwesomeIcon icon={arrow} size="lg" style={{ color: "white" }} className={`mx-1 rounded-full   w-10 h-10 p-2 ${color}`} />
                <span className={`  text-xs md:text-sm  md:px-4 px-2 py-1  font-semibold items-center rounded-xl flex   justify-around  text-${incre.text} ${incre.bg}`}>
                    <incre.arrow color={incre.color} size={"1rem"}  /> {incre.value} %
                </span>
            </div>
            <h1 className='text-gray-500  ml-1 text-xs font-semibold mt-6 flex  items-center  '>
                 {info.des} <BsQuestionCircle color='gray' width='xl' className='mx-4'/>

            </h1>
            <h2 className='md:text-lg text-xs  font-semibold ml-4'>{info.info}</h2>

        </div>
    )
}

export default Info