import { Fragment } from 'react'

import MainNavigation from './MainNavigation'
import classes from './Layout.module.css'
const Layout: React.FC = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout