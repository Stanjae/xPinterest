import React from 'react'
import MasonryLayout from '../masonry/MasonryLayout'
import ImageCard from '../cards/ImageCard'
import { getAllSimilarPins} from '@/app/lib/data'

const SimilarPinsWrapper = async({userId, pinId}:{userId:string | undefined; pinId:any}) => {
    const allPins = await getAllSimilarPins(userId, pinId)

  return (
    <div>
        {!allPins && <p className='text-center text-2xl'>No Pins Found</p>}
        <MasonryLayout>
        {allPins?.map((item:any, index:number)=>(
            <ImageCard param={userId}  pin={item} key={index}/>
        ))}  
        </MasonryLayout>
    </div>

    
  )
}

export default SimilarPinsWrapper