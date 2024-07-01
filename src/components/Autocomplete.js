import { AutoComplete, Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSymbol } from '../stores';
import But from './Button'


function Autocomplete({data=[ 
  

],filtersymbol}) {

  // const userdata = useSelector((state) => state.stock.news);
  // const enabledata = useSelector((state) => state.stock.enablenews);
  const dispatch=useDispatch()
  const [inputvalue, setInputvalue] = useState(' ')
  

 
  
  // useEffect(() => {
  //   dispatch(getSymbol()) 
    
  // }, [enabledata])
  return (<div className='w-5/6  mt-16 my-4 mx-auto px-6 flex flex-row  gap-4 '>


    <AutoComplete
      className='w-full focus:border-indigo-500  focus:border-[3px]  text-2xl  rounded-lg'
      options={data}
      filterOption={true}
      onSelect={(value) => {
        setInputvalue(value)
         filtersymbol(inputvalue)
      }}
      size='40px'
      optionFontSize={30}
      onChange={
         (value) => {
          setInputvalue(value)
         filtersymbol(inputvalue)
      
        }
      }
    >
    </AutoComplete>

  </div>
  )
}

export default Autocomplete