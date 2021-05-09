import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Switch } from "react-router-dom"

import { default as Route } from "features/auth/ProtectedRoute"

import store from "./store"
import routes from "./routes"

import "./index.css"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} path={route.path}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
)
