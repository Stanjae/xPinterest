'use client'
import React from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


const MasonryLayout = ({children}:{children:React.ReactNode}) => {
  return (
      <ResponsiveMasonry columnsCountBreakPoints={{0:1, 350: 1, 750: 2, 900: 5}}>
        <Masonry gutter='10px'>
          {children}
        </Masonry>
      </ResponsiveMasonry>
  
  )
}

export default MasonryLayout
