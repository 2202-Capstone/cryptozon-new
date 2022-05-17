import { Box,Button, Text } from '@chakra-ui/react'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { newPost } from '../store/post';
import PostModal from './PostModal'

export default function Addpost() {
  const {user:walletUser} = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const openModal = (data) =>{
    setOpen(true);
    setData(data)
  }
  const closeModal = () =>{
    setOpen(false);
    setData({})
  }
  const addPost = (userId,post,imgUrl) =>{
    const data = {
      userId: userId,
      content: post,
      likes: 0,
    }
    if(!!imgUrl){
      data.imageUrl = imgUrl
      data.postImage = true
    }
    dispatch(newPost(data));
  }
  return (
    <Box>
        <Button onClick={()=>{openModal(walletUser)}}>Add a new post</Button>
        <PostModal open={open} closeFunc={closeModal} data={data} addPost={addPost}/>
    </Box>
  )
}
