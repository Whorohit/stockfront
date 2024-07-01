import {
  createAsyncThunk,
  configureStore,
  createSlice,
  applyMiddleware
} from '@reduxjs/toolkit';
import axios from 'axios'
import { useState } from 'react'
import thunkMiddleware from 'redux-thunk';
import { apikeySlice, ApikeySlice, getstockkeys } from './apikeyslice';
const initialState = {

  userdata: ["rp", 'bvip', "ghj"],
  genres: [],
};
const d = [];
const apiUrl = process.env.REACT_APP_API_URL;

export const getUserdata = createAsyncThunk(
  "stock/userdata",
  async ({ month, year }) => {
    try {
      console.log(month, year);
      let response = await fetch(`${apiUrl}api/data?month=${month}&year=${year}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "id": localStorage.getItem('id')

        },
      });
      const jsonfile = await response.json()
      return jsonfile
    } catch (error) {
      console.log(error)
    }

  }

);

export const deleteuserdata = createAsyncThunk(
  "stock/deleteuserdata",
  async (noteid, array) => {
    let response = await fetch(`${apiUrl}api/deletenote/${noteid}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": " application/json",
        // "id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMjk3M2Q3MTBmZDc0YjU0MjA5MjVkIn0sImlhdCI6MTY5MTUyMjg3N30.5pBx7pQT_kFT8pPKtXzin8v_hB7ysbxMf0cvxoG1Eu0",
        "id": localStorage.getItem('id')

      },
    });
    const jsonfile = await response.json()
    return jsonfile

  }
);
export const adduserdata = createAsyncThunk(
  "stock/adduserdata",
  async ({ profit_loss, share, time, price, margin, action, update, date, quantity }) => {

    let response = await fetch(`${apiUrl}api/savedata`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "id": localStorage.getItem('id')
      },
      body: JSON.stringify({ profit_loss: profit_loss, share: share, time: time, price: price, margin: margin, action: action, update: update, date: date, quantity: quantity }),
    });
    const jsonfile = await response.json()
    return jsonfile

  }

);
export const updateuserdata = createAsyncThunk(
  "stock/updateuserdata",
  async ({ profit_loss, share, time, price, margin, action, update, date, id, quantity }) => {

    let response = await fetch(`${apiUrl}api/updatenote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "id": localStorage.getItem('id')
      },
      body: JSON.stringify({ profit_loss: profit_loss, share: share, time: time, price: price, margin: margin, action: action, update: update, date: date, quantity: quantity }),
    });
    const jsonfile = await response.json()
    return jsonfile

  }

);
export const getCarddata = createAsyncThunk(
  "stock/profitdata",
  async ({ month, year }) => {
    let url;
    if (month && year === "") {
      url = `${apiUrl}api/Carddata/?month=${month}`
    }
    else if (year && month === "") {
      url = `${apiUrl}api/Carddata/?year=${year}`
    }
    else if (month !== '' && year !== '') {
      url = `${apiUrl}api/Carddata/?month=${month}&year=${year}`
    } else {
      url = `${apiUrl}api/Carddata/`
    }
    let response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": " application/json",
        // "id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMjk3M2Q3MTBmZDc0YjU0MjA5MjVkIn0sImlhdCI6MTY5MTUyMjg3N30.5pBx7pQT_kFT8pPKtXzin8v_hB7ysbxMf0cvxoG1Eu0",
        "id": localStorage.getItem('id')

      },
    });
    const jsonfile = await response.json()

  //  console.log(jsonfile)
    return jsonfile

  }

);

export const getNews = createAsyncThunk(
  "stock/news",
  async ({ topic = "all", key = "" }) => {
    console.log(key, "ffff");
    try {
      let response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topic=${topic}&tickers=AAPL&apikey=${key}`);
      const jsonfile = await response.json()
      return jsonfile
    } catch (error) {
      console.log(error)
    }

  }
);
export const getStock = createAsyncThunk(
  "stock/stockmydata",
  async () => {
    const key = localStorage.getItem("stock")
    let response = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/1min/AAPL?apikey=${key}`);
    const jsonfile = await response.json()
  //  console.log(jsonfile)


  }
)
export const getSymbol = createAsyncThunk(
  "stock/symbol",
  async () => {
    const key = localStorage.getItem("stock")
    let response = await fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${key}`);
    const jsonfile = await response.json()
    // let array = []
    // array = await jsonfile.map((data) => {

    //   return (
    //     {
    //       value: data.symbol,
    //       label: data.name,
    //       // value: data.symbol,
    //       // label: data.name,
    //       // companysymbol:data.symbol,
    //       exchange: data.exchange,
    //       exchangeShortName: data.exchangeShortName,
    //       price: data.price,
    //       type: data.type
    //     })

    // })
    return await jsonfile


  }
)
export const pagedata = createAsyncThunk(
  "stock/mypagedata",
  async ({ name }) => {
    try {
      const response = await fetch(`${apiUrl}api/getwatchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'id': localStorage.getItem('id'),
        },
        body: JSON.stringify({ watchlistname: name }),
      });
      const jsonfile = await response.json();
      // console.log(jsonfile)
      return jsonfile;
    } catch (error) {
      console.error('Error in getwatchlistpagedata action:', error);
      throw error; // Re-throw the error for proper error handling.
    }
  }
)
export const getwatchlist = createAsyncThunk(
  "stock/watchlistarray",
  async () => {
    try {
      let response = await fetch(`${apiUrl}api/getwatchlistnames`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": " application/json",
          // "id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMjk3M2Q3MTBmZDc0YjU0MjA5MjVkIn0sImlhdCI6MTY5MTUyMjg3N30.5pBx7pQT_kFT8pPKtXzin8v_hB7ysbxMf0cvxoG1Eu0",
          "id": localStorage.getItem('id')

        },

      });
      const jsonfile = await response.json()
      // console.log(jsonfile);
      return jsonfile;
    } catch (error) {
      console.log(error)
    }

  }
)
export const modalview = createAsyncThunk(
  "stock/modal",
  async () => {
    const modalinfo = {
      state: false,
      yes: false,
      title: "",
      but2: "",
      but1: "",
      fun: () => {
      }
    }
    return modalinfo
  }
)
export const updatemodal = createAsyncThunk(
  "stock/updatemodaldata",
  async (data, thunkAPI) => {
    const currentState = thunkAPI.getState();
    const updatedModal = {
      ...currentState.stock.modaldata,
      ...data
    };

    // console.log(updatedModal, "bbb");

    if (updatedModal.yes === true && updatedModal.fun) {
      updatedModal.fun();
      updatedModal.yes = false
    }

    return updatedModal;
  }
)

export const removefromwatchlist = createAsyncThunk(
  "stock/removewatchlist",
  async (name, thunkAPI) => {
    try {
      let response = await fetch(`${apiUrl}api/deletewatchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "id": localStorage.getItem('id')
        },
        body: JSON.stringify({ watchlistname: name }),
      });
      const jsonfile = await response.json();

      if (jsonfile.success === true) {
        const currentState = thunkAPI.getState();
        let updatedWatchlist = currentState.stock.watchlistarray.array.filter(
          (item) => item.watchlistname !== name
        );
        updatedWatchlist = { ...currentState.stock.watchlistarray, array: updatedWatchlist, };
        // console.log(updatedWatchlist);
        return updatedWatchlist;

      } else {
        throw new Error("Failed to remove from watchlist");
      }
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error so it can be handled in your component.
    }

  }
)
export const createwatchlist = createAsyncThunk(
  "stock/createwatchlist",
  async (name, thunkAPI) => {
    try {
      let response = await fetch(`${apiUrl}api/createwatchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "id": localStorage.getItem('id')
        },
        body: JSON.stringify({ watchlistname: name }),
      });
      const jsonfile = await response.json();
      const { watchlistname, _id } = await jsonfile.savedata;

      if (jsonfile.success === true) {
        const currentState = thunkAPI.getState();
        // console.log(currentState.stock.watchlistarray)
        let updatedWatchlist = { array: [...currentState.stock.watchlistarray.array, { _id, watchlistname }] };
        // console.log(updatedWatchlist, "Fffff")
        return updatedWatchlist;

      }
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error so it can be handled in your component.
    }

  }
)
export const addtowatchlist = createAsyncThunk(
  "stock/addtowatchlist",
  async ({ watchlistname, dta, _id }, thunkAPI) => {
    try {
      let response = await fetch(`${apiUrl}api/addwatchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "id": localStorage.getItem('id')
        },
        body: JSON.stringify({ _id: _id, watchlistname: watchlistname, stock: dta }),
      });
      if (response.success === false) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const jsonfile = await response.json();
 
      // response.then(async (res) => {

      return jsonfile
    } catch (error) {
      console.log(error);
      // Re-throw the error so it can be handled in your component.
    }

  }
)
export const removelistofwatchlist = createAsyncThunk(
  "stock/removelist",
  async ({ watchlistname, value }, thunkAPI) => {
    try {
      let response = await fetch(`${apiUrl}api/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "id": localStorage.getItem('id')
        },
        body: JSON.stringify({ watchlistname: watchlistname, value: value }),
      });
      if (response.success === false) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const jsonfile = await response.json();
    
      // response.then(async (res) => {
      if (jsonfile.sucess === true) {
        const currentState = thunkAPI.getState();
        thunkAPI.dispatch(pagedata({ name: watchlistname }))

      }
      return jsonfile
    } catch (error) {
      console.log(error);
      // Re-throw the error so it can be handled in your component.
    }

  }
)

export const getStockInfo = createAsyncThunk(
  "stock/stockinfo",
  async (id) => {
    try {
      const key = localStorage.getItem("stock")
      let response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${id}?apikey=${key}`);
      const jsonfile = await response.json()
      return jsonfile[0]

    } catch (error) {
      console.log(error)
    }

  }
)
export const getStockgraph = createAsyncThunk(
  "stock/stockgraph",
  async ({ symbol, date, time }) => {
    try {
      const key = localStorage.getItem("stock") || ""
      let response = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${time}/${symbol}?from=${date}&to=${date}&apikey=${key}`);
      const jsonfile = await response.json()
      // let array =  jsonfile.map((data) => {
      //   return ({ time: data.date.slice(10), margin: data.open })
      // })
      // console.log(array, "tt")
      return jsonfile
    } catch (error) {
      console.log(error)
    }


  }
)
export const login = createAsyncThunk(
  "stock/accountlogin",
  async ({ email, password }) => {
    try {

      let response = await fetch(`${apiUrl}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const jsonfile = await response.json()
     
      return jsonfile
    } catch (error) {

    }


  }
)
export const getuserinfo = createAsyncThunk(
  "stock/userinfo",
  async () => {
    try {

      let response = await fetch(`${apiUrl}auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'id': localStorage.getItem('id')
        },
      });
      const jsonfile = await response.json()
      
      return jsonfile
    } catch (error) {

    }


  }
)
export const usergraphdata = createAsyncThunk(
  "stock/usergraphdata",
  async ({ month, year }) => {
    let url;
    if (month && year === "") {
      url = `${apiUrl}api/graphdata/?month=${month}`
    }
    else if (year && month === "") {
      url = `${apiUrl}api/graphdata/?year=${year}`
    }
    else if (month !== '' && year !== '') {
      url = `${apiUrl}api/graphdata/?month=${month}&year=${year}`
    } else {
      url = `${apiUrl}api/graphdata/`
    }
    let response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": " application/json",
        // "id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMjk3M2Q3MTBmZDc0YjU0MjA5MjVkIn0sImlhdCI6MTY5MTUyMjg3N30.5pBx7pQT_kFT8pPKtXzin8v_hB7ysbxMf0cvxoG1Eu0",
        "id": localStorage.getItem('id')

      },
    });
    const jsonfile = await response.json()

  //  console.log(jsonfile)
    return jsonfile

  }
)
export const usersignup = createAsyncThunk(
  "stock/usersignup",
  async ({ firstname, lastname, email, password }) => {
    try {

      let response = await fetch(`${apiUrl}auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",


        },
        body: JSON.stringify({ email: email, password: password, firstname: firstname, lastname: lastname }),
      });
      const jsonfile = await response.json()
      console.log(jsonfile, "userinfo")
      return jsonfile
    } catch (error) {
      console.log(error);
    }


  }
)
export const updateuserpersonalinfo = createAsyncThunk(
  "stock/updateuserinfo",
  async ({ userinfo }) => {
    try {
      console.log(userinfo);
      const formData = new FormData();
      for (const key in userinfo) {
        formData.append(key, userinfo[key]);
      }
      let response = await fetch(`${apiUrl}auth/updateuserinfo`, {
        method: "POST",
        headers: {
          "id": localStorage.getItem('id')
        },
        body: formData
      });
      const jsonfile = await response.json()
      console.log(jsonfile, "userinfo")
      return jsonfile
    } catch (error) {
      console.log(error);
    }


  }
)


