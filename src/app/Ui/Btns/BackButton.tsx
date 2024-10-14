'use client'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = ({className}:{className?:string}) => {
    const router = useRouter()
  return (
    <Button className={className} variant='ghost' onClick={()=> router.back()} radius='full' isIconOnly><ArrowLeftIcon className=' h-5 w-5'/></Button>
  )
}

export default BackButton
