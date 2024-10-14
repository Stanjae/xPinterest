'use server'
import { client } from "@/sanity/client"
import { CreateBoardType, CreatePinType } from "./definitions"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { checkFollowedStatus, checkIfUserIdExistsInCommentArray, checkLikedSavedStatus, checkPinSavedStatus} from "./data";

const {isAuthenticated, getUser} = getKindeServerSession();

export const dummyRequest =async()=>{
    return 'lol'
}

export async function createSlug(title:string) {
    return title
      .toLowerCase()                  // Convert the title to lowercase
      .replace(/[^a-z0-9\s-]/g, '')   // Remove all non-alphanumeric characters except spaces and hyphens
      .trim()                         // Remove leading and trailing spaces
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/-+/g, '-');           // Replace multiple hyphens with a single one
  }

export const createBoard =async(data:CreateBoardType)=>{  
    const isUserAuthenticated = await isAuthenticated();
    const user = await getUser();
    const newPath = user.email?.split('@')[0]
    if(!isUserAuthenticated){
        return {status:401, message:"User not authenticated"}
    }
    const newSlug = await createSlug(data.title)
    const doc = {
        _type:"board", description:data.description, name:data.title,
        creator:{_ref:`${user?.id}`,_type:"reference"},
        slug:{current:newSlug,_type:"slug"}
    }
    const response = await client.create(doc)
    revalidatePath(`/profile/${newPath}`)
    revalidatePath(`/creation-pin-tool`)
    if(response?._rev){
        return {status:200, message:"Board created successfully"}
    }else{
        return {status:500, message:"Failed to create board"}
    }
      
}


export const createComment =async(data:any)=>{  
    const isUserAuthenticated = await isAuthenticated();
    //const user = await getUser();
    //const newPath = user.email?.split('@')[0]
    if(!isUserAuthenticated){
        return {status:400, message:"User not authenticated"}
    }

    const doc = {
        _type:"comments", comments:data?.comment,
        user:{_ref:`${data?.userId}`,_type:"reference"},
        pin:{_ref:`${data?.pinId}`,_type:"reference"},
    }
    try{
        const response = await client.create(doc)
        return {status:200, message:"comment added successfully"}
    }catch(err){
        return {status:500, message:"Something went wrong"}
    }
      
}

export const deleteUserComments = async (commentId:any) => {
    try{
        await client.delete(commentId)
        return {status:200, message:'Comment deleted Sucessfully!'}
    }catch(err){
        return {status:400, message:'Comment failed to Delete!'}
    }
    
}

export async function CreatePin(data:CreatePinType) {
  const user = await getUser();
  const newPath = user.email?.split('@')[0]
    console.log('pin-form:', data)
    const newSlug = await createSlug(data.title)
    const doc = {
      _type:"pin",
      views:0,
      creator:{_ref:`${user?.id}`, _type:"reference"},
      slug:{current:newSlug, _type:"slug"},
      color:data.pincolor, note:data.description,
      board_type:{_ref:data.board, _type:"reference"},
      name:data.title, url_location:data.pinOriginUrl,
      category:data.category, topics:data.topics, pin_image:data.imageUrl
    }
    try{
        const response = await client.create(doc)
        console.log("new pin: ", response)
        revalidatePath(`/profile/${newPath}`)
        revalidatePath(`/explore`)
        return {status:200, message:"Pin created successfully"}
    }catch(err){
        return {status:500, message:`${err}`}
    }
    
}

export const deleteCreatorPins = async (pinId:string, username:string) => {
    try{
        await client.delete(pinId)
        revalidatePath(`/profile/${username}`)
        return {status:200, message:'Pin deleted Sucessfully!'}
    }catch(err){
        console.log("error on unsaving: ", err)
        return {status:400, message:'Pin failed to Delete!'}
    }
    
}

