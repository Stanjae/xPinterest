import React from 'react'
import MasonryLayout from '../masonry/MasonryLayout'
import ImageCard from '../cards/ImageCard'
import { getAllCreatorPins} from '@/app/lib/data'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const CreatorPinsWrapper = async({userId}:{userId:string | undefined}) => {
  const { getUser } = getKindeServerSession()
    const allPins = await getAllCreatorPins(userId)
    const user = await getUser()

  return (
    <MasonryLayout>
      {allPins?.map((item:any, index:number)=>(
          <ImageCard param={user?.id}  pin={item} key={index}/>
      ))}  
      </MasonryLayout>
  )
}

export default CreatorPinsWrapper