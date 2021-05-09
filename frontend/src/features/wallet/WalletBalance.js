import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import Skeleton from "components/skeleton"

import { getBalance } from "./walletSlice"

const WalletBalance = () => {
  const { balance, balance_updated, status } = useSelector(
    (state) => state.wallet
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBalance())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="my-12">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-mono font-bold leading-none text-black">
          {status ? (
            balance_updated ? (
              balance.toLocaleString(undefined)
            ) : (
              <Skeleton height={30} width={60} />
            )
          ) : (
            "****"
          )}
        </h2>
        <img className="h-7 ml-2" src="/coin.svg" alt="Coin" />
      </div>

      <p className="text-center text-sm text-gray-600 mt-2">
        {!status && "Wallet is currently disabled."}
        {!balance_updated && "Your balance is being updated."}
      </p>
    </div>
  )
}

export default WalletBalance
