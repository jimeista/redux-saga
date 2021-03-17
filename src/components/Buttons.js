import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import { Modal } from './Modal'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export const Buttons = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false) //состояние окна диалога
  const { enqueueSnackbar } = useSnackbar() // оповещение

  const dispatch = useDispatch()

  // запрос на graphql
  const handleShow = () => {
    dispatch({ type: 'FETCH_REQUEST' })
    const message = 'TEST GRAPHQL'
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      TransitionComponent: Slide,
    })
  }

  return (
    <div className={classes.root}>
      <Fab
        size='small'
        color='primary'
        aria-label='add'
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Button variant='outlined' color='secondary' onClick={handleShow}>
        SHOW
      </Button>
      <Modal open={open} setOpen={setOpen} />
    </div>
  )
}
