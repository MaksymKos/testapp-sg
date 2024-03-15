import { createSlice } from "@reduxjs/toolkit"
import { createUser, loginUser, getCurrentUser } from './actions'
import { User } from '../../types/user'

type InitialState = {
  userError: string | null,
  user: User | null,
}

const initialState: InitialState = {
  userError: null,
  user: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      // getCurrentUser
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      // .addCase(getCurrentUser.rejected, (state, action) => {
      //   state.user = null;
      //   state.userError = action.payload;
      // })
      // loginUser
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null
        // state.userError = action.payload;
      })
      // createUser
      .addCase(createUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user = null
        // state.userError = action.payload;
      })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
