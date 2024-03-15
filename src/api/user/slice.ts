import { createSlice } from "@reduxjs/toolkit"
import { createUser, loginUser, getCurrentUser } from './actions'
import { User } from '../../types/user'
import { tokenName } from '../../constants'

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
      localStorage.removeItem(tokenName)
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem(tokenName, action.payload.token)
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null
      })

      .addCase(createUser.fulfilled, (state, action) => {
        localStorage.setItem(tokenName, action.payload.token)
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state) => {
        state.user = null
      })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
