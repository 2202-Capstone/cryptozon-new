import React from 'react'
import { Container, Box, Image, Button, Text, Stack, Divider } from "@chakra-ui/react";
import { FcApproval } from 'react-icons/fc';

export default function ProfilePosts({posts, user}) {
  const hasPosts = posts.length > 0;
  // ordering posts
  let postList = posts.slice()
  postList.reverse()

  return (
    <Container display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      {hasPosts ?
      posts.map(p => (
        <Box key={p.id} w={400} borderWidth={1} mb={5} borderRadius={10}>
          <Stack direction='row' display='flex' alignItems='center'>
            <Image src={user.imageUrl} h='50px' w='50px' borderRadius={100} m={2}/>
            <Text fontSize={16} mt={5}>{user.username}</Text>
            <FcApproval />
          </Stack>
          {p.imageUrl !== '/assets/question.png' ? <Image src={p.imageUrl} alt='post' w={400} h={300}/> : null}
          <Text ml={3} p={5}>{p.content}</Text>
          <Divider />
          {p.comments.length ?
          p.comments.map(c => (
            <React.Fragment key={c.id}>
              <Stack m={2} direction='row'>
                <Image src={c.user.imageUrl} alt={c.user.username} h='20px' w='20px' borderRadius={100}/>
                <Text fontWeight='bold'>{c.user.username}</Text>
                <Text>{c.content}</Text>
              </Stack>
              <Divider />
            </React.Fragment>
          )) : null
        }
        </Box>
      ))
    : <Text textAlign='center'>~ no posts to display ~</Text>
    }
    </Container>
  )
}
