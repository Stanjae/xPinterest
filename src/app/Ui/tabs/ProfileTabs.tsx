'use client'
import {Tabs, Tab, Card, CardBody, useDisclosure} from "@nextui-org/react";
import BoardCard from "../cards/BoardCard";
import { AddButtonDropdown } from "../Btns/AddBtnDropdown";
import CreateBoard from "../modals/CreateBoard";
import { useQuery } from "@tanstack/react-query";
import { getUserCreatedPins } from "@/app/lib/data";
import CreatedCard from "../cards/CreatedCard";
import TextLoading from "../loaders/TextLoading";
import MasonryLayout from "../masonry/MasonryLayout";



export default function ProfileTabs({boards, userid}:any) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const {data, isPending} = useQuery({queryKey: ['userPins', userid], 
    queryFn: async() => {
      const response = await getUserCreatedPins(userid)
      return response
    }})

    console.log("boards: ", boards)

  return (
    <div className=" flex relative justify-center w-full gap-y-10 flex-col">
      <AddButtonDropdown onOpen={onOpen}/>
      <CreateBoard isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      <Tabs className="flex justify-center" aria-label="Options">
        <Tab key="created" title="Created">
        {isPending &&<div className=" flex justify-center items-center"><TextLoading/></div>}
          <MasonryLayout>
             { data && data?.map((item:any, index:number)=>(
              <CreatedCard key={index} userId={userid} pin={item} />
             ))}
          </MasonryLayout> 
        </Tab>
        <Tab key="saved" title="Saved">
            <div className="grid grid-cols-5 gap-5 items-center">
              {boards?.map((item:any, index:number)=>(
                 <BoardCard key={index} item={item} noOfPins={5}/>
              ))}
            </div> 
        </Tab>
      </Tabs>
    </div>  
  );
}