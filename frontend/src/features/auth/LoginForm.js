import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import { login } from "./authSlice"

const LoginForm = () => {
  const dispatch = useDispatch()
  const { token, status, error } = useSelector((state) => state.auth)

  const [id, setId] = useState("ea0212d3-abd6-406f-8c67-868e814a2436")

  const history = useHistory()

  useEffect(() => {
    if (token) {
      history.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(id))
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <label className="label">Customer ID</label>

      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="input"
        required
      />
      {status === "fail" && (
        <p className="mt-2 text-sm text-red-500">
          {error.customer_xid ? error.customer_xid[0] : error}
        </p>
      )}

      <input type="submit" value="Login" className="btn" />
    </form>
  )
}

export default LoginForm
