'use client'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import Link from 'next/link'
import DeleteModal from '../modals/DeleteModal'
import { SingleBoardType } from '@/app/lib/definitions'
import EditBoardModal from '../modals/EditBoardModal'
import { useQuery } from '@tanstack/react-query'
import { getPinCountForSingleBoard, getPinImagesForSingleBoard } from '@/app/lib/data'
import TextLoading from '../loaders/TextLoading'

dayjs.extend(relativeTime)

const className = ['h-full top-0 shadow-2xl z-50', 'top-2 shadow-2xl h-[140px]  left-5 z-40',
    'top-4 left-10 h-[120px] z-30', 'top-6 left-14 h-[100px] z-20', 'top-6 left-14 z-20 h-[80px]']

const GridImages3 =({arry}:any)=>{
    return(
        <div className='grid grid-rows-4 grid-cols-3 overflow-clip  h-40 gap-0.5'>
            {arry && arry?.map((item:any, index:number)=>(
                 <Image width={350} height={350} src={item?.pin_image} key={index} alt='bg01' className={` ${index !== 0 ? "row-span-2 ":"col-span-2 row-span-4"} object-cover`}/>
            ))
            }
        </div>
    )
}

const GridImages4To5 =({data}:any)=>{
    return(
        <div className='relative overflow-clip h-40'>
            {data && data?.map((item:any, index:number)=>(
               <Image src={item?.pin_image} width={350} height={350} key={index} alt={'lol'} className={`absolute object-cover w-3/5 rounded-e-lg ${className.at(index)}`}/> 
            ))
            }
        </div>
    )
}

const GridImagesNone =({src}:{src:string})=>{
    return(
        <div className='relative overflow-clip h-40'>
            <Image src={src || ''} alt='bg01' width={350} height={350} className=' rounded-e-lg h-full absolute top-0 shadow-2xl z-50 object-cover w-full'/>
        </div>
    )
}

const GridImagesOne =({src}:{src:string})=>{
    return(
        <div className='relative overflow-clip h-40'>
            <Image src={src} width={350} height={350} alt='bg01' className=' rounded-e-lg h-full absolute top-0 shadow-2xl z-50 object-cover w-full'/>
        </div>
    )
}

const BoardCard = ({noOfPins, item}:{noOfPins:number, item:SingleBoardType}) => {
    const {data, isPending} = useQuery({
        queryKey: ['pinCountForSingleBoard', item?._id],
        queryFn: async() => await getPinCountForSingleBoard(item?._id)
    })

    const {data:imageData, isPending:imagePending} = useQuery({
        queryKey: ['pinImagesForSingleBoard', item?._id],
        queryFn: async() => await getPinImagesForSingleBoard(item?._id)
    })



  return (
    <Card shadow='none'>
        {imagePending ? <TextLoading/> : imageData?.length == 0 ? <GridImagesNone src={'https://placehold.jp/350x350.png'}/> :
        imageData?.length == 1 ? <GridImagesOne src={imageData?.at(0)?.pin_image}/> :
        imageData?.length <= 3 ?  <GridImages3 arry={imageData}/> : <GridImages4To5 data={imageData}/> 
        }
        <CardBody>
            <h2><Link className=" hover:text-primary" href={`/profile/${item?.creator?.username}/${item?.slug?.current +"@"+item?._id}`}>{item?.name}</Link></h2>
            <div className='flex items-center justify-between text-xs gap-2 text-foreground/60'>
                {isPending ? <TextLoading/> : <p>{data} Pins</p>}
                <p>{dayjs(item?._updatedAt).fromNow()}</p>
            </div>
        </CardBody>
        <CardFooter className="space-x-2">
            <DeleteModal username={item?.creator?.username} title={item?.name} id={item?._id}/>
            <EditBoardModal username={item?.creator?.username} title={item?.name} id={item?._id} description={item?.description}/>
        </CardFooter>
    </Card>
  )
}

export default BoardCard