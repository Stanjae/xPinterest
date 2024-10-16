'use client'
import { deleteUserComments } from '@/app/lib/crudActions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'sonner';
import DeleteCommentModal from '../modals/DeleteComments'
import CommentLike from '../Btns/CommentLike';


const CommentCard = ({firstLetter, commentId, userId, authorId, username, date, comments}:{commentId:any; firstLetter:string; userId:string | undefined; authorId:string; comments:string; username:string; date:any}) => {
    const queryClient = useQueryClient();

    const {mutateAsync} = useMutation({
        mutationFn: async(id) => await deleteUserComments(id),
        onSuccess: async(data, variables, context) => {
            if(data?.status == 200){
                queryClient.invalidateQueries({ queryKey: ['comments'] })
                toast.success(data?.message)
            }else{
                toast.error(data?.message) 
            }
        },
      })

      const handleDelete =()=>{
        mutateAsync(commentId)
      }
  
    return (
    <li className='flex items-start gap-2 p-2'>
        <div className='h-7 w-7 p-1 flex justify-center items-center rounded-full text-sm bg-foreground/15'>
            {firstLetter}
        </div>
        <div>
            <span className='text-sm font-semibold text-foreground '>{username}</span> <span className=' font-medium text-sm text-foreground/50 ml-4'>{comments}</span>
            <div className=' text-sm gap-2 items-center text-foreground/60 flex'>
                <span className="text-xs">{date}</span>
                <CommentLike userId={userId} commentId={commentId} />
                { authorId == userId && <DeleteCommentModal handleDelete={handleDelete} title={comments}/>}
            </div>
        </div>
    </li>
  )
}

export default CommentCard
