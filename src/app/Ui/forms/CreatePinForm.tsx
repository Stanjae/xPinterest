'use client'
import { pinterestCategories, pinterestTopics } from '@/app/lib/category&topics'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FileInput from '../Inputs/FileInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPinFormSchema } from '@/app/lib/zod'
import { CreatePin } from '@/app/lib/crudActions'
import { toast } from 'sonner'

const CreatePinForm = ({isOpen, boards}:{isOpen :boolean, boards:any}) => {
    const [fileImage, setFileImage] = useState<string>('')

    const {register, handleSubmit, formState: { errors, dirtyFields, isDirty, isSubmitting, isValid }} = useForm({
        resolver: zodResolver(createPinFormSchema),
        defaultValues:{title:'', description:'', pinOriginUrl:'', board:'', category:'',
            topics:'', pincolor:''}
      })

    const onSubmit = async(data:any) => {
        const newData = {...data, imageUrl:fileImage}
        const response = await CreatePin(newData)
        if(response.status === 200){
            toast.success(response.message)
        }else{
            toast.error(response.message)
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className={`grid ${isOpen ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
            <div className=' col-span-1'> 
                <FileInput fileImage={fileImage} setFileImage={setFileImage}/>
            </div>
            <div className=' relative col-span-1'>
            {!fileImage && <div className='absolute z-30 top-0 left-0 w-full h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'/>}
                <div className=" py-5 space-y-5 max-w-lg mx-auto">
                    <Input {...register("title")} variant='faded' label="Title" radius='lg' type="text" 
                     isInvalid={!!errors?.title} errorMessage={errors.title?.message} placeholder="Title" />
                    <Textarea {...register("description")} variant={'faded'} label="Description (optional)"
                        labelPlacement="inside"
                        placeholder="Enter your description"
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"/>
                    <Input {...register("pinOriginUrl")} variant='faded' label="Link {optional)" radius='lg' type="url" placeholder="Link" />
                    <Input {...register("pincolor")} variant='faded' label="Pin color (optional)" radius='lg' type="text" placeholder="Enter Pin color in Hex" />

                    <Select {...register("board")} label="Pick a Board" className='text-foreground' size="md" placeholder='Select a board' 
                    errorMessage={errors.board?.message} isInvalid={!!errors?.board} variant='faded'>
                        {boards?.map((item:any)=>(
                            <SelectItem className='text-foreground' key={item?._id}>{item?.name}</SelectItem>
                        ))}
                        
                    </Select>
                    <Select {...register("category")} className='text-foreground' label='Category' size="md" 
                    errorMessage={errors.board?.message} isInvalid={!!errors?.category} placeholder='Select a category' variant='faded'>
                        {pinterestCategories.map((item:any) =>(
                            <SelectItem className='text-foreground' key={item.title}>{item.title}</SelectItem>
                        ))}
                        
                    </Select>
                    <Select {...register("topics")} selectionMode="multiple" label="Select Topics" 
                    errorMessage={errors.topics?.message} isInvalid={!!errors?.topics} className='text-foreground' size="md" placeholder='Select topics' variant='faded'>
                        {pinterestTopics.map((item:any)=>(
                            <SelectItem className='text-foreground' key={item.title}>{item.title}</SelectItem>
                        ))}
                        
                    </Select>

                    <Button   isLoading={isSubmitting} type='submit' disabled={!isDirty || !isValid} color='primary'  size='lg' radius='full' 
                    className='w-full block disabled:bg-foreground/30 disabled:text-foreground/70' >
                        Create a Pin
                    </Button>
                </div>

            </div>
        </form>
    </div>
  )
}

export default CreatePinForm