import { createSlice } from '@reduxjs/toolkit'

export const ChatUserSlice = createSlice({
  name: 'chatData',
  initialState: {
    value: JSON.parse(localStorage.getItem('chatUser'))? JSON.parse(localStorage.getItem('chatUser')): null,
  },
  reducers: {
    chatUserData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { chatUserData } = ChatUserSlice.actions

export default ChatUserSlice.reducer