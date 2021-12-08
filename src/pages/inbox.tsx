import { Box, Flex, Heading, Button, Icon, Table, Thead, Th, Td, Tr, Checkbox, Tbody, Text } from "@chakra-ui/react";
import { RiAddLine, RiDeleteBackLine, RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useQuery } from 'react-query'
import { Spinner } from "@chakra-ui/react";
import { userInfo } from "os";
import { api } from "../services/api";
import { useContext } from "react";
import { EmailsContext } from "../emailscontext";
import Modal from 'react-modal';



export default function InboxList() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal () {
        setIsModalOpen(true);
        console.log("teste")

    }

    function handleCloseModal () {
        setIsModalOpen(false)

    }

    /*
    const { data, isLoading, error } = useQuery('emails', async () => {
        await api.get('emails')
    })

    console.log(data); */
    
    
    const list = useContext(EmailsContext)
    


    return (
        <Box>
            <Header />
            <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                <Text textColor="pink.200" fontSize="3xl">Insert Email</Text>
            </Modal>
            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">E-mails</Heading>
                        <Button onClick={handleOpenModal} size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine}  />}> Create New </Button>
                    </Flex>

                    <Table colorScheme="WhiteAlpha">
                                    <Thead>
                                        <Tr>
                                            <Th px="6" color="gray.300" width="8">
                                                <Checkbox colorScheme="pink" />
                                            </Th>
                                            <Th>E-mail</Th>
                                            <Th>Date</Th>
                                            <Th width="8"></Th>
                                        </Tr>
                                    </Thead>
                                   <Tbody>
                                       { list.map(email=>{
                                           return (
                                            <Tr key={email.id}>
                                            <Td px="6">
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <Text fontWeight="bold"> {email.user} </Text>
                                                    <Text fontSize="sm" color="gray.300"> {email.email} </Text>
                                                    <Text fontSize="sm" color="gray.300"> {email.subject}</Text>
                                                </Box>
                                            </Td>
                                            <Td>{email.createdAt}</Td>
                                            <Td>
                                                <Button as="a" size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiDeleteBinLine} />}> Delete </Button>
                                            </Td>
                                        </Tr>
                                           )
                                       })
                                       
                                       }

                                    </Tbody> 
                                </Table>
                   

                </Box>
            </Flex>

        </Box>
    );

}