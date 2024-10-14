'use client'
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";
import Image from "next/image";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";


export default function NavbarAvatar({image, name, username}:any) {
  return (
    <Dropdown className="text-foreground">
      <DropdownTrigger className=" cursor-pointer">
        {image ?
       <Image src={image} width={50} height={50} alt={name} 
       className="rounded-full border-3 border-primary-500 h-10 w-10" />
       :
       <Avatar name={name?.slice(0,3)} isBordered showFallback size="md" />}
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile"><Link className="block" href={`/profile/${username || name}`}>Profile</Link></DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem  key="delete" className="text-danger hover:text-background " color="danger">
        <LogoutLink className=" text-foreground bg-inherit">Log out</LogoutLink>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
