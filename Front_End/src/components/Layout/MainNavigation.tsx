import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import classes from './MainNavigation.module.css'

const MainNavigation: React.FC = () => {
  const authCtx = useContext(AuthContext)
  const history = useHistory()
  const isLoggedIn = authCtx.isLoggedIn

  const logoutHandler = () => {
    authCtx.logout()
    history.replace('/login')
    // optional: redirect the user
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {authCtx.userRole === 'superadmin' && (
            <li>
              <Link to="/signup">Signup New User</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
