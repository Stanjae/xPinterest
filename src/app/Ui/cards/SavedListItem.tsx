'use client'
import { savePinToBoard } from '@/app/lib/crudActions'
import { checkPinSavedStatus } from '@/app/lib/data'
import { Button } from '@nextui-org/react'
import React, { useEffect } from 'react'

const SavedListItem = ({item, pinId}:any) => {
  const [saved, setSaved] = React.useState<boolean>(false)

  useEffect(()=>{
    const checkSaveStatus = async()=>{
      const response = await checkPinSavedStatus(item?._id, pinId)
      if(response?.length > 0){
        setSaved(true)
      }else{
        setSaved(false)
      }
    }
    checkSaveStatus()
  }, []);

    const handleSaveToPin = async()=>{
        setSaved(prev=> !prev)
        const response = await savePinToBoard(pinId, item?._id, item?.name)
        if(response?.status == 200){
          setSaved(true)
        }
        else{
          setSaved(false)
        }
    }
  return (
    <li className='flex justify-between items-center' key={item._id}>
        <span className="text-lg text-ellipsis text-foreground">{item?.name}</span>
        <Button radius='full' onClick={handleSaveToPin} size='sm' variant={`${saved ? 'ghost' :'flat'}`} color="primary" className='text-primary'>
           {saved ? "Added":"Add"}
        </Button>
    </li>
  )
}

export default SavedListItem
