'use client'
import React from 'react'
import Image from "next/image";
import { Button, DropdownSection, useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import {  EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn} from "@nextui-org/react";
import './cards.css'
import ShareBtnModal from '../modals/ShareBtnModal';
import { SinglePinType } from '@/app/lib/definitions';
import { handleDownload } from '@/app/lib/utilityClient';
import SavedModal from '../modals/SavedModal';

const homepageUrl = `${process.env.KINDE_SITE_URL}`

const ImageCard = ({pin, param}:{pin:SinglePinType ;param:any }) => {
    const [showImage, setShowImage] = React.useState(false)
    const previewLink = pin?.url_location?.replace('https://','')
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div>
      <div className='relative'>
        <Image width={400} onMouseEnter={() => setShowImage(true)}  className="rounded-2xl"
                      height={800}
                      src={pin?.pin_image}
                      alt={pin?.name}
                      />
          {showImage && <div onMouseLeave={() => setShowImage(false)}
              className="cursor-zoom-in flex transition-all duration-700 absolute w-full p-5 rounded-2xl left-0 top-0 h-full bg-foreground/75 flex-col justify-between">
              <div className="flex justify-end">
                  <Button variant='solid' onPress={onOpen} radius="full" size='lg' color='primary'>Save</Button>
              </div>

              <div className='flex items-center justify-between'>
                  {pin?.url_location && <Button as={Link} size="sm" href={pin?.url_location} className=' text-ellipsis overflow-hidden whitespace-nowrap' target='_blank' variant='faded' radius="full" color='primary'>{previewLink}</Button>}
                  <div className='flex gap-x-3 items-center'>
                      <ShareBtnModal type='icon' title={pin?.name} url={`${homepageUrl}/pin/${pin?._id}`}/>
                      <CustomMoreButton imageLink={pin?.pin_image}/>
                  </div>
              </div>

          </div>}
      </div>
      <section className="p-1">
        <p className=' text-ellipsis text-lg text-foreground font-medium text-pretty overflow-hidden whitespace-nowrap'>
          <Link className="no-underline" href={`/pin/${pin?._id}`}>{pin?.name}</Link></p>
          <Link href={`/creator/${pin?.creator?._id}`}>
            <div className='flex text-sm text-foreground/75 gap-x-2 items-center'>
              <Image src={pin?.creator?.author_image} alt={pin?.creator?.username} width={50} height={50} 
              className='rounded-full h-7 w-7 object-contain' />
              <p>{pin?.creator?.username}</p>
            </div>
          </Link>
      </section>
      {param && <SavedModal pinId={pin?._id} param={param} isOpen={isOpen} onOpenChange={onOpenChange}/>}
    </div>
  )
}

export default ImageCard


export const CustomMoreButton =({imageLink}:{imageLink:string})=>{
  //const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown placement='top'
      showArrow
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "py-1 px-1 border text-foreground border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
      }}
    >
      <DropdownTrigger>
      <Button size='sm' radius="full" variant='faded'  isIconOnly>
                        <EllipsisHorizontalIcon className='h-5 w-5'/>
                    </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="This Pin was inspired by your recent activity">
      <DropdownSection title="This Pin was inspired by your recent activity">  
        <DropdownItem
            key="hidePin"
          >
           Hide Pin
          </DropdownItem>
          <DropdownItem onClick={()=> handleDownload(imageLink)}
            key="download"
          >
            Download
            
          </DropdownItem>
          <DropdownItem
            key="reportPin"
          >
            Report Pin
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}

