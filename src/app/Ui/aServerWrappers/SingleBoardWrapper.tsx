import React from 'react'
import MasonryLayout from '../masonry/MasonryLayout'
import { getSavedPinForSingleBoard } from '@/app/lib/data';
import ImageCard from '../cards/ImageCard';

const SingleBoardWrapper = async({boardId, userId, boardSlug}:{boardId:string, userId:string; boardSlug:string}) => {
    const response = await getSavedPinForSingleBoard(boardId);

  return (
    <section>
        <p className=" py-3 text-lg font-semibold">{response?.pinCount || 0} pins</p>

        <div>
            <MasonryLayout>
                {response?.totalPins?.map((item:any, index:number)=>(
                    <ImageCard param={userId} pin={item} key={index}/>
                ))}
                
            </MasonryLayout>
        </div>
    </section>
  )
}

export default SingleBoardWrapper
