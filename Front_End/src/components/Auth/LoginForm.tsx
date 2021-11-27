import React, { useState, useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import Button from 'react-bootstrap/Button'
import classes from './AuthForm.module.css'
import { useHistory } from 'react-router-dom'
import MsgModal from '../UI/MsgModal'
import { useAlert } from 'react-alert'

interface Imsg {
  title: string
  message: string
}

const LoginForm: React.FC = () => {
  
  const history = useHistory()
  const [error, setError] = useState<Imsg | null>(null)
  const [success, setSuccess] = useState<Imsg | null>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const authCtx = useContext(AuthContext)
  const alert = useAlert()
  
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current!.value
    const enteredPassword = passwordInputRef.current!.value

    // optional: Add validation
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
    
    authCtx.login('3454gfdv', 3245, 'akash', 'superadmin')
  
    alert.show('Welcome on board !! You are successfully logged in',{type:'success'}) 
    
  }

  const errorHandler = () => {
    setError(null)
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
    
    <section className={classes.auth}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email"  ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            
            ref={passwordInputRef}
          />
        </div>
        <Button type="submit" variant="danger">
            Login
          </Button>
      </form>
    </section>
    </React.Fragment>
  )
}

export default LoginForm
