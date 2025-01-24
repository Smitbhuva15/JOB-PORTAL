import GetApplicant from '../../FechingData/GetApplicant';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ApplicantsTable from './ApplicantsTable';

const AdminApplicaton = () => {
  const params = useParams()
  const jobId = params.id;
  // console.log(jobId)
  GetApplicant(jobId);

  const applicants = useSelector(store => store.application.applicantJobs)
  // console.log(applicants)

  return (
    <div className='max-w-7xl mx-auto pt-11'>
      <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
      <ApplicantsTable />
    </div>
  )
}

export default AdminApplicaton