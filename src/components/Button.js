import React from 'react'

function Button({title,funcaction,Icon,p,type,submit}) {
  return (
    <button type={`${type && type }`} className={`text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5   text-center  flex items-center justify-center ${p?p:"py-2.5 "} `}
    onClick={() => {
       funcaction && funcaction();
    }}
    onSubmit={()=>{
       submit && submit();
    }} >{title} {Icon && <Icon/> } </button>
  )
}

export default Button