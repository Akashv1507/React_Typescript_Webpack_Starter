import React from 'react'
import ReactDOM from 'react-dom'

import Card from './Card'
import Button from './Button'
import classes from './MsgModal.module.css'

//createPortal needs div and jsx element... it moves rendered html content to somewhere else..
//here top of root, irrespective of where modal is used

export interface IMsgModal {
  title: string
  message: string
  onConfirm: () => void
}

const Backdrop: React.FC<{ onConfirm: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />
}
//use of portal
const ModalOverlay: React.FC<IMsgModal> = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  )
}

const MsgModal: React.FC<IMsgModal> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root') as HTMLDivElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root') as HTMLDivElement
      )}
    </React.Fragment>
  )
}

export default MsgModal
