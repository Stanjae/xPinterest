'use client'
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import React, {useState} from "react";
import CreateBoard from "../modals/CreateBoard";
import Link from "next/link";

export const AddButtonDropdown =({onOpen}:any)=>{
    
    return (
      <Dropdown placement='bottom'
        showArrow
        classNames={{
          base: "before:bg-default-200", // change arrow background
          content: "py-1 px-1 border text-foreground border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
        }}
      >
        <DropdownTrigger>
        <Button radius='full' className={` z-50 absolute -top-10 right-10`} size="lg" variant="shadow" isIconOnly>
            <PlusIcon className="h-6 w-6"/>
        </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Create">
        <DropdownSection className="space-y-1" title="Create"> 
            <DropdownItem key="pin">
             <Link className="block" href={'/creation-pin-tool'}>Pin</Link> 
            </DropdownItem>

            <DropdownItem onPress={onOpen} key="board">
              Board
            </DropdownItem>
            
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    );
  }