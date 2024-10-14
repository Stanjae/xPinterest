'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { client } from '@/sanity/client';
import { GET_BOARD_QUERY } from '@/app/lib/data';
import SavedListItem from '../cards/SavedListItem';
import TextLoading from '../loaders/TextLoading';


const options = { next: { revalidate: 60 } }

const SavedModal = ({isOpen, onOpenChange, param, pinId}:{isOpen:any, onOpenChange:any, param:string, pinId:string}) => {

    const paramsi = { userid:param}

    const { isPending, error, data } = useQuery({
        queryKey: ['boardData', paramsi],
        queryFn: async() =>{
            const boards = await client.fetch(GET_BOARD_QUERY, paramsi, options)
            return boards
        }
    })
/* 
    if (isPending) return console.log('loading...')

    if (error) return console.log('error occured') */

  return (
    <>
      <Modal className='text-foreground' size='md' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-center justify-center gap-1">Save to Board</ModalHeader>
             {isPending ? <TextLoading/> : <ModalBody>
                <ul className='space-y-3'>
                    {data?.map((item:any)=>(
                    <SavedListItem pinId={pinId} key={item._id} item={item} />
                    ))}
                </ul>
              </ModalBody>}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SavedModal
