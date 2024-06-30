import {
    createAsyncThunk,
    configureStore,
    createSlice,
    applyMiddleware
} from '@reduxjs/toolkit';
import axios from 'axios'
import { useState } from 'react'
import thunkMiddleware from 'redux-thunk';



export const changedashtab = createAsyncThunk(
    "dash/slice",
    async (tab) => {
        try {
             let current_tab=tab
            return current_tab
        } catch (error) {
            console.log(error)
        }

    }

);
const dashSlice = createSlice({
    name: "dashslice",
    initialState: {
      dashstate:" "
    },
    extraReducers: (builder) => {
      builder.addCase(changedashtab.fulfilled, (state, action) => {
        state.dashstate = action.payload;
      });
    }
  })
