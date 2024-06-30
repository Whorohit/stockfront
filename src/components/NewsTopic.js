import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNews } from '../stores'

function NewsTopic() {
    const dispatch=useDispatch();
    const newsdata = useSelector((state) => state.stock.news);
    const enablenews = useSelector((state) => state.stock.enablenews);
    const [topicnews, setTopicNews] = useState([
       "blockchain",
"earnings",
"ipo",
"mergers_and_acquisitions",
"financial_markets",
 "economy_fiscal",
"economy_monetary",
 "economy_macro",
"energy_transportation",
"finance",
"life_sciences",
"manufacturing",
"real_estate",
"retail_wholesale",
"technology",
    ])
return (
    <div className='flex  justify-end items-end w-5/6 mx-auto mt-5 border-2 focus:border-indigo-500 '>
        <select className='font-bold rounded-md border-2 focus:border-indigo-500' onChange={(e)=>{dispatch(getNews(e.target.value))} }>
        {topicnews.map((data)=>{
            return(
                <option value={data}>
                    {data}
                </option>
            )
        })}
    </select>
    </div>
)
}

export default NewsTopic