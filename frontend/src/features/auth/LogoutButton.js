import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { logout } from "./authSlice"
import { clear } from "features/wallet/walletSlice"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <button
      className="flex items-center"
      onClick={() => {
        dispatch(logout())
        dispatch(clear())
        history.push("/login")
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400 hover:text-gray-700"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}

export default LogoutButton
