import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

function Newsdes(props) {
  const { data } = props
  return (
    <div className=' bg-white flex  flex-col w-[90%] h-max  mx-auto rounded-lg p-2 my-3  border-2 border-indigo-400 '>
      <h1 className='text-red-400 text-semibold text-base '>News</h1>
      <div className='flex justify-between flex-col-reverse md:flex-row  '>
        <div>
          <h1 className='text-lg font-bold'>{data.title} </h1>
          <h1 className='text-base text-gray-500 '>
            {data.summary}
          </h1>
          <h1 className='text-black font-bold text-base flex flex-col'>
            <h1> by  {data.authors}</h1>
            <h1> from {data.source}</h1>
          </h1>
        </div>
        <div className='flex item-center flex-end  md:justify-normal justify-center md:w-56 w-64  '>
          <img src={data.banner_image} alt="" className=' rounded-md h-full w-full md:w-56 md:h-28 md:min-w-[10rem] md:min-h-[10rem] ' />
        </div>
      </div>
      <div className='mt-4'>
       <Button title={"Read More"} funcaction={()=>{
        window.location.href = data.url
       }} />
      </div>
    </div >
  )
}

export default memo(Newsdes)