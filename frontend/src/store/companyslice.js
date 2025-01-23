import { createSlice } from '@reduxjs/toolkit'

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    Singlecompany:null,
    AllCompany:[],
    isupdate:false
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
   }

  }
})


export const { getsinglecompany,getallcompany,getstateinfo } = companySlice.actions

export default companySlice.reducer