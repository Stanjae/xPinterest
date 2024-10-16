import Loading from '@/app/loading';
import ExploreWrapper from '@/app/Ui/aServerWrappers/ExploreWrapper'
import BusLoader from '@/app/Ui/loaders/BusLoader'
import React, { Suspense } from 'react'

const Page= async({searchParams}: {searchParams?: { query?: string; page?: string;};}) => {
  
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="max-w-7xl px-5 md:px-0 mx-auto">
      <Suspense key={query + currentPage} fallback={<Loading/>}>
        <ExploreWrapper query={query}/>
      </Suspense>
      
    </div>
  )
}

export default Page