import { getSinglePin } from '@/app/lib/data'
import FollowersTypography from '@/app/Ui/aServerWrappers/FollowersTypography';
import BackButton from '@/app/Ui/Btns/BackButton';
import FollowBtn from '@/app/Ui/Btns/FollowBtn';
import LikeBtn from '@/app/Ui/Btns/LikeBtn';
import { CustomMoreButton } from '@/app/Ui/cards/ImageCard';
import CommentForm from '@/app/Ui/forms/CommentForm';
import TextLoading from '@/app/Ui/loaders/TextLoading';
import SavedToPinModal from '@/app/Ui/modals/SavedToPinModal';
import ShareBtnModal from '@/app/Ui/modals/ShareBtnModal';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import { ChevronDownIcon} from '@heroicons/react/24/solid';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'
import SimilarPinsWrapper from '@/app/Ui/aServerWrappers/SimilarPinsWrapper'
import { notFound } from 'next/navigation';

const PinPage = async({params}:{params:{uid:string}}) => {
  const response = await getSinglePin(params.uid);
  const {getUser} = getKindeServerSession();

  const user = await getUser()

  if(!user){
    notFound()
  }

  const homePage = `${process.env.KINDE_SITE_URL}`

  const topics = response?.topics?.split(',')

  return (
    <section className=' relative'>
      <BackButton className={' absolute top-24 left-10'}/>
      <div className=' bg-white dark:bg-background max-w-5xl gap-2 relative flex rounded-lg items-start mx-auto p-5 shadow-2xl'>
        <Image src={response?.pin_image} className=" w-[450px] h-[450px] object-cover rounded-lg" alt={response?.name || "poly image"} width={450} height={450} />
        <div className='grow space-y-3 relative pl-3'>
          <div className='flex justify-between items-center'>
            <div className=' flex  items-center gap-2'>
              {user && <LikeBtn userId={user?.id} pinId={params.uid} />}
              <ShareBtnModal type='icon' title={response?.name} url={`${homePage}/pin/${params?.uid}`} />
              <CustomMoreButton imageLink={response?.pin_image} />
            </div>
            <div className='flex gap-2 items-center'>
              <Button size='lg' radius='full' variant='light' endContent={<ChevronDownIcon className='h-5 w-5'/>}>{response?.board_type?.name}</Button>
              {user && <SavedToPinModal param={user?.id} pinId={params.uid} />}
            </div>
          </div>
          <div className=" space-y-1 mt-5">
            <h3 className=" text-2xl font-semibold">{response?.name}</h3>
            {response?.note && <p className=' text-base text-foreground/60'>{response?.note}</p>}
            {response?.url_location !== '' && <Button endContent={<ArrowUpRightIcon className='h-4 w-4'/>} className=' bg-blue-600 text-white' as={Link} href={response?.url_location || ''} radius='full' variant='solid'>Visit site</Button>}
            <ul className='flex gap-3'>
              {topics?.map((item:any, index:number) =>(<li className=' text-sm text-primary font-medium' key={index}>#{item}</li>))}
            </ul>
          </div>
          <div className="flex items-center justify-between">
                <div className=' flex items-start gap-2'>
                <Image src={response?.creator?.author_image} alt={response?.creator?.name || "stannis"} width={40} height={40} className='rounded-full h-10 w-10 object-cover' />
                <div className='ml-2'>
                  <p className=' text-foreground font-medium text-sm'>
                     <Link href={`/creator/${response?.creator?._id}`}>{response?.creator?.username}</Link>
                  </p>
                  <Suspense key={response?.creator?._id} fallback={<TextLoading/>}>
                    <FollowersTypography userId={response?.creator?._id}/>
                  </Suspense>
                  
                </div>
              </div>
            
            
            {user && response?.creator?._id != user?.id && <FollowBtn size={"md"} authorId={response?.creator?._id} authorName={response?.creator?.username} 
            pinId={params?.uid} userId={user?.id}/>}
          </div>
          {user && <CommentForm pinId={response?._id} userId={user?.id}/>}
        </div>
      </div>
      <h2 className='my-10 text-foreground text-center font-bold text-2xl'>You may Like this</h2>
      <div className=" relative mx-auto max-w-7xl">
          <Suspense key={params.uid} fallback={<TextLoading/>}>
            {user && <SimilarPinsWrapper pinId={params.uid} userId={user?.id}/>}
          </Suspense>
      </div>
      </section>
  )
}

export default PinPage