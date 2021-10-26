import React from 'react'

import classes from './Button.module.css'

interface IProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick: () => void
}

const Button: React.FC<IProps> = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
