import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { getProfit, getUserdata } from '../stores'
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);




function HomeLine({mydata,profit,loss,label}) {
  const [margin, setMargin] = useState([])
  const [time, setTime] = useState([])
  let dataarray = []
  let datearray = []
 


  useEffect(() => {
   
   try {
    dataarray = mydata && mydata.map((data) => {
      return data.margin
    })
    setMargin(dataarray)
    datearray = mydata && mydata.map((data) => {
      return data.time

    })
    setTime(datearray)
    
   } catch (error) {
    console.log(error);
   }
  }, [mydata])
  


  const options = 
   {
    plugins: {
      legend: {
          display: false,
          labels: {
              color: 'rgb(255, 99, 132)',
              usePointStyle :true,
              pointStyle:'circular',
              font: {
                size: 14
            }
             
          },
          labels: {
              color: 'rgb(255, 99, 132)',
              usePointStyle :true,
              pointStyle:'circular',
              font: {
                size: 14
            }
             
          },
      }
  }
  ,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    
  }
  };


  // let labels = ['19:59:00', '19:42:00', '19:34:00', '19:33:00', '19:23:00', '19:19:00', '19:00:00', '18:58:00', '18:41:00', '18:40:00', '18:32:00', '18:30:00', '18:27:00', '18:26:00', '18:16:00', '17:59:00', '17:58:00', '17:55:00', '17:52:00', '17:51:00', '17:44:00', '17:37:00', '17:34:00', '17:31:00', '17:26:00', '17:16:00', '17:02:00', '16:59:00', '16:58:00', '16:55:00', '16:54:00', '16:50:00', '16:48:00', '16:47:00', '16:40:00', '16:31:00', '16:26:00', '16:25:00', '16:24:00', '16:23:00', '16:21:00', '16:18:00', '16:17:00'];
  let labels = label &&label 
  //  
  const data = {
    labels,
    datasets: [
      {
        label:'net profit  earn  at per month or day',
        data:profit && profit,
        borderColor: 'rgba(0, 255, 0,.8)',
        backgroundColor: 'rgba(0, 255, 0,0.299)',
        fill:true,
        lineTension: .20,
        circular:true,
        borderWidth:1.4,
        
        
      },
      {
        label:'net loss  earn  at per month or day',
        data:loss && loss,
        borderColor: 'rgba(255, 0, 0,.8)',
        backgroundColor: 'rgba(255, 0, 0,0.299)',
        fill:true,
        lineTension: .20,
        circular:true,
        borderWidth:1.4,
        
        
      },
    ],
  };


  // console.log(dta[arr[1]])
  return <Line options={options} className='' data={data} />;
}
export default HomeLine