'use client'
import React from 'react'
import { nav2 } from './navs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const RightNav = () => {
  const pathname = usePathname()
  return (
    <ul className=' flex items-center gap-x-3'>
        {nav2.map((item:any)=>(
            <li key={item.title}>
                <Link href={item.url} className={` ${pathname === item.url ? 'text-primary' : 'text-foreground hover:text-primary'} font-medium text-base`}>{item.title}</Link>
            </li>
        ))}
    </ul>
  )
}

export default RightNav