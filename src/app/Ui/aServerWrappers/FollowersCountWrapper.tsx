import { getUserFollowersCount } from '@/app/lib/data'
import millify from 'millify'
import React from 'react'


export const FollowersCountWrapper = async({userId}:{userId:string}) => {
    const {followersCount, followingCount}:any = await getUserFollowersCount(userId)
    return(
        <div className=' gap-3 flex justify-center items-center text-foreground/90 text-center mt-2'>
            <span>{millify(Number(followersCount))} follower</span>
            <span>{millify(Number(followingCount))} following</span>
        </div>
    )
}