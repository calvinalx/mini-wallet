import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import NumberFormat from "react-number-format"

import { withdraw, deposit } from "./walletSlice"

const WalletControl = () => {
  const [action, setAction] = useState("")
  const [amount, setAmount] = useState()
  const [referenceId, setReferenceId] = useState("")

  const { status } = useSelector((state) => state.wallet)
  const dispatch = useDispatch()

  const handleSubmit = (e, action) => {
    e.preventDefault()

    switch (action) {
      case "deposit":
        dispatch(
          deposit({
            amount,
            referenceId,
          })
        )
        setAmount(0)
        setReferenceId("")
        return
      case "withdraw":
        dispatch(
          withdraw({
            amount,
            referenceId,
          })
        )
        setAmount(0)
        setReferenceId("")
        return
      default:
        return
    }
  }

  return (
    <form className="space-y-4" onSubmit={(e) => handleSubmit(e, action)}>
      <div>
        <label className="label">
          Reference ID
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setReferenceId(uuidv4())}
            className={`h-4 w-4 ml-1 text-gray-600 hover:text-gray-800 cursor-pointer ${
              !status && "pointer-events-none"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <input
          type="text"
          value={referenceId}
          onChange={(e) => setReferenceId(e.target.value)}
          disabled={!status}
          placeholder="my-reference-id"
          className="input"
          required
        />
      </div>

      <div>
        <label className="label">Amount</label>
        <NumberFormat
          value={amount}
          onValueChange={(values) => setAmount(values.floatValue)}
          thousandSeparator={true}
          disabled={!status}
          placeholder="1,000"
          allowNegative={false}
          className="input"
          required
        />
      </div>

      <div className="flex">
        <input
          type="submit"
          value="Deposit"
          onClick={() => setAction("deposit")}
          disabled={!status}
          className="btn w-1/2 mr-2"
        />

        <input
          type="submit"
          value="Withdraw"
          onClick={() => setAction("withdraw")}
          disabled={!status}
          className="btn w-1/2"
        />
      </div>
    </form>
  )
}

export default WalletControl
