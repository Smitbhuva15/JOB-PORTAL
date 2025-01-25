import { createSlice } from '@reduxjs/toolkit'

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
    Alljobs:[],
    AdminJobs:[],
    searchjobtext:"",
    singlejob:[],
    applyjob:[],
    searchdata:"",
    searchjobdata:""
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
   getapplyjob:(state, action)=>{
    state.applyjob=action.payload
   },
   setsearchjob:(state, action)=>{
    state.searchdata=action.payload
   },
   getsearchjobtext:(state, action)=>{
    state.searchjobdata=action.payload
   },

   
  }
})


export const { getalljob,getadminjob,getjobtext,getsinglejob,getapplyjob,setsearchjob,getsearchjobtext } = jobSlice.actions

export default jobSlice.reducer