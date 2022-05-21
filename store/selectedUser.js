import axios from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

/*
  this state would hold each user you visit on their prof;
  by doing this we can edit their state and re render the page with every
  follow and unfollow
*/

const initialState = {
  selectedUser: {},
  status: null,
  error: null
}

export const fetchSelectedUser = createAsyncThunk(
  'selectedUser/fetchSelectedUser',
  async (username) => {
    try {
      console.log('usernameeee', username)
      const {data: user} = await axios.get(`/api/users/${username}`)
      return user
    } catch (err) {
      console.log(err)
    }
  }
)

// follow / unfollow thunks
export const followUser = createAsyncThunk(
  'followers/followUser',
  async (info) => {
    // wallet is user logged in trying to follow user by username
    const {wallet, username} = info;
    try {
      const {data} = await axios.put(`/api/users/${username}`, {params: {wallet, username}})
      return data
    } catch(err) {
      console.log(err)
    }
  }
)

export const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSelectedUser.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSelectedUser.fulfilled]: (state, action) => {
      state.selectedUser = action.payload;
      state.status = "success";
    },
    [fetchSelectedUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [followUser.pending]: (state) => {
      state.status = "loading";
    },
    [followUser.fulfilled]: (state, action) => {
      state.selectedUser = action.payload;
      state.status = "success";
    },
    [followUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  }
})

export const selectedUserReducer = selectedUserSlice.reducer
