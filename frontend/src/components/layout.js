import Header from "./header"

const Layout = ({ children }) => (
  <>
    <Header />

    <div
      className="max-w-7xl mx-auto sm:px-6 lg:px-8 sm:grid sm:place-items-center"
      style={{ height: "80vh" }}
    >
      <div className="w-full max-w-md p-8 sm:mt-8 bg-white sm:rounded-md shadow-md dark:bg-gray-800">
        {children}
      </div>
    </div>
  </>
)

export default Layout
