import ProfileForm from './ProfileForm'
import classes from './UserProfile.module.css'
import AuthContext from '../../store/auth-context'
import { useContext } from 'react'
const UserProfile = () => {
  const authcontext = useContext(AuthContext)
  return (
    <section className={classes.profile}>
      <h1>
        Hi {authcontext.userName} You Are Logged in using {authcontext.userRole}{' '}
        Profile
      </h1>
      {/* <ProfileForm /> */}
    </section>
  )
}

export default UserProfile
