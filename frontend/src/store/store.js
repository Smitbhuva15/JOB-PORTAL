import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import jobReducer from './jobSlice'
import companyReducer from './companyslice'
import applicationReducer from './applicationSlice'

export default configureStore({
    reducer: {
        user:userReducer,
        job:jobReducer,
        company:companyReducer,
        application:applicationReducer


    }
  })