import { Link, useLocation } from "react-router-dom"

import LogoutButton from "features/auth/LogoutButton"

const Header = () => {
  let location = useLocation()

  return (
    <header className="sticky top-0 z-30 mx-auto border-b border-gray-200 bg-clip-padding bg-opacity-60 max-w-8xl xl:px-8 backdrop-filter backdrop-blur">
      <div className="flex justify-between mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-0">
        <Link to="/" className="flex items-center">
          <img
            className="rounded max-h-8 mr-2 text-white"
            src="/logo.svg"
            alt="Mini Wallet"
          />
        </Link>

        {location.pathname === "/" && <LogoutButton />}
      </div>
    </header>
  )
}

export default Header
