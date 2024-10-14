import React from 'react'
import BusLoader from './Ui/loaders/BusLoader'

const Loading = () => {
  return (
    <div className='flex justify-center bg-background items-center h-screen'>
        <BusLoader />
    </div>
  )
}

export default Loading