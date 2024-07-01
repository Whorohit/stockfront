// apikeySlice.js

import { createSlice } from '@reduxjs/toolkit';

export const apikeySlice = createSlice({
  name: "apikey",
  initialState: {
    news: localStorage.getItem("news") ? localStorage.getItem("news") : "",
    stock: localStorage.getItem("stock") ? localStorage.getItem("news") : "",
    stockkey: false,
    newskey: false,
  },
  reducers: {
    getnewskeys: (state) => {
      if (localStorage.getItem("news")) state.newskey = true;
    },
    getstockkeys: (state) => {
      if (localStorage.getItem("stock")) state.stockkey = true;
    },
  },
});

export const { getnewskeys, getstockkeys } = apikeySlice.actions;

export default apikeySlice.reducer;
