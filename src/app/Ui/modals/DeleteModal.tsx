'use client'
import { deleteCreatorPins } from '@/app/lib/crudActions';
import {TrashIcon } from '@heroicons/react/24/solid';
import { ModalFooter, Button, Modal, ModalBody, ModalHeader, ModalContent, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { toast } from 'sonner';

const DeleteModal = ({title, id, username}:any) => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    const handleDelete = async() => {
        const response = await deleteCreatorPins(id, username);
        if (response?.status == 200) {
            toast.success('Pin deleted successfully');
            onClose()
        } else {
            toast.error(response?.message || 'Something went wrong');
        }
    };

  return (
    <>
      <Button onPress={onOpen} size='sm' variant="faded" radius='full' isIconOnly>
          <TrashIcon className='h-5 w-5'/>
        </Button>

      <Modal className='text-foreground' size='md' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-center justify-center gap-1">Notification</ModalHeader>
              <ModalBody className='py-5'>
                <div className='space-y-2 text-center'>
                    <h1 className='text-2xl font-semibold text-pretty text-foreground'>Do you want to Delete?</h1>
                    <p className='text-foreground/75 text-lg'>{title}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onClick={handleDelete} variant="solid">
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteModal
