
import React, { Suspense } from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import millify from "millify";
import { notFound } from 'next/navigation'
import { SparklesIcon, Square2StackIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import SingleBoardWrapper from '@/app/Ui/aServerWrappers/SingleBoardWrapper'
import TextLoading from '@/app/Ui/loaders/TextLoading'
import Link from 'next/link'
import BackButton from '@/app/Ui/Btns/BackButton';

const options = { next: { revalidate: 60 } }


const SingleBoardPage = async({params}: {params: {board: string}}) => {
  const {getUser, isAuthenticated} = getKindeServerSession();

  if (!isAuthenticated) {
    notFound()
  }

  const user = await getUser()
  const firstLetter = user?.email?.charAt(0).toUpperCase()
  const {board} = params
  const boardData = board.split('%40')
 
  return (
    <section className="relative">
      <BackButton className={' absolute top-5 left-10'}/>
        <div className=' max-w-md relative space-y-3 mx-auto '>
            <div className=' flex justify-center items-center capitalize text-4xl font-semibold'>
              {boardData[0]?.replace('-', ' ')}
            </div>
            <div className=' flex text-xl justify-center items-center -space-x-4'>
              <div className=' border-2 border-white flex items-center text-center justify-center p-6 font-semibold h-12 w-12 rounded-full bg-foreground/10'>{firstLetter}</div>
              <div className=' border-2 border-white flex items-center text-center justify-center p-2 font-semibold h-12 w-12 rounded-full bg-gray-300'>
                <UserPlusIcon className=" text-foreground h-5 w-5"/>
              </div>
            </div>
            <div className=' flex justify-center gap-3 items-center'>
              <Link href={'/explore'}>
                <div className=' bg-foreground/15 flex justify-center items-center rounded-3xl h-[88px] w-[88px] p-5'>
                    <SparklesIcon className='text-foreground h-9 w-9'/>
                  </div>
                  <p className='text-center text-foreground/50 text-sm'>More ideas</p>
              </Link>
              <Link href={'#'}>
                <div className=' bg-foreground/15 flex justify-center items-center rounded-3xl h-[88px] w-[88px] p-5'>
                  <Square2StackIcon className='text-foreground h-9 w-9'/>
                </div>
                <p className='text-center text-foreground/50 text-sm'>Organize</p>
              </Link>
            </div>
        </div>

        <div className='mt-20 px-5'>
           <Suspense fallback={<TextLoading/>} key={boardData[1]}>
            <SingleBoardWrapper boardSlug={boardData[0]} userId={user?.id} boardId={boardData[1]} />
          </Suspense>
          
        </div>
    </section>
  )
}

export default SingleBoardPage
