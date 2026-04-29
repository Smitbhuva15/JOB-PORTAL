import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Label } from '../../components/ui/label'
import { useDispatch } from 'react-redux'
import { getsearchjobtext, setsearchjob } from '../../store/jobSlice'

const FilterItem = () => {

  const filterData = [
    {
      fitlerType: "Location",
      array: ["Delhi", "Surat", "Ahmedabad", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
      fitlerType: "Industry",
      array: ["Frontend Developer", "UI/UX Designer", "Data Science", "Backend Developer", "Digital Marketer", "FullStack Developer","Cloud Engineer"]
    },
    
  ]

  const [selectedValue, setSelectedValue] = useState('');
  const dispatch=useDispatch()

  const handelchanges=(value)=>{
     setSelectedValue(value)
  }

  useEffect(() => {
    dispatch( getsearchjobtext(selectedValue))
    // console.log(selectedValue)
  }, [selectedValue]);

  return (
    <div className='w-full bg-card border border-border p-5 rounded-2xl shadow-sm'>
      <h1 className='font-bold text-lg text-foreground mb-1 font-heading'>Filter Jobs</h1>
      <p className="text-sm text-muted-foreground mb-4">Refine your search results</p>
      <hr className='mb-4 border-border' />
      <RadioGroup value={selectedValue} onValueChange={handelchanges} className="space-y-6">
        {
            filterData.map((data, index) => (
              <div key={index}>
                  <h2 className='font-semibold text-base text-foreground mb-3' >{data.fitlerType}</h2>
                  <div className="space-y-2.5">
                  {
                      data.array.map((item, idx) => 
                           (
                              <div className='flex items-center space-x-3 group' key={idx}>
                                  <RadioGroupItem 
                                    value={item}   
                                    key={index * 100 + idx}
                                    id={`filter-${index}-${idx}`}
                                    className="border-primary/50 text-primary data-[state=checked]:bg-primary"
                                  />
                                  <Label 
                                    htmlFor={`filter-${index}-${idx}`}
                                    className="text-sm text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors"
                                  >
                                    {item}
                                  </Label>
                              </div>
                          )
                      )
                  }
                  </div>
              </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterItem