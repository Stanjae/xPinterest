import { client } from '@/sanity/client';
import { KindeUser } from './definitions';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { defineQuery } from 'next-sanity';

const {isAuthenticated, getUser} = getKindeServerSession();


export const createProfileIfNotExists = async (user:Partial<KindeUser>) => {
    const doc = {
        _id: `${user?.id}`,
        _type: 'author',
        username: user?.email?.split('@')[0],
        firstname:user?.family_name,
        lastname:user?.given_name,
        author_image:user?.picture,
        email:user?.email     
      }
      
      client.createIfNotExists(doc).then((res) => {
        console.log('Bike was created (or was already present)')
      })
}

//get current user profile
export const POST_QUERY = defineQuery(`*[_type == "author" && _id == $userid && username == $slug][0]`)

export const CREATOR_QUERY = defineQuery(`*[_type == "author" && _id == $newId][0]`)

//get current user profile
export const getCurrentUserProfile = async (username:string) => {
    const isUserAuthenticated = await isAuthenticated();
    if(!isUserAuthenticated) return null;

    const user = await getUser();
    const PROFILE_QUERY = defineQuery(`*[_type == "author" && _id =="${user.id}" && username == "${username}"][0]`);
    const result = await client.fetch(PROFILE_QUERY);
    return result;
}
