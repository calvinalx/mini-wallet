import Home from "pages/index"
import Login from "pages/login"

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    private: true,
    component: Home,
  },
]

export default routes
