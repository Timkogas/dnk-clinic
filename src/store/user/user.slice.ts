import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../createAppAsyncThunk";



export const getVKUser = createAppAsyncThunk(`getVKUser`, async () => {
  const data = await bridge.send('VKWebAppGetUserInfo').then((data) => {
    if (data.id) {
      return data
    }
  })
  return data
})

export interface IUser {
  user: UserInfo
}


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  } as IUser,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVKUser.fulfilled, (state, action) => {
        state.user = action.payload as UserInfo
      })
  }
})