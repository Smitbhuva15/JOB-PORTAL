import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel"
import { Button } from '../../ui/button'

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

  return (
    <>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {
            category.map((cat, i) => (
              <CarouselItem className="md:basis-1/2 lg-basis-1/3 " key={i}>
                <Button variant="outline" className="rounded-full ">{cat}</Button>
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