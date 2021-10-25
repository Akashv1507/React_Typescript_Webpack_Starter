import { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Layout from './components/Layout/Layout'
import UserProfile from './components/Profile/UserProfile'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AuthContext from './store/auth-context'

function App() {
  const authCtx = useContext(AuthContext)
  const userRole = authCtx.userRole
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        {/* {!authCtx.isLoggedIn && (
          <Route path="/login">
            <LoginPage />
          </Route>
        )} */}
        <Route path="/login">
          <LoginPage />
        </Route>

        {/* {userRole === 'SuperAdmin' && (
          <Route path="/signup">
            <SignupPage />
          </Route>
        )} */}
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/hi">
          <h1>Hi akash</h1>
        </Route>

        {/* <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route> */}
        <Route path="/profile">
          <UserProfile />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
