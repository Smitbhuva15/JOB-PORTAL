import { createSlice } from '@reduxjs/toolkit'

const getInitialSavedJobs = () => {
  try {
    const item = localStorage.getItem('job-portal-saved-jobs');
    return item ? JSON.parse(item) : [];
  } catch (error) {
    return [];
  }
};

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
    Alljobs:[],
    AdminJobs:[],
    searchjobtext:"",
    singlejob:[],
    applyjob:[],
    searchdata:"",
    searchjobdata:"",
    savedJobs: getInitialSavedJobs()
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
   toggleSavedJob: (state, action) => {
    const job = action.payload;
    const exists = state.savedJobs.find(j => j._id === job._id);
    if (exists) {
      state.savedJobs = state.savedJobs.filter(j => j._id !== job._id);
    } else {
      state.savedJobs.push(job);
    }
    localStorage.setItem('job-portal-saved-jobs', JSON.stringify(state.savedJobs));
   }
  }
})

export const { getalljob, getadminjob, getjobtext, getsinglejob, getapplyjob, setsearchjob, getsearchjobtext, toggleSavedJob } = jobSlice.actions

export default jobSlice.reducer