import { Box, Flex, Heading, Button, Icon, Table, Thead, Th, Td, Tr, Checkbox, Tbody, Text } from "@chakra-ui/react";
import { RiAddLine, RiDeleteBackLine, RiDeleteBinLine } from "react-icons/ri";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useQuery } from 'react-query'
import { Spinner } from "@chakra-ui/react";
import { userInfo } from "os";

export default function InboxList() {

    const { data, isLoading, error } = useQuery('emails', async () => {
        const response = await fetch('http://localhost:3000/api/emails')
        const data = await response.json()
        return data
    })

    console.log(data);

    /*
    useEffect (()=>{
        fetch('http://localhost:3000/api/emails')
        .then(response=>response.json())
        .then(data=>console.log(data))
    },[])
    */


    return (
        <Box>
            <Header />
            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">E-mails</Heading>
                        <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} />}> Create New </Button>
                    </Flex>

                    {isLoading ?
                        (<Flex justify="center">
                            <Spinner />
                        </Flex>

                        ) : error ? (
                            <Flex justify="center">
                                <Text>Error in get Data from API</Text>
                            </Flex>)
                            : (

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
                                       {data.emails.map(email=>{
                                           return (
                                            <Tr key={email.id}>
                                            <Td px="6">
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <Text fontWeight="bold"> {email.user} </Text>
                                                    <Text fontSize="sm" color="gray.300"> {email.email} </Text>
                                                    <Text fontSize="sm" color="gray.300"> {email.content}</Text>
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

                            )
                    }

                </Box>
            </Flex>

        </Box>
    );

}