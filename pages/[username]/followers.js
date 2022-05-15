import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Image, Text, Button, useDisclosure, Stack, Flex} from '@chakra-ui/react';
import { fetchFollowers } from '../../store/followers';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function Followers() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {followers} = useSelector(state => state.followers);

  useEffect(() => {
    dispatch(fetchFollowers(router.query.username))
  }, [])

  return (
    <>
    <Button ml={5} onClick={() => router.push(`/${router.query.username}`)} >{<ArrowBackIcon w={8} h={8} mr={1}/>}Back</Button>
    <Text fontSize={20} fontWeight='bold' textAlign='center' mb={5}>Followers</Text>
    <Container>
    {followers?.map(f => (
      <Link key={f.username} href={`/${f.username}`} passHref>
        <Flex  w='100%' borderWidth={1} alignItems='center' mb={2} cursor='pointer'>
          <Image alt='user' src={f.imageUrl} h={100} w={100} borderRadius={100} m={2}/>
          <Text fontSize={30} ml={5}>@{f.username}</Text>
        </Flex>
      </Link>
    ))}
  </Container>
    </>
  )
}