const StockSlice = createSlice({
  name: "Stock",
  initialState: {
    userdata: ["rp", 'bvip', "ghj"],
    genres: [],
    profit: [],
    enablecarddata: true,
    enabledata: false,
    enableprofit: false,
    enablenews: false,
    news: [],
    graphdata: {},
    carddata: {},
    symbol: [],
    stockdata: [],
    enablesymbol: false,
    watchlistarray: [],
    graph: [],
    pg: [],
    add: {},
    signup: {},
    userinfo: {},
    update: {},
    logininfo: {},
    modaldata: {
      state: false,
      yes: true,
      title: "",
      but2: "",
      but1: "",
      yes: false,
      fun: () => {
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserdata.pending, (state, action) => {
      state.enabledata = true

    });
    builder.addCase(getUserdata.rejected, (state, action) => {
      state.userdata = [{ errors: "Error" }];

    });
    builder.addCase(getUserdata.fulfilled, (state, action) => {
      state.userdata = action.payload;
      state.enabledata = false;
    });
    builder.addCase(getCarddata.pending, (state, action) => {
      // state.enablecarddata=false

    });
    builder.addCase(getCarddata.rejected, (state, action) => {
      state.carddata = { errors: "Error" };

    });
    builder.addCase(getCarddata.fulfilled, (state, action) => {
      state.carddata = action.payload;
      // state.enablecarddata=true


    });
    builder.addCase(usergraphdata.pending, (state, action) => {
      // state.enablecarddata=false

    });
    builder.addCase(usergraphdata.fulfilled, (state, action) => {
      state.carddata = action.payload;
      // state.enablecarddata=true


    });
    builder.addCase(usergraphdata.rejected, (state, action) => {
      state.carddata = { errors: "Error" };
      // state.enablecarddata=true


    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.news = [{ errors: "Error" }];
    });
    builder.addCase(getStock.fulfilled, (state, action) => {
      state.news = action.payload;
      state.enablenews = true;
    });
    builder.addCase(getSymbol.fulfilled, (state, action) => {
      state.symbol = action.payload;
    });
    builder.addCase(getStockInfo.fulfilled, (state, action) => {
      state.stockdata = action.payload;
    });
    builder.addCase(getwatchlist.fulfilled, (state, action) => {
      state.watchlistarray = action.payload;
    });
    builder.addCase(createwatchlist.fulfilled, (state, action) => {
      state.watchlistarray = action.payload;
    });
    builder.addCase(removefromwatchlist.fulfilled, (state, action) => {
      state.watchlistarray = action.payload;
    });
    builder.addCase(getStockgraph.fulfilled, (state, action) => {
      state.graph = action.payload;
    });
    builder.addCase(deleteuserdata.fulfilled, (state, action) => {
      state.userdata = action.payload;
      state.enabledata = true;
    });
    builder.addCase(adduserdata.fulfilled, (state, action) => {
      state.add = action.payload;
    });
    builder.addCase(adduserdata.rejected, (state, action) => {
      state.add = { errors: 'errors' };
    });
    builder.addCase(updateuserdata.fulfilled, (state, action) => {
      state.update = action.payload;
    });
    builder.addCase(updateuserdata.rejected, (state, action) => {
      state.update = { errors: 'errors' };
    });
    builder.addCase(modalview.fulfilled, (state, action) => {
      state.modaldata = action.payload;
    });
    builder.addCase(updatemodal.fulfilled, (state, action) => {
      state.modaldata = action.payload;
    });
    builder.addCase(pagedata.fulfilled, (state, action) => {
      state.pg = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.logininfo = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.logininfo = { errors: "Error" };
    });
    builder.addCase(getuserinfo.fulfilled, (state, action) => {
      state.userinfo = action.payload;
    });
    builder.addCase(getuserinfo.rejected, (state, action) => {
      state.userinfo = { errors: "Error" };
    });
    builder.addCase(updateuserpersonalinfo.fulfilled, (state, action) => {
      state.userinfo = action.payload;
    });
    builder.addCase(updateuserpersonalinfo.rejected, (state, action) => {
      state.userinfo = { errors: "Error" };
    });
    builder.addCase(usersignup.fulfilled, (state, action) => {
      state.signup = action.payload;
    });
    builder.addCase(usersignup.rejected, (state, action) => {
      state.signup = { errors: "Error" };
    });


  }
})
export const setTabKey = createAsyncThunk(
  'dash/setTabKey',
  async ({ item }, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState();
      const updatedTab = { ...currentState.dash.tab };

      for (const key in updatedTab) {
        updatedTab[key] = item === key;
      }

      // console.log(updatedTab);
      return updatedTab;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const serachdatabystockname = createAsyncThunk(
  "serachdatabystockname",
  async ({ stockname, startDate, endDate }) => {
    // console.log(startDate, endDate);
    try {
      let response = await fetch(`${apiUrl}api/specificdata/${stockname}?startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "id": localStorage.getItem('id')
        },

      });
      const jsonfile = await response.json()

      return jsonfile
    } catch (error) {

    }


  }
)

const dashSlice = createSlice({
  name: 'dash',
  initialState: {
    tab: {
      home: false,
      stock: false,
      news: false,
      watchlist: false,
      settings: false,
      feedback: false,
      ledger: false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTabKey.fulfilled, (state, action) => {
      state.tab = action.payload;
    });
  },
});
const SearchSlice = createSlice({
  name: 'Serachdata',
  initialState: {
    data: {}
  },
  extraReducers: (builder) => {
    builder.addCase(serachdatabystockname.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
export const responseToastSlice = createSlice({
  name: "responseToast",
  initialState: {
    responseToast: false,
    status: "",
    text: [],
    loading: false,
  },
  reducers: {
    setResponseToast: (state, action) => {
      state.responseToast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload.success === true) {
        state.status = "success"
        state.text = ['Login Successfully']
      }
      if (action.payload.success === false) {
        state.status = "fail"
        state.text = [`${action.payload.errors}`]
      }


    });
    builder.addCase(login.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Login Failed']



    });
    builder.addCase(usersignup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(usersignup.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload.success === true) {
        state.status = "success"
        state.text = ['Account created Successfully']
      }
      if (action.payload.success === false) {
        state.status = "fail"
        state.text = [`${action.payload.errors}`]
      }


    });
    builder.addCase(usersignup.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Creation Failed']



    });


    builder.addCase(getuserinfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getuserinfo.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload?.success === true) {
        state.status = "success"
        state.text = ['userinfo  fetch Successfully']
      }
      if (action.payload?.success === false) {
        state.status = "fail"
        state.text = [`${action.payload.errors}`]
      }


    });
    builder.addCase(getuserinfo.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = [' Failed']



    });
    builder.addCase(updateuserpersonalinfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateuserpersonalinfo.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload.success === true) {
        state.status = "success"
        state.text = [`${action.payload.message}`]
      }
      if (action.payload.success === false) {
        state.status = "fail"
        state.text = [`${action.payload.errors}`]
      }


    });
    builder.addCase(updateuserpersonalinfo.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = [' Failed']



    });
    builder.addCase(adduserdata.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adduserdata.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload.success === true) {
        state.status = "success"
        state.text = [`${action.payload.message}`]
      }
      if (action.payload.success === false) {
        state.status = "fail"
        state.text = action.payload.errors ? action.payload.errors.map((dta) => dta) : []
      }


    });
    builder.addCase(adduserdata.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Failed']



    });
    builder.addCase(updateuserdata.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateuserdata.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload.success === true) {
        state.status = "success"
        state.text = [`${action.payload.message}`]
      }
      if (action.payload.success === false) {
        state.status = "fail"
        state.text = action.payload.errors ? action.payload.errors.map((dta) => dta) : []
      }


    });
    builder.addCase(updateuserdata.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Failed']



    });
    builder.addCase(deleteuserdata.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteuserdata.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload.success === true) {
        state.status = "success"
        state.text = [`${action.payload.message}`]
      }
      if (action.payload.success === false) {
        state.status = "fail"
        state.text = [`${action.payload.errors}`]
      }


    });
    builder.addCase(deleteuserdata.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Failed']



    });
    builder.addCase(createwatchlist.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createwatchlist.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false

      state.status = "success"
      state.text = [`Watchlist created Successfully`]



    });
    builder.addCase(createwatchlist.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Failed']

    });
    builder.addCase(addtowatchlist.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addtowatchlist.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload.success === true) {
        state.status = "success"
        state.text = [`${action.payload.message}`]
      }
      if (action.payload.success === false) {
        state.status = "fail"
        state.text = [`${action.payload.errors}`]
      }



    });
    builder.addCase(addtowatchlist.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Failed']

    });
    builder.addCase(removelistofwatchlist.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removelistofwatchlist.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload.success === true) {
        state.status = "success"
        state.text = [`Remove Successfully`]
      }
      if (action.payload.success === false) {
        state.status = "fail"
        state.text = [`${action.payload.errors}`]
      }



    });
    builder.addCase(removefromwatchlist.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removefromwatchlist.fulfilled, (state, action) => {
      state.responseToast = true
      state.loading = false
      if (action.payload.success === true) {
        state.status = "success"
        state.text = [`Remove Successfully`]
      }
      if (action.payload.success === false) {
        state.status = "fail"
        state.text = [`${action.payload.errors}`]
      }



    });
    builder.addCase(removefromwatchlist.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Failed']

    });
    builder.addCase(getNews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {

      if (!action.payload.feed) {
        state.responseToast = true
        state.loading = false
        state.status = "fail"
        state.text = [`${action.payload?.["Error Message"]
          || " api limit  passed"}`]
      }
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Failed']
    });
    builder.addCase(getSymbol.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSymbol.fulfilled, (state, action) => {
      console.log(111111111);
      if (!Array.isArray(action.payload)) {
        state.responseToast = true
        state.loading = false
        state.status = "fail"
        state.text = [`${action.payload?.["Error Message"]
          || " api limit  passed"}`]
      }


    });
    builder.addCase(getSymbol.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Failed']
    });
    builder.addCase(getStockgraph.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getStockgraph.fulfilled, (state, action) => {
      console.log(111111111);
      if (!Array.isArray(action.payload)) {
        state.responseToast = true
        state.loading = false
        state.status = "fail"
        state.text = [`${action.payload?.["Error Message"]
          || " api limit  passed"}`]

      }

    });
    builder.addCase(getStockgraph.rejected, (state, action) => {
      state.responseToast = true
      state.loading = false
      state.status = "error"
      state.text = ['Failed']
    });
  }


})

export const { setResponseToast } = responseToastSlice.actions
export const store = configureStore({
  reducer: {
    stock: StockSlice.reducer,
    dash: dashSlice.reducer,
    Search: SearchSlice.reducer,
    toastfile: responseToastSlice.reducer,
    apikey: apikeySlice.reducer
  },
  middleware: [thunkMiddleware],
});
