import React from 'react'
import LogoNav from './LogoNav'
import SwitchBtn from '../switches/SwitchBtn'
import { Button } from '@nextui-org/react'

const AuthNav = () => {
  return (
    <div className=' border-b border-b-foreground/25'>
        <nav className=' max-w-7xl py-5 flex justify-between mx-auto'>
           <LogoNav/>
            <div></div>
            <div className="flex gap-x-3 items-center">
                <SwitchBtn/>
                <Button  variant='solid' color="primary" 
                radius='full' className=''>Download</Button>
            </div>
        </nav>
    </div>
  )
}

export default AuthNav