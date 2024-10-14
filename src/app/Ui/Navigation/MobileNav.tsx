'use client'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { usePathname } from 'next/navigation';
import { mobileNavLinks } from './navs';
import Link from 'next/link';
import SwitchBtn from '../switches/SwitchBtn';
import { Button } from '@nextui-org/react';
import NavbarAvatar from '../avatar/NavbarAvatar';

export default function MobileNavDrawer({open, setOpen}:any) {
  const {isAuthenticated, getUser} = useKindeBrowserClient();
  const user = getUser();
  const pathname = usePathname()

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-xs transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-background py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-base font-semibold leading-6 text-foreground/90">XPinterest</DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <ul className=' space-y-4'>
                      {!pathname.includes('auth') && mobileNavLinks.map((item:any)=>{
                          if(item.title === "Create" && !isAuthenticated) {
                              return null
                          }
                          return (<li key={item.title}>
                              <Link href={item.url} 
                              className={`${pathname == item.url ? 'text-primary' : 'text-foreground hover:text-primary'} font-medium text-lg`}>{item.title}</Link>
                          </li>)
                      })}
                  </ul>
                  <div className="my-5">
                    {!isAuthenticated ?
                    <Button as={Link} href='/auth/login' size="lg" variant='solid' color="primary" 
                    radius='full' className=' w-full'>Log in</Button>
                    :
                    <NavbarAvatar image={user?.picture} username={user?.email?.split('@')[0]} name={user?.given_name}/>
                    }
                  </div>
                  <SwitchBtn/>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
