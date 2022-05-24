import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  nfts: [],
  status: null,
  error: null
}


export const fetchNfts = createAsyncThunk(
  "nfts/fetchNfts",
  async (wallet) => {
    try {
      const {data: nfts} = await axios.get(`/api/moralis/nfts?address=${wallet}`)
      return nfts;
    } catch (error) {
      console.log(error)
    }
  }
);

export const toggleHidden = createAsyncThunk(
  "nfts/toggleHidden",
  async (nft) => {
    try {
      const {data: updatedNft} = await axios.put('/api/nfts', nft)
      return updatedNft
    } catch(err) {
      console.log(err)
    }
  }
)

export const nftSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNfts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchNfts.fulfilled]: (state, action) => {
      state.nfts = action.payload;
      state.status = "success";
    },
    [fetchNfts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [toggleHidden.pending]: (state) => {
      state.status = "loading";
    },
    [toggleHidden.fulfilled]: (state, action) => {
      const data = state.nfts.data.map(n => {
        if (n.id == action.meta.arg.id) {
          return action.meta.arg
        }
        return n
      })
      state.nfts = {data, status: 'success'}
      state.status = "success";
    },
    [toggleHidden.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    }
  },
});

export const nftReducer = nftSlice.reducer;
