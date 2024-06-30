import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserdata } from '../stores';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'
import {FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faArrowTrendDown, faVolumeHigh, faWallet } from '@fortawesome/free-solid-svg-icons'
ChartJS.register(ArcElement, Tooltip, Legend);

function Nut(props) {
    const {profit ,loss,des,color}=props
    // const userdata = useSelector((state) => state.stock.userdata);
    // const enabledata = useSelector((state) => state.stock.enabledata);
    // // const [profitcount, setProfitcount] = useState(0)
    // // const [profitvalue, setProfitvalue] = usetate(0)
    // // const [losscount, setLosscount] = useState(0)
    // // const [lossvalue, setLossvalue] = useState(0)
    // let profitcount = 0;
    // let profitvalue = 0;
    // let losscount = 0;
    // let lossvalue = 0;
    // const [dataarray, setDataarray] = useState([])
    // const dispatch = useDispatch();
    // let data ={ }
    
    // const evaluate = () => {

    //     // userdata.map((data) => {
    //     //     // console.log(data.profit_loss)
    //     //     if (data.profit_loss === 'Profit') {
    //     //         setProfitcount(profitcount+ 1)
    //     //         setProfitvalue(profitvalue+ data.margin)
    //     //     }
    //     //     else {
    //     //         setLosscount(losscount + 1)
    //     //         setLossvalue(lossvalue + data.margin)
    //     //     }
    //     // })
    //     userdata.forEach(data => {

    //         if (data.profit_loss == 'Profit') {
    //             // setProfitcount(prevProfitcount => prevProfitcount + 1);
    //             // setProfitvalue(prevProfitvalue => prevProfitvalue + data.margin);
    //             profitcount = profitcount + 1;
    //             profitvalue = profitvalue + data.margin
    //         }
    //         if ((data.profit_loss == 'loss') || (data.profit_loss == 'Loss')) {
    //             // setLosscount(prevLosscount => prevLosscount + 1);
    //             // setLossvalue(prevLossvalue => prevLossvalue + data.margin);
    //             losscount = losscount + 1;
    //             lossvalue = lossvalue + data.margin
    //         }
    //     });

    // }
    // const change = async () => {
    //     if (profitcount > 0 && losscount > 0) {
    //         setDataarray((p) => p.concat(profitcount))
    //         setDataarray((p) => p.concat(losscount))
    //     }
    // }
    // useEffect(() => {
    //     dispatch(getUserdata())
    // }, [enabledata])

    //     evaluate();
    //     console.log(userdata)
    //     console.log(profitcount, losscount)
    //     console.log(profitvalue, lossvalue)
 const  options= {
    plugins: {
        legend: {
            display: false,
            labels: {
                color: 'rgb(255, 99, 132)',
                fontsize: 22
            }
        }
    },
    responsive:true,
    maintainAspectRatio:true,
}

 

   const   data = {
        labels: ['Profit', 'Loss',],
        datasets: [
            {
                label:des,
                data: profit> 0 || loss>0?[profit,loss]:[ 67,88],
                backgroundColor: [
                    color.major,
                    color.minor,

                ],
                borderColor: [
                    color.major,
                    color.minor,

                ],
                borderWidth: 1,
            },
        ],
    };

   

    return (
       <div className='  '>
         <Doughnut data={data}  options={options}
           className=' ' 
           width={100}
           height={50} />
       </div>
    )    
           

       
}

export default Nut