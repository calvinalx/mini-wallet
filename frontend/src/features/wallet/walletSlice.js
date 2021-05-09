import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import fetch, { generateError, getDelay } from "common/api"

const initialState = {
  id: "",
  owned_by: "",
  status: "",
  enabled_at: "",
  balance: undefined,
  balance_updated: true,
  fetch_status: "",
}

export const enable = createAsyncThunk("wallet/enable", async () => {
  const response = await fetch("POST", "wallet")
  const data = await response.json()
  return data
})

export const disable = createAsyncThunk("wallet/disable", async () => {
  const formData = new FormData()
  formData.append("is_disabled", true)

  const response = await fetch("PATCH", "wallet", formData)
  const data = await response.json()
  return data
})

export const getBalance = createAsyncThunk("wallet/balance", async () => {
  const response = await fetch("GET", "wallet")
  const data = await response.json()
  return data
})

export const deposit = createAsyncThunk(
  "wallet/deposit",
  async ({ amount, referenceId }, { dispatch }) => {
    if (amount === 0) return generateError("Amount need to be greater than 0")

    let formData = new FormData()
    formData.append("amount", parseFloat(amount) || 0)
    formData.append("reference_id", referenceId)

    const response = await fetch("POST", "wallet/deposits", formData)
    const data = await response.json()

    if (data.status !== "fail")
      setTimeout(() => {
        dispatch(getBalance())
        dispatch(setBalanceIsUpdated())
      }, getDelay())
    dispatch(setBalanceIsUpdated())

    return data
  }
)

export const withdraw = createAsyncThunk(
  "wallet/withdraw",
  async ({ amount, referenceId }, { getState, dispatch }) => {
    const { balance } = getState().wallet

    if (amount === 0) return generateError("Amount need to be greater than 0")
    if (amount > balance)
      return generateError("Amount withdrawn cannot exceed current balance")

    let formData = new FormData()
    formData.append("amount", parseFloat(amount) || 0)
    formData.append("reference_id", referenceId)

    const response = await fetch("POST", "wallet/withdrawals", formData)
    const data = await response.json()

    if (amount <= balance && data.status !== "fail")
      setTimeout(() => {
        dispatch(getBalance())
        dispatch(setBalanceIsUpdated())
      }, getDelay())

    dispatch(setBalanceIsUpdated())
    return data
  }
)

const loadingReducer = (state) => {
  state.fetch_status = "loading"
}

const errorReducer = (state) => {
  state.fetch_status = "fail"
  state.error = "An error occured while communicating with the API."
}

const fulfillmentReducer = (state, { payload }) => {
  const { data, status } = payload

  state = Object.assign(state, data.wallet)
  state.fetch_status = status
  state.error = data.error
}

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clear: (state) => {
      state = {}
    },
    setBalanceIsUpdated: (state) => {
      state.balance_updated = !state.balance_updated
    },
  },
  extraReducers: {
    // Enable Wallet
    [enable.pending]: loadingReducer,
    [enable.fulfilled]: fulfillmentReducer,
    [enable.rejected]: errorReducer,

    // Disable Wallet
    [disable.pending]: loadingReducer,
    [disable.fulfilled]: fulfillmentReducer,
    [disable.rejected]: errorReducer,

    // Get Balance
    [getBalance.pending]: loadingReducer,
    [getBalance.fulfilled]: fulfillmentReducer,
    [getBalance.rejected]: errorReducer,

    // Deposit
    [deposit.pending]: loadingReducer,
    [deposit.fulfilled]: fulfillmentReducer,
    [deposit.rejected]: errorReducer,

    // Withdraw
    [withdraw.pending]: loadingReducer,
    [withdraw.fulfilled]: fulfillmentReducer,
    [withdraw.rejected]: errorReducer,
  },
})

export const { clear, setBalanceIsUpdated } = walletSlice.actions

export default walletSlice.reducer
