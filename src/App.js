import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Routes from './Routes'
import NavPortada from "./components/NavPortada"
import { AuthContextProvider } from "./context/authContext";

export default function App() {
  return (
    <div>
      <Router>
        <AuthContextProvider>
          <NavPortada />
          <Switch>
            <Routes />
          </Switch>
        </AuthContextProvider>
      </Router>
    </div>
  )
}
