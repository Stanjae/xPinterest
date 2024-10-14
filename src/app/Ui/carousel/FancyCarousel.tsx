'use client'
import React from 'react'
import {AnimatePresence, motion} from "framer-motion"
import { trees } from '@/app/utils/bg_images'
import './carousel.css'


const ITEMS_PER_ROLL = 7
const Rolls = Math.ceil(trees.length/ITEMS_PER_ROLL)

const FancyCarousel = () => {
    const [index, setIndex] = React.useState(1)

    React.useEffect(()=>{
        const interval = setInterval(()=>{
            setIndex((prev)=>(prev == Rolls ? 1 : prev+1))
        },7500)
        return ()=>clearInterval(interval)
    },[])

    
    const prev =  (index - 1) * ITEMS_PER_ROLL
    const next = (index * ITEMS_PER_ROLL)
  return (
    <section className='md:grid hidden border-0 outline-none border-collapse bg-blend-overlay w-screen 
    bg-background max-h-72  overflow-hidden gap-x-8 grid-cols-7'>
            <AnimatePresence>
                {trees.slice(prev, next).map((item:any,index:number)=>(
                    <motion.div key={index} 
                    initial={{opacity:1}}
                    animate={{ y: [0,-400, 0, 400, 0, -400 ], 
                        display:['inline-block','none','none','none','inline-block','none'] ,
                        scale: [1, 0, 0, 0, 1, 0],
                        opacity: [ 1, 0, 0, 0, 1, 0] }}
                    exit={{opacity:0}}
                    transition={{
                        duration: 15,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 0 + index/10
                    }}
                        className={`${item.class} ${index == 0 || index == 6 || index == 7 || index == 13 ? 'mt-0' 
                            : index == 1 || index == 5 || index == 8 || index == 12 ? 'mt-24' 
                            : index == 2 || index == 4 || index == 9 || index == 11 ? 'mt-48' 
                            : 'mt-72'} z-40 rounded-lg w-48 bg-cover py-4 col-span-1 h-48`}>
                    </motion.div>
                ))}
            </AnimatePresence>
        </section>
  )
}

export default FancyCarousel