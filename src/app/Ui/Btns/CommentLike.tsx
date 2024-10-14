'use client'
import { likeCommentFunction } from '@/app/lib/crudActions'
import { checkIfUserIdExistsInCommentArray, getCommentLikedCount } from '@/app/lib/data'
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import millify from 'millify'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const CommentLike = ({userId, commentId}:{userId:any; commentId:any}) => {
    const [like, setLike] = React.useState(false)
    const queryClient = useQueryClient();

    const {data, isPending} = useQuery({queryKey:['checkLikedComments', commentId, like], 
        queryFn: async()=> await getCommentLikedCount(commentId)
    })

    const {mutateAsync} = useMutation({
        mutationFn: async(id) => await likeCommentFunction(id, commentId),
        onSuccess: async(data, variables, context) => {
            console.log("theadt:", data)
            if(data?.status == 200){
                queryClient.invalidateQueries({ queryKey: ['checkLikedComments'] })
                setLike(true)
            }else{
                setLike(false)
            }
        },
      })

    const handleLikeComment =async()=>{
        mutateAsync(userId)
    }
   useEffect(()=>{
        const monitorLikeStatus = async()=>{
            const response = await checkIfUserIdExistsInCommentArray(commentId, userId)
            if(response?.length > 0){
                setLike(true)
            }else{
                setLike(false)
            }
        }
        monitorLikeStatus()
    },[])
  return (
    <div className='flex items-center gap-1'>
        <Button onClick={handleLikeComment} isIconOnly size="sm" variant='light'>
        {like ? <HeartIcon className='h-4 w-4 text-red-600' /> :  <HeartIconOutline className='h-4 w-4 text-gray-400' />}
           
        </Button>
       {data != 0 && <span>{millify(Number(data))}</span>}
    </div>
    
  )
}

export default CommentLike
