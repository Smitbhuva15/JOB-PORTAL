import React from 'react'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters, clearFilters } from '../../store/jobSlice'

const FilterItem = () => {
  const dispatch = useDispatch()
  const currentFilters = useSelector(store => store.job.filters)

  const filterData = [
    {
      filterType: "Location",
      key: "location",
      array: ["Delhi", "Surat", "Ahmedabad", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
      filterType: "Job Type",
      key: "jobType",
      array: ["Full Time", "Part Time"]
    },
    {
      filterType: "Salary Range",
      key: "salary",
      array: ["0 - 5 LPA", "5 - 10 LPA", "10 - 20 LPA", "20+ LPA"]
    },
    {
      filterType: "Experience",
      key: "experience",
      array: ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"]
    }
  ]

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }))
  }

  return (
    <div className='w-full bg-card border border-border p-5 rounded-2xl shadow-sm'>
      <div className="flex items-center justify-between mb-2">
        <h1 className='font-bold text-lg text-foreground font-heading'>Filter Jobs</h1>
        {Object.values(currentFilters).some(v => v !== "") && (
          <Button variant="ghost" size="sm" onClick={() => dispatch(clearFilters())} className="h-8 text-xs px-2 text-destructive hover:text-destructive hover:bg-destructive/10">
            Clear All
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4">Refine your search results</p>
      <hr className='mb-6 border-border' />
      
      <div className="space-y-8">
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className='font-semibold text-base text-foreground mb-3'>{data.filterType}</h2>
            <RadioGroup 
              value={currentFilters[data.key]} 
              onValueChange={(value) => handleFilterChange(data.key, value)} 
              className="space-y-2.5"
            >
              {data.array.map((item, idx) => (
                <div className='flex items-center space-x-3 group' key={idx}>
                  <RadioGroupItem 
                    value={item}   
                    id={`filter-${data.key}-${idx}`}
                    className="border-primary/50 text-primary data-[state=checked]:bg-primary"
                  />
                  <Label 
                    htmlFor={`filter-${data.key}-${idx}`}
                    className="text-sm text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterItem