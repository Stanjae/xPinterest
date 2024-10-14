'use client'
import { createBoardFormSchema } from '@/app/lib/zod';
import {PencilSquareIcon} from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModalFooter, Button, Modal, ModalBody, ModalHeader, ModalContent, useDisclosure, Input } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {updateBoard} from '@/app/lib/crudActions'

const EditBoardModal = ({title, id, description, username}:{title: string, id: string, username:string, description: string}) => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    const {register, handleSubmit, formState: { errors }} = useForm({
      resolver: zodResolver(createBoardFormSchema),
      defaultValues:{title:title, description:description}
    })

    const handleUpdate = async(data:any) => {
      const newData = {title:data.title, description:data.description, id, username }
        const response = await updateBoard(newData)
        if (response?.status == 200) {
            toast.success(response?.message);
            onClose()
        } else {
            toast.error(response?.message || 'Something went wrong');
        }
    };

  return (
    <>
      <Button onPress={onOpen} size='sm' variant="faded" radius='full' isIconOnly>
          <PencilSquareIcon className='h-5 w-5'/>
        </Button>

      <Modal className='text-foreground' size='md' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-center justify-center gap-1">Edit Board</ModalHeader>
              <form onSubmit={handleSubmit(handleUpdate)}>
                <ModalBody className='py-5'>
                <Input
                  autoFocus
                  {...register("title")}
                  isInvalid={!!errors?.title} errorMessage={errors.title?.message}
                  label="Title"
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
                <ModalFooter>
                  <Button color="danger" type="button" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button  color="primary" type="submit" variant="solid">
                    Update
                  </Button>
                </ModalFooter>
              </form>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditBoardModal
