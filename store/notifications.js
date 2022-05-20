import axios from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
  status: null,
  error: null
}

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId) => {
    try {
      const {data: notifications} = await axios.get('/api/notifications/', {params:{id:userId}})
      return notifications
    } catch (err) {
      console.log(err)
    }
  }
)

export const cleanNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    try {
      await axios.delete('/api/notifications/')
    } catch (err) {
      console.log(err)
    }
  }
)
export const markDelivered = createAsyncThunk(
  'notifications/markDelivered',
  async (id, {dispatch}) => {
    try {
      await axios.patch('/api/notifications/', {id:id})
      dispatch(cleanNotifications())
    } catch (err) {
      console.log(err)
    }
  }
)
export const addNotification = createAsyncThunk(
  'notifications/addNotification',
  async (notificationData, {dispatch}) => {
    try {
      await axios.put('/api/notifications/', {notificationData})
      dispatch(cleanNotifications())
    } catch (err) {
      console.log(err)
    }
  }
)


export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotifications.pending]: (state) => {
      state.status = "loading";
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload;
      state.status = "success";
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  }
})

export const notificationsReducer = notificationsSlice.reducer
