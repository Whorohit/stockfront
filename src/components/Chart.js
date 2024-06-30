import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {getStock} from '../stores/index'
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




export function Chart() {
  let arr = []
  const dispatch=useDispatch();
  let datearray = [ ]
  let dataarray = [ ]
  const stock = useSelector((state) => state.stock.news);
  const enable = useSelector((state) => state.stock.enablenews);
  useEffect(() => {
     dispatch(getStock())
    // fetch(`https://financialmodelingprep.com/api/v3/historical-chart/1min/AAPL?apikey=9bedec4766c50b3137e7822e6f5a9b2c`)
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data)
    // })

  }, [enable])

  // let g = []
  // for (const key in dataarray) {
  //   g.push(key)
  // }
  // console.log(g, 'g')
  const options = {
    responsive: true,
    
  };


  // let labels = ['19:59:00', '19:42:00', '19:34:00', '19:33:00', '19:23:00', '19:19:00', '19:00:00', '18:58:00', '18:41:00', '18:40:00', '18:32:00', '18:30:00', '18:27:00', '18:26:00', '18:16:00', '17:59:00', '17:58:00', '17:55:00', '17:52:00', '17:51:00', '17:44:00', '17:37:00', '17:34:00', '17:31:00', '17:26:00', '17:16:00', '17:02:00', '16:59:00', '16:58:00', '16:55:00', '16:54:00', '16:50:00', '16:48:00', '16:47:00', '16:40:00', '16:31:00', '16:26:00', '16:25:00', '16:24:00', '16:23:00', '16:21:00', '16:18:00', '16:17:00'];
  let labels = datearray
  //  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: arr,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };


  // console.log(dta[arr[1]])
  return <div  className='flex justify-center items-center  h-40 '>
    {/* <Line options={options}   data={data} /> */}
  </div>;
}
