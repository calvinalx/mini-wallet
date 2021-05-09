import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import fetch from "common/api"

export const initialState = {
  token: "",
}

export const login = createAsyncThunk("auth/login", async (id) => {
  let formData = new FormData()
  formData.append("customer_xid", id)

  const response = await fetch("POST", "init", formData)
  const data = await response.json()
  return data
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = ""
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loading"
    },
    [login.fulfilled]: (state, action) => {
      const { data, status } = action.payload
      state.status = status
      state.token = data.token
      state.error = data.error
    },
    [login.rejected]: (state) => {
      state.status = "fail"
      state.error = "An error occured while communicating with the API."
    },
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
