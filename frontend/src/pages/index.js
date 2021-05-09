import { useSelector } from "react-redux"

import Layout from "components/layout"
import Alert from "components/alert"
import WalletBalance from "features/wallet/WalletBalance"
import WalletControl from "features/wallet/WalletControl"
import WalletToggle from "features/wallet/WalletToggle"

const Index = () => {
  const { fetch_status, error } = useSelector((state) => state.wallet)

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl leading-125 font-bold">My Wallet</h1>
          <p className="text-gray-500">Manage your money with ease</p>
        </div>
        <WalletToggle />
      </div>

      <WalletBalance />
      <WalletControl />

      {fetch_status === "fail" && <Alert message={error} />}
    </Layout>
  )
}

export default Index
