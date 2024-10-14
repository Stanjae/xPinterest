import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";

const options = { next: { revalidate: 60 } }


export const GET_BOARD_QUERY = defineQuery(`*[_type == "board" && creator._ref == $userid] | order(_createdAt desc){
  _id, name, description, _updatedAt, creator->{username}, slug
}`)


export const getAllPins = async (query:string | undefined) => {
  const params = {}
  let PROFILE_QUERY;
  if(query !== ''){
    PROFILE_QUERY = defineQuery(`*[_type == "pin" && name match "${query}" || note match "${query}"]{
  _id, name, creator->{username, author_image, _id}, slug, url_location, pin_image, note
}`);
  }else{
    PROFILE_QUERY = defineQuery(`*[_type == "pin"]{
      _id, name, creator->{username, author_image, _id}, slug, url_location, pin_image, note
    }`);
  }
  const result = await client.fetch(PROFILE_QUERY, params, options);
  return result;
}

//get creator Pins
export const getAllCreatorPins = async (creatorId:string | undefined) => {
  const params = {}
  const CREATOR_PINS = defineQuery(`*[_type == "pin" && creator._ref == "${creatorId}"]{
      _id, name, creator->{username, author_image, _id}, slug, url_location, pin_image, note
    }`);
  
  const result = await client.fetch(CREATOR_PINS, params, options);
  return result;
}

export const getAllSimilarPins = async (creatorId:string | undefined, pinId:any) => {
  const params = {}
  try{
    const SIMILAR_PINS = defineQuery(`*[_type=="pin" && _id == "${pinId}"][0]{topics}`);
    const result = await client.fetch(SIMILAR_PINS, params, options);
    const newTopics = result?.topics?.split(',')?.at(0)
    const SIM_PINS = defineQuery(`*[_type =="pin" && _id != "${pinId}" && topics match "${newTopics}"]{
      _id, name, creator->{username, author_image, _id}, slug, url_location, pin_image, note
    }`);
    const resulto = await client.fetch(SIM_PINS, params, options);
    return resulto
  }catch(err){
    console.log(err)
  }
}

export const checkPinSavedStatus =async(boardId:string, pinId:string)=>{
  const SAVED_QUERY = defineQuery(`*[_type == "saved" && boardId == '${boardId}' && pinId == "${pinId}"]{
    _id
  }`);
  const result = await client.fetch(SAVED_QUERY);
  return result
}

export const checkLikedSavedStatus =async(userId:string, pinId:string)=>{
  const LIKED_QUERY = defineQuery(`*[_type == "liked" && userId == '${userId}' && pinId == "${pinId}"]{
    _id
  }`);
  const result = await client.fetch(LIKED_QUERY);
  return result
}

export const checkFollowedStatus =async(userId:string, authorId:string)=>{
  const FOLLOW_QUERY = defineQuery(`*[_type == "follow" && userId == '${userId}' && authorId == "${authorId}"]{
    _id
  }`);
  const result = await client.fetch(FOLLOW_QUERY);
  return result
}

export const getLikedSavedCount =async(pinId:string)=>{
  const params = {}
  const PINS_QUERY = defineQuery(`count(*[_type == "liked" && references('${pinId}')])`);
  const result = await client.fetch(PINS_QUERY, params, options);
  return result
}

export const getUserCreatedPins = async (userid:string) => {
  const params = {}
  const PINS_QUERY = defineQuery(`*[_type == "pin" && references('${userid}')]{
    _id, name, note, _updatedAt, creator->{username}, slug, pin_image,
  }`);
  const result = await client.fetch(PINS_QUERY, params, options);
  return result;
}

export const getSinglePin = async (pinId:string) => {
  const params = {}
  const PINS_QUERY = defineQuery(`*[_type == "pin" && _id == '${pinId}']{
    _id, name, note, category, topics, url_location, _updatedAt, creator->{username, author_image, _id}, slug, pin_image, board_type->{name}
  }`);
  const result = await client.fetch(PINS_QUERY, params, options);
  return result?.at(0);
}

export const getPinComments = async (pinId:string) => {
  const params = {}
  const PINS_COMMENTS = defineQuery(`*[_type == "comments" && references('${pinId}')] | order(_createdAt desc){
     _updatedAt, user->{username, author_image, _id}, comments, _id, 
  }`);
  const result = await client.fetch(PINS_COMMENTS, params, options);
  return result
}

//getCommentLikedCount
export const getCommentLikedCount = async(commentId:string) => {
  const params = {}
  const COMMENT_COUNT_QUERY = defineQuery(`count(*[_type == "likedCommment"  && commentId == '${commentId}'])`);
  const result = await client.fetch(COMMENT_COUNT_QUERY, params, options);
  console.log("sandor: ",result)
  return result
}

export const checkIfUserIdExistsInCommentArray = async (commentId:string, userId:string) => {
  const COMMENT_QUERY =  defineQuery(`*[_type == "likedCommment" && userId == '${userId}' && 
    commentId == "${commentId}"]{
    _id
  }`);
  const result = await client.fetch(COMMENT_QUERY);
  return result
}

export const getPinCountForSingleBoard = async (boardId:string) => {
  const params = {}
  const PINS_QUERY = defineQuery(`count(*[_type == "pin" && references('${boardId}')])`);
  const result = await client.fetch(PINS_QUERY, params, options);
  return result
}

export const getPinImagesForSingleBoard = async (boardId:string) => {
  const params = {}
  const PINS_QUERY = defineQuery(`*[_type == "pin" && references('${boardId}')][0..4] | order(_createdAt desc){
    pin_image
    }`);
  const result = await client.fetch(PINS_QUERY, params, options);
  return result
}

export const getSavedPinForSingleBoard = async (boardId:string) => {
  const params = {}
  const PINS_QUERY = defineQuery(`*[_type == "pin" && references('${boardId}')] | order(_createdAt desc){
  _id, name, creator->{username, author_image}, slug, url_location, pin_image, note
}`);
  const SAVED_PINS_QUERY = defineQuery(`*[_type == "saved" && references('${boardId}')] | order(_createdAt desc){
    ...pin->{_id, name, creator->{username, author_image}, slug, url_location, pin_image, note}
  }`);
  const result = await client.fetch(PINS_QUERY, params, options);
  const savedResult = await client.fetch(SAVED_PINS_QUERY, params, options);
  const pinCount = result?.length
  const totalPins = result?.concat(savedResult);
  console.log("result:", result)
  console.log("savedresult:", savedResult)
  return {totalPins, pinCount}
}


export const getUserFollowersCount = async (userId:string) => {
  const params = {}
  const FOLLOWERS_QUERY = defineQuery(`count(*[_type == "follow" && authorId =='${userId}'])`);
  const FOLLOWING_QUERY = defineQuery(`count(*[_type == "follow" && userId =='${userId}'])`);
  try{
    const followers = client.fetch(FOLLOWERS_QUERY, params, options);
    const following = client.fetch(FOLLOWING_QUERY, params, options);

    const [followersCount, followingCount]:any = await Promise.all([followers, following])
    return {followersCount, followingCount}
  }catch(e){
    console.log(e)
  }
}
