import React, { Children } from 'react'
import { 
    IconButton,
    useDisclosure,
      Modal,
      ModalOverlay,
      ModalContent,
      ModalHeader,
      ModalFooter,
      ModalBody,
      ModalCloseButton,
      Button,
      VStack,
      HStack,
      Image,
      Text,
      Icon,
     
    } from '@chakra-ui/react';
import { GrFormView } from "react-icons/gr";
import { FaEnvelope } from "react-icons/fa";

const ProfileModel = ({user,children}) => {

   const {isOpen, onOpen, onClose} = useDisclosure();
  return (
   <>
   {children ? (
      <span onClick={onOpen}>{Children}</span>

   ) :(
      <IconButton display = {{base:"flex"}}  onClick={onOpen}>
         <GrFormView className=' text-3xl' />
      </IconButton>
   )
 }
   <Modal size="lg"  isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent h="400px">
  <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
    {user.fullName}
  </ModalHeader>
  <ModalCloseButton />
  <ModalBody>
    <VStack spacing={2} align="center">
      <Image
        src={user.coverImage}
        alt={user.fullName}
        rounded="md"
        boxSize="100%"
        h="190px"
        objectFit="cover"
      />
      <HStack spacing={4} align="center">
        <Image
          src={user.profileImage}
          alt={user.fullName}
          rounded="full"
          boxSize="80px"
          border="4px solid white"
        />
        <VStack spacing={2} align="start">
          <Text fontSize="xl" fontWeight="semibold">
            @{user.username}
          </Text>
          <HStack spacing={1} align="center">
            <Icon as={FaEnvelope} />
            <Text>{user.email}</Text>
           </HStack>
          </VStack>
        </HStack>
      </VStack>
     </ModalBody>
    </ModalContent>

    </Modal>

   </>
  
  )
}

export default ProfileModel