import React from 'react'
import FancyCarousel from '../carousel/FancyCarousel'
import MainNavBar from '../Navigation/MainNavBar'
import { TypewriterEffectSmooth } from '../Typography/TypeWriterEffect';
import { MeteorEffect } from '../meteors/MeteorEffect';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const words = [
  {
    text: "Build",
  },
  {
    text: "awesome",
  },
  {
    text: "ideas",
  },
  {
    text: "with",
  },
  {
    text: "XPinterest.",
    className: "text-primary-500",
  },
];



const CarouselPage = () => {
    
  return (
    <div className=' relative overflow-hidden min-h-dvh'>
        <MainNavBar/>
        <div className=' mt-80 md:mt-20 mb-5 py-5 text-center'>
          <h1 className=' text-3xl md:text-6xl font-bold leading-tight text-center text-foreground'>
          Get your next
          </h1>
          <TypewriterEffectSmooth words={words} />
        </div>
        <div className="flex md:hidden justify-center gap-5 items-center">
          <Button variant="ghost" size="lg" radius="full" color="primary">Get Started</Button>
          <Button variant="solid" as={Link} href="/auth/login" size="lg" radius="full" color="primary">Login</Button>
        </div>
        <MeteorEffect number={20} />
        <FancyCarousel/>
    </div>
  )
}

export default CarouselPage