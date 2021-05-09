import Layout from "components/layout"
import LoginForm from "features/auth/LoginForm"

const Login = () => {
  return (
    <Layout>
      <h1 className="text-xl leading-125 font-bold">Welcome 👋</h1>
      <p className="text-gray-500">
        Login with your Customer ID to get started
      </p>
      <LoginForm />
    </Layout>
  )
}

export default Login
