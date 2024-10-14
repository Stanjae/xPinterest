import React from 'react'
import MasonryLayout from '../masonry/MasonryLayout'
import ImageCard from '../cards/ImageCard'
import { getAllPins } from '@/app/lib/data'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const ExploreWrapper = async({query}:any) => {
  const { getUser } = getKindeServerSession()
    const allPins = await getAllPins(query)
    const user = await getUser()
    const param = user.id
  return (
    <MasonryLayout>
      {allPins.map((item:any, index:number)=>(
          <ImageCard param={param}  pin={item} key={index}/>
      ))}  
      </MasonryLayout>
  )
}

export default ExploreWrapper