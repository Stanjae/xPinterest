'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Input } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce';

const SearchField = () => {
  const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string)=>{
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)

  return (
    <div className=' w-full flex-1 px-5 grow'>
      <Input onChange={(e) => handleSearch(e.target.value)} className='w-full' variant='faded'
       defaultValue={searchParams.get('query')?.toString()}  
      startContent={<MagnifyingGlassIcon className=' h-5 w-5'/>} radius="full" size='md' 
      placeholder='Search for easy fashion and dinners'/>
    </div>
  )
}

export default SearchField
