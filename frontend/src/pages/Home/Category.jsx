import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel"
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { setsearchjob } from '../../store/jobSlice'
import { useDispatch } from 'react-redux'

const Category = () => {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Data Science",
    "Mobile App Developer",
    "Graphic Designer",
    "Software Engineer",
    "Digital Marketer",
    "FullStack Developer"
  ]
  const navigate = useNavigate()
  const dispatch=useDispatch()

 const handelsearch = (cat) => {
   
    navigate('/browse')
    dispatch(setsearchjob(cat))
  console.log(cat)
  }

  return (
    <>
      <Carousel className=" w-[60%] md:max-w-2xl  mx-auto my-20">
        <CarouselContent>
          {
            category.map((cat, i) => (
              <CarouselItem className="md:basis-1/2 lg-basis-1/3  " key={i} >
                <Button variant="outline" className="rounded-full " onClick={()=>{ handelsearch(cat)}}>{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}

export default Category