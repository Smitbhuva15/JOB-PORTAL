import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userinfo:null,
  },
  reducers: {
   setuser:(state, action)=>{
    state.userinfo=action.payload
   }
  }
})


export const { setuser } = userSlice.actions

export default userSlice.reducer