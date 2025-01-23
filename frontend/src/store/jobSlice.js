import { createSlice } from '@reduxjs/toolkit'

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
    Alljobs:[]
  },
  reducers: {
   getalljob:(state, action)=>{
    state.Alljobs=action.payload
   }
  }
})


export const { getalljob } = jobSlice.actions

export default jobSlice.reducer