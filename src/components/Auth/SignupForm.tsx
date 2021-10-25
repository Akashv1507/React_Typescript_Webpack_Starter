import React, { useState, useRef, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import AuthContext from '../../store/auth-context'
import classes from './AuthForm.module.css'
import { useHistory } from 'react-router-dom'
import MsgModal from '../UI/MsgModal'

interface Imsg {
  title: string
  message: string
}
const SignupForm: React.FC = () => {
  const history = useHistory()
  const [error, setError] = useState<Imsg | null>(null)
  const [success, setSuccess] = useState<Imsg | null>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const confirmPassInputRef = useRef<HTMLInputElement>(null)
  const roleRef = useRef<HTMLSelectElement>(null)
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current!.value
    const enteredPassword = passwordInputRef.current!.value
    const enteredName = nameInputRef.current!.value
    const confirmPassword = confirmPassInputRef.current!.value
    const enteredRole = roleRef.current!.value

    if (enteredName.trim().length === 0) {
      setError({
        title: 'Invalid Name',
        message: 'Please enter a valid Name (> 0)',
      })
      return
    }
    if (enteredName.trim().length < 4) {
      setError({
        title: 'Invalid Name',
        message: 'Name length should be greater than or equal to 4.',
      })
      return
    }
    if (
      !enteredEmail.trim().includes('@') ||
      !enteredEmail.trim().includes('.')
    ) {
      setError({
        title: 'Invalid Email',
        message: 'Email must contain @ and dot(.).',
      })
      return
    }
    if (enteredPassword.trim().length < 6) {
      setError({
        title: 'Password Error',
        message: 'Entered password should be atleast 6 character long.',
      })
      return
    }
    if (enteredPassword != confirmPassword) {
      setError({
        title: 'Password mismatch',
        message: 'Entered password does not matches with confirm password.',
      })
      return
    }

    // optional: Add validation- make api call to check email exist or not

    //after validation check make api call to push user submitted data
    setSuccess({
      title: 'Success',
      message: 'New User Registration Successfull.',
    })
  }

  const errorHandler = () => {
    setError(null)
  }
  const successHandler = () => {
    setSuccess(null)
    history.replace('/login')
  }
  return (
    <React.Fragment>
      {/* to hold error of this page */}
      {error && (
        <MsgModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {/* to hold success registration message */}
      {success && (
        <MsgModal
          title={success.title}
          message={success.message}
          onConfirm={successHandler}
        />
      )}
      <section className={classes.auth}>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="role">Role Name</label>
            <select ref={roleRef}>
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" ref={passwordInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPassInputRef}
            />
          </div>
          <Button type="submit" variant="danger">
            Signup
          </Button>
        </form>
      </section>
    </React.Fragment>
  )
}

export default SignupForm
