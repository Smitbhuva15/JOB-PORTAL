import React from 'react'
import { data } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Label } from '../../components/ui/label'

const FilterItem = () => {

  const filterData = [
    {
      fitlerType: "Location",
      array: ["Delhi", "Surat", "Ahmedabad", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
      fitlerType: "Industry",
      array: ["Frontend Developer", "UI/UX Designer", "Data Science", "Backend Developer", "Digital Marketer", "FullStack Developer"]
    },
    {
      fitlerType: "Salary",
      array: ["0-50k", "51k-1lakh", "1lakh-3lakh", "3lakh to 5lakh"]
    },
  ]

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup >
        {
            filterData.map((data, index) => (
              <div key={index}>
                  <h1 className='font-bold text-lg' >{data.fitlerType}</h1>
                  {
                      data.array.map((item, idx) => 
                         
                           (
                              <div className='flex items-center space-x-2 my-2' key={idx}>
                                  <RadioGroupItem value={item}  />
                                  <Label>{item}</Label>
                              </div>
                          )
                      )
                  }
              </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterItem