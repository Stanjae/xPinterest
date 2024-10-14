'use client'
import { createComment } from '@/app/lib/crudActions';
import { getPinComments } from '@/app/lib/data';
import {PaperAirplaneIcon} from '@heroicons/react/24/solid';
import { Input, Button } from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import CommentCard from '../cards/CommentCard';





dayjs.extend(relativeTime)


const CommentForm = ({ pinId, userId}:{pinId:string; userId:string}) => {
  const queryClient = useQueryClient()

    const {data, isPending} = useQuery({
        queryKey: ['comments'],
        queryFn: async() => await getPinComments(pinId),
    })


    const {register, handleSubmit, setValue, formState: { errors, isDirty, isSubmitting, isValid }} = useForm({
        defaultValues:{comment:''}
    })
    const {mutateAsync} = useMutation({
        mutationFn: async(formData) => await createComment(formData),
        onSuccess: async(data, variables, context) => {
            if(data?.status == 200){
                queryClient.invalidateQueries({ queryKey: ['comments'] })
                setValue('comment', '')
            }else{
                toast.error(data?.message) 
            }
        },
      })
    
      const onSubmit = (data:any) => {
        mutateAsync({...data, userId, pinId})
      }
  return (
    <section className=' flex h-[250px] flex-col items-stretch justify-between '>
            <h3 className='text-base font-semibold text-foreground/60'>Comments ({data?.length})</h3>
            <ul className='grow overflow-y-auto'>
              {data && data?.map((item:any, index:number)=>(
                <CommentCard commentId={item?._id} userId={userId} authorId={item?.user?._id} comments={item?.comments} username={item?.user?.username} date={dayjs(item?._updatedAt).fromNow()} key={index} firstLetter={item?.user?.username?.charAt(0)}/>
              ))}
             
            </ul>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
                <Input {...register("comment")} placeholder="Add a comment..." radius="full" />
                <Button isLoading={isSubmitting}  disabled={!isDirty || !isValid} type="submit" radius='full' className=" disabled:bg-primary/20" variant='solid' color='primary' isIconOnly><PaperAirplaneIcon className="h4 w-4"/></Button>
            </form>
          </section>
    
  )
}

export default CommentForm
