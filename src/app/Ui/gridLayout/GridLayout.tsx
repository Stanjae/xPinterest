'use client'
import { ChevronDoubleLeftIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { Button, Divider } from '@nextui-org/react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import CreatePinForm from '../forms/CreatePinForm'

const GridLayout = ({boards}:any) => {

const variants = {
    open: { opacity: 1, width: 320 },
    closed: { opacity: 1, width:100 },
}

const variant02 = {
  open: {  opacity:1 , display:'block'},
  closed: { opacity: 0, display:'none'}
}

const [isOpen, setIsOpen] = useState<boolean>(true)
  return (
    <section className=" min-h-screen overflow-y-hidden flex">
       <motion.div layout animate={isOpen ? "open" : "closed"} variants={variants} 
       className={` w-80 border-r border-r-foreground/20`}>
        <section className='p-4 space-y-5'>
          <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} `}>
            <motion.span variants={variant02} animate={isOpen ? "open":"closed"} className="text-xl font-medium">Draft Pins</motion.span>
            <Button isIconOnly size='lg' radius='full' variant='shadow' onClick={() => setIsOpen(isOpen => !isOpen)}>
              <ChevronDoubleLeftIcon className='w-5 h-5'/>
            </Button>
          </div>
          <div>
            {isOpen ? <Button size='lg' className='block w-full' radius='full' variant='flat'>Create</Button> : 
                      <Button size='lg' isIconOnly radius='full' variant='shadow'><PlusCircleIcon className='h-5 w-5'/></Button>}
          </div> 
        </section>
        <Divider/>
        
       </motion.div>
        <motion.div className={` relative flex-1 grow-1`}>
            <div className='p-5 border-b font-semibold text-xl border-b-foreground/20'>Create Pin</div>
              <CreatePinForm boards={boards} isOpen={isOpen}/>
        </motion.div>

    </section>
  )
}

export default GridLayout