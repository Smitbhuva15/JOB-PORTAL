import React from 'react'

const FilterItem = () => {

  const fitlerData = [
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
    <div>FilterItem</div>
  )
}

export default FilterItem