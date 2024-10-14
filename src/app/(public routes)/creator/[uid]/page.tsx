
import React, { Suspense } from 'react'
import LogoBadge from '../../../../../public/favicon.ico'
import Image from 'next/image'
import ShareBtnModal from '@/app/Ui/modals/ShareBtnModal'
import { CREATOR_QUERY } from '@/app/lib/userActions'
import { client } from '@/sanity/client'
import { notFound } from 'next/navigation'
import TextLoading from '@/app/Ui/loaders/TextLoading'
import { FollowersCountWrapper } from '@/app/Ui/aServerWrappers/FollowersCountWrapper'
import FollowBtn from '@/app/Ui/Btns/FollowBtn'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import CreatorPinsWrapper from '@/app/Ui/aServerWrappers/CreatorPinsWrapper'

const options = { next: { revalidate: 60 } }


const CreatorPage = async({params}: {params: {uid: string}}) => {
  const {getUser} = getKindeServerSession();
  const user = await getUser()

  const newParams = {newId:params.uid}

  const creator = await client.fetch(CREATOR_QUERY, newParams, options)

  if(!creator){
    notFound()
  }


  const vary = creator?.email?.split('@')?.at(0)

  const profileUrl = `${process.env.KINDE_SITE_URL}/${vary}`
  
  return (
    <div>
      <section>
        <div className=' max-w-2xl text-center space-y-5 mx-auto px-4 py-8'>
            <div className=' bg-gray-300 text-4xl font-semibold h-28 w-28 flex justify-center items-center rounded-full p-5 mx-auto'>
                {creator?.firstname[0] + creator?.lastname[0]}
            </div>
            <div >
                <p className=' text-4xl font-semibold text-center mt-4'>{creator?.firstname + " " + creator?.lastname}</p>
                <div className=' text-sm text-foreground/40 gap-3 flex justify-center items-center mt-2'>
                    <Image src={LogoBadge} className='h-5 w-5' width={40} height={40} alt={'badge'}/>
                    @{creator?.username}
                </div>
                <Suspense fallback={<div className=' flex justify-center'><TextLoading/></div>}>
                  <FollowersCountWrapper userId={params?.uid}/>
                </Suspense>  
            </div>
            <div className='gap-3  flex justify-center items-center'>
                <ShareBtnModal url={profileUrl} title='Share' type='btn'/>
                {user && <FollowBtn size={"lg"} authorId={params.uid} authorName={creator?.username} 
            pinId={params?.uid} userId={user?.id}/>}
            </div>
        </div>
        <div className=" relative mx-auto max-w-7xl">
          <Suspense key={params.uid} fallback={<TextLoading/>}>
            <CreatorPinsWrapper userId={params.uid}/>
          </Suspense>
        </div>
      </section>
    </div>
  )
}

export default CreatorPage
