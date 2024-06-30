import React, { useEffect, useState } from 'react'
import { getNews, getUserdata } from '../stores'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";
import Newdes from './Newsdes'
import Button from './Button';
function News() {  
    const newsdata = useSelector((state) => state.stock.news);
    const dispatch = useDispatch();
    const [news, setNews] = useState([  ])

    const [count, setCount] = useState(20)
    useEffect(() => {
      // Check if newsdata is already available in the Redux store before dispatching the action.
      try {
        if (newsdata.length === 0) {
          dispatch(getNews());
      }
      } catch (error) {
         console.log(error)
      }
  }, [dispatch, newsdata]);
  
  useEffect(() => {
      // Update the news articles when newsdata changes
    try {
      let array = newsdata.map((data) => {
        return data;
    });
    setNews(array.slice(0, 50));
    } catch (error) {
      
    }
  }, [newsdata]);
  useEffect(() => {
      fetch(`/products?limit=50`)
      .then((res)=>res.json )
      .then((data)=>{
        console.log(data)
      })
  }, [])
  
  return (
    <>
    <div
      >
       {news && news.slice(0,count).map((data)=>{
        return <Newdes data={data} />
       })}
    </div>
    <div className={`flex justify-center items-center ${count >= news.length ? "hidden" : " "}`}>
      
    <Button title={'Load more'} funcaction={()=>{
       setCount(count + 20)
    }}/>
  </div>
    </>
  )
}

export default News