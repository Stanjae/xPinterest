
import React, { Suspense } from 'react'
import LogoBadge from '../../../../../public/favicon.ico'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import ShareBtnModal from '@/app/Ui/modals/ShareBtnModal'
import ProfileTabs from '@/app/Ui/tabs/ProfileTabs'
import { POST_QUERY } from '@/app/lib/userActions'
import { client } from '@/sanity/client'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound } from 'next/navigation'
import { GET_BOARD_QUERY } from '@/app/lib/data'
import TextLoading from '@/app/Ui/loaders/TextLoading'
import { FollowersCountWrapper } from '@/app/Ui/aServerWrappers/FollowersCountWrapper'

const options = { next: { revalidate: 60 } }


const ProfilePage = async({params}: {params: {slug: string}}) => {
  const {getUser} = getKindeServerSession();

  const user = await getUser()

  const paramsi = {slug:params.slug, userid:user?.id}

  const profile = await client.fetch(POST_QUERY, paramsi, options)

  if(!profile){
    notFound()
  }

  const boards = await client.fetch(GET_BOARD_QUERY, paramsi, options)

  const vary = user?.email?.split('@')[0]

  const profileUrl = `${process.env.KINDE_SITE_URL}/${vary}`
  
  return (
    <div>
      <section>
        <div className=' max-w-2xl text-center space-y-5 mx-auto px-4 py-8'>
            <div className=' bg-gray-300 text-4xl font-semibold h-28 w-28 flex justify-center items-center rounded-full p-5 mx-auto'>
                {profile?.firstname[0] + profile?.lastname[0]}
            </div>
            <div >
                <p className=' text-4xl font-semibold text-center mt-4'>{profile?.firstname + " " + profile?.lastname}</p>
                <div className=' text-sm text-foreground/40 gap-3 flex justify-center items-center mt-2'>
                    <Image src={LogoBadge} className='h-5 w-5' width={40} height={40} alt={'badge'}/>
                    @{profile?.username}
                </div>
                <Suspense fallback={<div className=' flex justify-center'><TextLoading/></div>}>
                  <FollowersCountWrapper userId={user?.id}/>
                </Suspense>  
            </div>
            <div className='gap-3  flex justify-center items-center'>
                <ShareBtnModal url={profileUrl} title='Share' type='btn'/>
                <Button radius='full' size="lg" as={Link} variant='flat' href='#'>Edit Profile</Button>
            </div>
        </div>
        <div className="flex relative mx-auto max-w-screen-xl justify-center">
          <Suspense fallback={<TextLoading/>}>
            <ProfileTabs userid={user?.id} boards={boards}/>
          </Suspense>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
