'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import SearchField from "../Inputs/SearchField";

export default function MobileSearchModal({isOpen, onOpen, onClose}:any) {
  return (
    <>
      <Modal size={"md"} backdrop="blur" placement="center" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Search</ModalHeader>
              <ModalBody className="pb-5">
                <SearchField/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
