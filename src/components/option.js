import React from 'react'

function Option({data,set,selected}) {
  return (
    <section className={'bg-white w-24  rounded-sm    transition-all duration-300'}>
        {
            data&& data.length>0?data.map((item)=>{
                return(
                    <h1 className={`text-gray-700 text-xl hover:bg-indigo-200  border  hover:scale-125 hover:rounded-md border-b-gray-200 capitalize w-24 p-0.5 px-4 text-center tracking-wide ${set===item?"bg-gray-300":" "} `}>{item}</h1>
                )

            }):null
        }
    </section>
  )
}

export default Option