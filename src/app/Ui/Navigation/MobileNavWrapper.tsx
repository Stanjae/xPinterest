'use client'
import { Bars3BottomRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Button, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import MobileNavDrawer from './MobileNav'
import MobileSearchModal from '../modals/MobileSearchModal'

const MobileNavWrapper = () => {
    const [open, setOpen] = useState(false)
    const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <div className=' flex gap-3 items-center'>
      <Button onPress={() => onOpen()} isIconOnly radius='md' variant='light'>
        <MagnifyingGlassIcon className=" h-5 w-5 text-foreground/75"/>
      </Button>
      <Button isIconOnly onClick={() => setOpen(true)} radius='md' size="lg" variant='bordered'>
        <Bars3BottomRightIcon className=" h-7 w-7 text-foreground/75"/>
      </Button>
      <MobileNavDrawer open={open} setOpen={setOpen}/>
      <MobileSearchModal isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
    </div>
  )
}

export default MobileNavWrapper
