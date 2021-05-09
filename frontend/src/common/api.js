import store from "../store"
import { API_URL } from "config"

const fetchApi = (method, endpoint, body) => {
  const token = store && store.getState().auth.token

  if (!token && endpoint !== "init") return
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      ...(token && { Authorization: `Token ${token}` }),
    },
    method,
    body,
  })
}

export const generateError = (error) => {
  return {
    status: "fail",
    data: { error },
  }
}

export const getDelay = (min = 1000, max = 3000) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export default fetchApi
