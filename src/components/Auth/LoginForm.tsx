import React, { useState, useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import classes from './AuthForm.module.css'
import { useHistory } from 'react-router-dom'

const LoginForm: React.FC = () => {
  const history = useHistory()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const authCtx = useContext(AuthContext)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current!.value
    const enteredPassword = passwordInputRef.current!.value

    // optional: Add validation

    authCtx.login('3454gfdv', 3245, 'akash', 'admin')
    history.replace('/')
  }

  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <button type="button">Login</button>
      </form>
    </section>
  )
}

export default LoginForm
