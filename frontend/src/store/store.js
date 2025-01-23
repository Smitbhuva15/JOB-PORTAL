import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import jobReducer from './jobSlice'
import companyReducer from './companyslice'

export default configureStore({
    reducer: {
        user:userReducer,
        job:jobReducer,
        company:companyReducer

    }
  })