import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Routes from './Routes'
import NavPortada from "./components/NavPortada"
import { AuthContextProvider } from "./context/authContext";
import Footer from './components/Footer';

export default function App() {
  return (
    <div>
      <Router>
        <AuthContextProvider>
          <NavPortada />
          <Switch>
            <Routes />
          </Switch>
          <Footer />
        </AuthContextProvider>
      </Router>
    </div>
  )
}
