import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  activeNfts: [],
}

export const setActiveNft = createAsyncThunk(
  "activeNfts/setActiveNft",
  async (data) => {
    try {
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const activeNftSlice = createSlice({
  name: "activeNfts",
  initialState,
  reducers: {},
  extraReducers: {
    [setActiveNft.pending]: (state) => {
      state.status = "loading";
    },
    [setActiveNft.fulfilled]: (state, action) => {
      state.activeNfts = [...state.activeNfts, action.payload];
      state.status = "success";
    },
    [setActiveNft.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    }
  },
});


export const activeNftReducer = activeNftSlice.reducer;
