import React from 'react'
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DetailsPage from './pages/DetailsPage'
import { routes } from './constants'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.root} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={routes.details} element={<DetailsPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.signup} element={<SignupPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Root