/* save pin to board */
export const savePinToBoard = async (pinId:string, boardId:string, boardName:any) => {
    //check if pin exists in Saved Array
    const user = await getUser()
    if(!user) return {status:401, message:"User not authenticated"}
    const username = user.email?.split('@')[0]

    const isPinSaved = await checkPinSavedStatus(boardId, pinId)
    const newSlug = await createSlug(boardName)

   if(isPinSaved?.length > 0){
        try{
            await client.delete(isPinSaved[0]._id)
            revalidatePath('/explore')
            revalidatePath(`/profile/${username}`)
            revalidatePath(`profile/${username}/**`)
            revalidatePath(`/profile/${username}/${boardName +"@"+ boardId}`)
            return {status:400, message:'unsaved'}
        }catch(err){
            console.log("error on unsaving: ", err)
        }
    }else{
        try{
            const doc = {
            _type:"saved", boardId:boardId, pinId:pinId,
            board:{ _ref:boardId,_type:"reference" },
            pin:{_type:"reference",_ref:pinId}
            }
            const response = await client.create(doc)
            revalidatePath('/explore')
            revalidatePath(`/profile/${username}`)
            return {status:200, message:'saved to board'}
        }catch(err){
            console.log("error on saving: ", err)
        }
    }  
}

/* edit board */

export const updateBoard = async({title, description, id, username }:{title:string, username:string, description:string, id:string})=>{
    const newSlug = await createSlug(title)
    try{
        await client
        .patch(id) // Document ID to patch
        .set({name: title, description, slug:{current:newSlug, _type:"slug"} }) // Shallow merge //.inc({numSold: 1}) // Increment field by count
        .commit() // Perform the patch and
        revalidatePath(`/profile/${username}`)
        return {status:200, message:'Board updated Sucessfully'}
    }catch(err){
        console.log(err)
        return {status:400, message:'Board failed to Update'}
    }

}

/* like pins */

export const likePinFunction = async (pinId:string) => {
    //check if pin exists in liked Document
    const user = await getUser()
    if(!user) return {status:401, message:"User not authenticated"}

    const isPinLiked = await checkLikedSavedStatus(user?.id, pinId)

   if(isPinLiked?.length > 0){
        try{
            await client.delete(isPinLiked[0]._id)
            revalidatePath(`/pin/${pinId}`)
            return {status:400, message:'unLiked'}
        }catch(err){
            console.log("error on unsaving: ", err)
        }
    }else{
        try{
            const doc = {
            _type:"liked", userId:user?.id, pinId:pinId,
            user:{ _ref:user?.id,_type:"reference" },
            pin:{_type:"reference",_ref:pinId}
            }
            const response = await client.create(doc)
            revalidatePath(`/pin/${pinId}`)
            return {status:200, message:'saved to board'}
        }catch(err){
            console.log("error on saving: ", err)
        }
    }  
}

export const followAuthorFunction = async (authorId:string, userId:string, pinId:string) => {
    const user = await getUser()
    if(!user) return {status:401, message:"User not authenticated"}
    const username = user?.email?.split("@")?.at(0)
    const isAuthorFollowed = await checkFollowedStatus(userId, authorId)

    if(isAuthorFollowed?.length > 0){
         try{
             await client.delete(isAuthorFollowed[0]?._id)
             revalidatePath(`/pin/${pinId}`)
             revalidatePath(`/profile/${username}`)
             return {status:400, message:'unFollowed'}
         }catch(err){
             console.log("error on unsaving: ", err)
         }
     }else{
         try{
             const doc = {
             _type:"follow", userId:userId, authorId:authorId,
             user:{ _ref:user?.id,_type:"reference" }, author:{_type:"reference",_ref:authorId}
             }
             await client.create(doc)
             revalidatePath(`/pin/${pinId}`);
             revalidatePath(`/profile/${username}`)
             return {status:200, message:'followed'}
         }catch(err){
            revalidatePath(`/pin/${pinId}`)
             console.log("error on following: ", err)
         }
     }  
}

/* like comments */
export const likeCommentFunction = async (userId:any, commentId:any) => {
    //check if pin exists in liked Document
    if(!userId) return {status:401, message:"User not authenticated"}

    const isCommentLiked = await checkIfUserIdExistsInCommentArray(commentId, userId)

    if(isCommentLiked?.length > 0){
        try{
            await client.delete(isCommentLiked[0]._id)
            return {status:400, message:'unLiked'}
        }catch(err){
            console.log("error on unsaving: ", err)
        }
    }else{
        try{
            const doc = {
            _type:"likedCommment", userId:userId, commentId:commentId
            }
            await client.create(doc)
            return {status:200, message:'saved to board'}
        }catch(err){
            console.log("error on saving: ", err)
        }
    }  
}



