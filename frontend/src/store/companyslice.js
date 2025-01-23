import { createSlice } from '@reduxjs/toolkit'

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    Singlecompany:null
  },
  reducers: {
   getsinglecompany:(state, action)=>{
    state.Singlecompany=action.payload
   }
  }
})


export const { getsinglecompany } = companySlice.actions

export default companySlice.reducer