import { createSlice } from '@reduxjs/toolkit'

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    Singlecompany:null,
    AllCompany:[],
    isupdate:false,
    searchtext:""
  },
  reducers: {
   getsinglecompany:(state, action)=>{
    state.Singlecompany=action.payload
   },
   getallcompany:(state,action)=>{
    state.AllCompany=action.payload
   },
   getstateinfo:(state,action)=>{
    state.isupdate=!state.isupdate
   },
   setserachtext:(state,action)=>{
    state.searchtext=action.payload
   },
  }
})


export const { getsinglecompany,getallcompany,getstateinfo,setserachtext } = companySlice.actions

export default companySlice.reducer