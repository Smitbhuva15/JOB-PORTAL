import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import jobReducer from './jobSlice'

export default configureStore({
    reducer: {
        user:userReducer,
        job:jobReducer

    }
  })