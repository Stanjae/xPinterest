import { GET_BOARD_QUERY } from '@/app/lib/data';
import GridLayout from '@/app/Ui/gridLayout/GridLayout'
import { client } from '@/sanity/client';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'

const options = { next: { revalidate: 60 } }

const CreationPage = async() => {
  const {getUser} = getKindeServerSession();
  const user = await getUser()

  const params = { userid:user?.id}
  const boards = await client.fetch(GET_BOARD_QUERY, params, options)
  return (
    <div className=" overflow-y-hidden border-t border-t-foreground/20">
        <GridLayout boards={boards}/>
    </div>
  )
}

export default CreationPage