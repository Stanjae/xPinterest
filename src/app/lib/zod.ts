import { object, string } from "zod"


export const createPinFormSchema = object({
    title: string({ required_error: "Pin title is required" })
    .min(4, "Pin title is short"),
    description: string(),
    pinOriginUrl:string(),
    board:string({ required_error: "Board is required" }).min(2, "Board is empty"),
    category:string({ required_error: "Category is required" }).min(2, "Category is empty"),
    topics:string({ required_error: "Topics is required" })
  })

  export const createBoardFormSchema = object({
    title: string({ required_error: "Pin title is required" })
    .min(4, "Pin title is short"),
    description: string(),
    
  })