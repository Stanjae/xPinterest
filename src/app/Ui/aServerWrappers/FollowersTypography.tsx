import { getUserFollowersCount } from '@/app/lib/data'
import millify from 'millify'
import React from 'react'

const FollowersTypography = async({userId}:any) => {
    const {followersCount}:any = await getUserFollowersCount(userId)
  return (
    <p className='text-xs text-gray-600'>{millify(Number(followersCount))} followers</p>
  )
}

export default FollowersTypography
