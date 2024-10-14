'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DefaultLogo from '../../../../public/Xlogo1.png'
import DarkLogo from '../../../../public/dark-logo.png'
import Link from 'next/link'
import { useTheme } from 'next-themes'



const MobileLogoNav = () => {
    const [isLight, setIsLight] = useState<boolean>()
    const { theme, setTheme } = useTheme()

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
    </ul>
  )
}

export default MobileLogoNav