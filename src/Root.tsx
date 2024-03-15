import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DetailsPage from './pages/DetailsPage';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='details/:name' element={<DetailsPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Root