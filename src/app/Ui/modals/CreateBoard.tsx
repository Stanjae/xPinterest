'use client'
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,  Input, } from "@nextui-org/react";
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createBoardFormSchema } from '@/app/lib/zod';
import { createBoard } from '@/app/lib/crudActions';





const CreateBoard = ({isOpen, onOpen, onOpenChange}:any) => {

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(createBoardFormSchema),
    defaultValues:{title:'', description:''}
  })

  const onSubmit = async(data: any) => {
    const newBoard = await createBoard(data)
    if(newBoard?.status === 200){
      toast.success('Board created successfully');
    } else { 
      toast.error('Error creating board');
    }
}

    
  return (
    <div>
      {/* <Button variant='light' onPress={onOpen} color="primary">Board</Button> */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-center text-foreground ">Create Board</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  autoFocus
                  {...register("title")}
                  isInvalid={!!errors?.title} errorMessage={errors.title?.message}
                  label="Name"
                  radius='lg'
                  className='text-foreground'
                  placeholder=" &apos;Places to go&apos; or &apos;Recipes to Make&apos;"
                  variant="bordered"
                  type='text'
                />
                <Input
                  label="Description"
                  {...register("description")}
                  className='text-foreground'
                  placeholder="Enter a description"
                  isInvalid={!!errors?.description} errorMessage={errors.description?.message}
                  type="text"
                  variant="bordered"
                  radius='lg'
                />

              </ModalBody>
              <ModalFooter className="flex justify-end">
                <Button type="submit" size='lg' radius='full' variant="solid" onPress={onClose} 
                color='primary' >
                  Create
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}


export default CreateBoard