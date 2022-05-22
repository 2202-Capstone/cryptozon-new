import axios from "axios";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { addNotification } from "./notifications";

const initialState = {
    post:[],
}
export const fetchAllPost = createAsyncThunk(
  'post/fetchPost',
  async () => {
      try {
        const {data:postData} = await axios.get('/api/post');
        const pDataModified = Promise.all(postData.map(async (e)=>{
          let temp = {...e}
          const {data:uri} = await axios.get('/api/img/', {params:temp.content});
          temp.contentUri = uri
          return temp;
        }))
        return pDataModified;
      } catch (error) {
        console.log(error)
      }
  }
)
export const likeItem = createAsyncThunk(
  'post/likeItem',
  async (itemInfo, {dispatch}) => {
      try {
        await axios.put('/api/likes', itemInfo )
        dispatch(fetchAllPost());
      } catch (error) {
          console.log(error)
      }
  }
)
export const unlikeItem = createAsyncThunk(
  'post/unlikeItem',
  async (itemInfo, {dispatch}) => {
      try {
        await axios.delete('/api/likes', {data:itemInfo} )
        dispatch(fetchAllPost());
      } catch (error) {
          console.log(error)
      }
  }
)

export const commentPost = createAsyncThunk(
  'comment/commentPost',
  async (newComment,{dispatch}) => {
      try {
        const {postId, userId} = newComment
        await axios.put('/api/comments/', newComment);
        await axios.patch('/api/post',{postId:postId,userId:userId})
        const {data} = await axios.get(`/api/post/${postId}`)
        data.subscribedUsers.forEach(async (user) => {
          const {data:userInfo} = await axios.get(`/api/user/${userId}`)
          const payload = {
            title:`New Comment From ${userInfo.username}`,
            content: newComment.content,
            userId: user
          }
          if(user!==userId){
            dispatch(addNotification(payload))
          }
        });

        dispatch(fetchAllPost());
      } catch (error) {
          console.log(error)
      }
  }
)
export const newPost = createAsyncThunk(
  'post/newPost',
  async (newPost,{dispatch}) => {
      try {
        await axios.put('/api/post/', newPost);
        dispatch(fetchAllPost());
      } catch (error) {
          console.log(error)
      }
  }
)

export const textToImage = async () => {
      try {
        const imgUri = await axios.get('/api/img/', {params:text});
        return imgUri
      } catch (error) {
          console.log(error)
      }
}

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postToDelete, {dispatch}) => {
    try {
      await axios.delete('/api/post', {data: postToDelete})
      return dispatch(fetchAllPost())
    } catch (error) {
      console.log(error)
    }
  }
)

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{},
    extraReducers: {
      [fetchAllPost.pending]: (state) => {
        state.status = "loading";
      },
      [fetchAllPost.fulfilled]: (state, action) => {
        state.AllPost = action.payload;
        state.status = "success";
      },
      [fetchAllPost.rejected]: (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      },
    }
})

export const postReducer = postSlice.reducer;
