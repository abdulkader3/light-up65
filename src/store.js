import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slices/UserSlice'
import ChatUserSlice from './slices/ChatUserSlice'

export default configureStore({
  reducer: {
    counter: UserSlice,
    chatData: ChatUserSlice,
  },
})