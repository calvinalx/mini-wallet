import { useSelector, useDispatch } from "react-redux"
import { Switch } from "@headlessui/react"

import { enable, disable } from "./walletSlice"

const WalletToggle = () => {
  const { status } = useSelector((state) => state.wallet)
  const dispatch = useDispatch()

  return (
    <Switch
      checked={status}
      onChange={() => (status ? dispatch(disable()) : dispatch(enable()))}
      className={`${status ? "bg-green-900" : "bg-red-700"}
          relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      style={{ height: 38, width: 74 }}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${status ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        style={{ height: 34, width: 34 }}
      />
    </Switch>
  )
}

export default WalletToggle
