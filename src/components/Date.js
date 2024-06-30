import React, { useState } from 'react';
import { DatePicker, Radio, Space } from 'antd';
import { format } from 'date-fns';
import styled from 'styled-components'

function D({disabledDate,setStartDate, setEndDate }) {
 
  
    const { RangePicker } = DatePicker
    const [size, setSize] = useState([]);
    const handleSizeChange = (value, dateString) => {
      setSize(value);
  
      if (value && value.length === 2) {
        const formattedStartDate = dateString[0];
        const formattedEndDate = dateString[1];
    
        setSize(value);
    
        console.log('Formatted Start Date:', formattedStartDate);
        console.log('Formatted End Date:', formattedEndDate);
        setEndDate(formattedEndDate)
        setStartDate(formattedStartDate)
      }
    };
  return (
    
   
         <RangePicker size={size} style={{border:"2px  solid rgb(129 140 248) ",padding:"7px 3px"}}  showTime={false}  onChange={handleSizeChange}   disabledDate={disabledDate}  format="YYYY-MM-DD"  />
  )
}

export default D
