'use client'
import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {ArrowUpOnSquareIcon, LinkIcon} from '@heroicons/react/24/outline'
import LinkedIn from '../../../../public/social/linkedin.png'
import Facebook from '../../../../public/social/facebook.png'
import Twitter from '../../../../public/social/twitter.png'
import WhatsApp from '../../../../public/social/whatsapp.png'
import Link from 'next/link';
import Image from 'next/image';


const ShareBtnModal = ({type, title, url}:{type:string, title:string, url:string}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`;

    const shareList = [{icon: LinkedIn, url: linkedInShareUrl}, {icon: Facebook, url: facebookShareUrl},
         {icon: Twitter, url: twitterShareUrl}, {icon:WhatsApp, url:whatsappShareUrl}]

         const [isCopied, setIsCopied] = useState(false);

         const handleCopy = async () => {
           try {
             await navigator.clipboard.writeText(url);
             setIsCopied(true);
       
             // Reset the copied state after 2 seconds
             setTimeout(() => {
               setIsCopied(false);
             }, 2000);
           } catch (error) {
             console.error('Failed to copy text:', error);
           }
         };

  return (
    <>
    { type === 'icon' ?
      <Button onPress={onOpen} size='sm' variant="faded" radius='full' isIconOnly>
          <ArrowUpOnSquareIcon className='h-5 w-5'/>
        </Button>
        :
        <Button onPress={onOpen} size='lg' variant="flat" radius='full'>
        {title}
      </Button>
    }
      <Modal className='text-foreground' size='md' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-center justify-center gap-1">Share</ModalHeader>
              <ModalBody>
                <div className='flex justify-center items-start gap-2'>
                    <div>
                        <Button onClick={handleCopy} isIconOnly variant='faded' size='md' radius='full'><LinkIcon className='h-8 w-8'/></Button>
                        <p className='text-xs'>{isCopied ? 'Copied!' : 'Copy Link'}</p>
                    </div>
                    {shareList.map((item, index) =>(
                        <Link href={item.url} target="_blank" rel="noopener noreferrer" key={index}>
                            <Image src={item.icon} alt='icon' width={40} height={40} className='h-10 w-10'/>
                        </Link>
                    ))}

                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShareBtnModal
