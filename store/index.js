import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { postReducer } from "./post";
import { userReducer } from "./userSlice";
import { nftReducer } from "./nfts";
import { followersReducer } from "./followers";
import { followingReducer } from "./following";
import { selectedUserReducer } from "./selectedUser";
import { activeNftReducer } from "./activeNfts";
import collectionReducer from "./collections";


const reducer = {
  user: userReducer,
  socialPost: postReducer,
  followers: followersReducer,
  following: followingReducer,
  selectedUser: selectedUserReducer,
  nfts: nftReducer,
  activeNfts: activeNftReducer,
  collection: collectionReducer,

};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
   });

export default store;
