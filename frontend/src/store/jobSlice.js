import { createSlice } from '@reduxjs/toolkit'

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
    Alljobs:[],
    AdminJobs:[],
    searchjobtext:""
  },
  reducers: {
   getalljob:(state, action)=>{
    state.Alljobs=action.payload
   },
   getadminjob:(state, action)=>{
    state.AdminJobs=action.payload
   },
   getjobtext:(state, action)=>{
    state.searchjobtext=action.payload
   },

   
  }
})


export const { getalljob,getadminjob,getjobtext } = jobSlice.actions

export default jobSlice.reducer