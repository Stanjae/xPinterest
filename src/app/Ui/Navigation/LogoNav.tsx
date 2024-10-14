'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DefaultLogo from '../../../../public/Xlogo1.png'
import DarkLogo from '../../../../public/dark-logo.png'
import Link from 'next/link'
import { nav1 } from './navs'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";


const LogoNav = () => {
    const [isLight, setIsLight] = useState<boolean>()
    const { theme, setTheme } = useTheme()

    const {isAuthenticated} = useKindeBrowserClient();

    const pathname = usePathname()

    useEffect(() => {
        if(theme == 'dark'){
           setIsLight(false) 
        }else{
           setIsLight(true)
        }
    }, [theme])

    const toogleLogo = isLight ? DefaultLogo : DarkLogo
  return (
    <ul className=' flex items-center gap-x-4'>
        <Link href={'/'} className=' inline-block'>
            <Image priority className=' w-36 h-auto' width={144} height={32} src={toogleLogo} alt='logo'/>
        </Link>
        
        {!pathname.includes('auth') && nav1.map((item:any)=>{
            if(item.title === "Create" && !isAuthenticated) {
                return null
            }
            return (<li key={item.title}>
                <Link href={item.url} 
                className={`${pathname == item.url ? 'text-primary' : 'text-foreground hover:text-primary'} font-medium text-base`}>{item.title}</Link>
            </li>)
        })}
    </ul>
  )
}

export default LogoNav