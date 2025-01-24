import { createSlice } from '@reduxjs/toolkit'

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
    Alljobs:[],
    AdminJobs:[],
    searchjobtext:"",
    singlejob:[]
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
   getsinglejob:(state, action)=>{
    state.singlejob=action.payload
   },

   
  }
})


export const { getalljob,getadminjob,getjobtext,getsinglejob } = jobSlice.actions

export default jobSlice.reducer