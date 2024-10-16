import React from 'react'
import Image from 'next/image'
import './landing.css'
import WhiteLogo from '../../../../public/blacknwhite.png'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import GoogleIcon from '../../../../public/google (1).png'

const DefaultPage = () => {
  return (
    <div>
        <section className='bg-image min-h-dvh bg-overlay bg-blend-overlay flex justify-center items-center'>
                <div className=' space-y-4 max-w-3xl w-full z-10 '>
                    <Image width={48} height={48} className=' w-12 h-12 block mx-auto' src={WhiteLogo} alt="white logo"/>
                    <h1 className='text-4xl leading mb-4 text-pretty tracking-wide text-white text-center font-bold'>Welcome to <br/> XPinterest</h1>
                    <div className='flex justify-center items-center gap-3 flex-col'>
                        <Button size="md" variant="solid" radius="full" color="primary" href="" as={Link}>Continue with email</Button>
                        <Button size="md" startContent={<Image className="h-4 w-4" width={16} height={16} src={GoogleIcon} alt='google'/>}
                        className=' bg-white text-slate-900' variant="solid" radius="full" color="primary" href="" as={Link}>Continue with Google</Button>
                    </div>
                    <div className=' my-7 text-center text-white text-sm'>
                      <p><Link href={'/auth/login'}>Already a member? Login</Link></p>
                      {/* <p className='mt-10'>Are you a Business ? <Link href={'/auth/signup'}>Get Started here</Link></p> */}
                      <p className='text-xs mt-6'>By continuing, you agree with XPinterest Terms of Service and acknowledge you &apos; ve 
                        read our Privacy Policy. Notice at Collection</p>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default DefaultPage