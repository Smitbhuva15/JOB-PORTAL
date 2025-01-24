import { createSlice } from '@reduxjs/toolkit'

export const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    applicantJobs:[],
   
  },
  reducers: {
  
    getApplicantdata:(state,action)=>{
        state. applicantJobs=action.payload
    }

   
  }
})


export const { getApplicantdata } = applicationSlice.actions

export default applicationSlice.reducer