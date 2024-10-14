'use client'
import React, { useEffect } from 'react'
import { followAuthorFunction} from '@/app/lib/crudActions'
import { toast } from 'sonner'
import { checkFollowedStatus} from '@/app/lib/data'
import { Button } from '@nextui-org/react'


const FollowBtn = ({userId, authorId, pinId, size, authorName}:{size:any; authorName:string; userId:string; authorId:string; pinId:string}) => {
    const [follow, setFollow] = React.useState<boolean>(false)


    const handleFollow =async()=>{
        const response = await followAuthorFunction(authorId, userId, pinId)
        if(response?.status == 200){
            setFollow(true)
            toast.success(`You are now following ${authorName}`)
        }else if(response?.status == 400){
            toast.warning(`You are no longer following ${authorName}`)
            setFollow(false)
        }else{
            toast.error(response?.message)
        }
    }
    useEffect(()=>{
        const monitorFollowStatus = async()=>{
            const response = await checkFollowedStatus(userId, authorId)
            if(response?.length > 0){
                setFollow(true)
            }else{
                setFollow(false)
            }
        }
        monitorFollowStatus()
    },[])

  return (
/* From Uiverse.io by catraco */ 
    <Button onClick={handleFollow} radius="full" size={`${size == "md" ? "md":"lg"}`} variant={`${follow ? 'faded':'faded'}`}>
        {follow ? "Following":"Follow"}
    </Button>
  )
}

export default FollowBtn
