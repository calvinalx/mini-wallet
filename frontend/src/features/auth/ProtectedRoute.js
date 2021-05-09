import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"

const ProtectedRoute = (props) => {
  const token = useSelector((state) => state.auth.token)

  if (!token)
    return (
      <>
        <Redirect to="/login" />
        <Route {...props} />
      </>
    )

  return <Route {...props} />
}

export default ProtectedRoute
