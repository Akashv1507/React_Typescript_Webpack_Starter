import { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import classes from './ProfileForm.module.css'

const ProfileForm = () => {
  // can be used for changing password/username etc
  const history = useHistory()
  const newPasswordInputRef = useRef()
  const authCtx = useContext(AuthContext)
}

export default ProfileForm
