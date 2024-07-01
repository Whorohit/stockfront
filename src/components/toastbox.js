import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setResponseToast } from '../stores';

function Toastbox() {
  const dispatch=useDispatch();
    const text=useSelector((state)=>state.toastfile.text)
    const status=useSelector((state)=>state. toastfile.status)
    const responseToast=useSelector((state)=>state.toastfile.responseToast)
    useEffect(() => {
      
      if(status === 'success'){
        responseToast && toast.success(text[0], {
          position: 'top-right',
          className: 'font-bold text-xl',
          autoClose: 3000,
          style : {
            backgroundColor : 'white',
            color : 'rgb(92, 92, 92)',
            fontSize: '10px',
          },
        
        });
      }
      else if(status === 'fail'){
        text?.map((issue) =>{
          responseToast && toast.error(issue, {
            position: 'top-right',
            className: `font-bold text-xl`,
            autoClose: 3000,
            style : {
              backgroundColor : 'white',
              color :  'rgb(92, 92, 92)',
              fontSize: '10px',
            },
          });
        })
      }
      
      dispatch(setResponseToast(false))
    }, [responseToast])
     
  
    
  return (
   <div className='text-sm'>
     <ToastContainer/>
   </div>
  )
}

export default Toastbox