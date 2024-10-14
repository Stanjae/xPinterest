import React from 'react'
import LogoNav from './LogoNav'
import RightNav from './RightNav'
import SwitchBtn from '../switches/SwitchBtn'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import NavbarAvatar from '../avatar/NavbarAvatar'
import SearchField from '../Inputs/SearchField'
import MobileLogoNav from './MobileLogoNav'
import MobileNavWrapper from './MobileNavWrapper'



const MainNavBar = async() => {
  const {isAuthenticated, getUser} = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();
  return (
    <div className='border-0 fixed w-full bg-background shadow-sm z-50 top-0 left-0 border-b-foreground/25'>
        <nav className=' hidden max-w-7xl py-5 gap-x-2 md:flex justify-between mx-auto'>
           <LogoNav/>
            <SearchField/>
            <div className="flex gap-x-3 items-center">
                <RightNav/>
                <SwitchBtn/>
                {!isUserAuthenticated ?
                <Button as={Link} href='/auth/login' variant='solid' color="primary" 
                radius='full' className=''>Log in</Button>
                :
                <NavbarAvatar image={user?.picture} username={user?.email?.split('@')[0]} name={user?.given_name}/>
                }
            </div>
        </nav>

        <nav className='flex max-w-7xl py-5 px-5 md:px-0 gap-x-2 md:hidden justify-between mx-auto'>
          <MobileLogoNav/>
          <MobileNavWrapper/>
        </nav>
    </div>
  )
}

export default MainNavBar