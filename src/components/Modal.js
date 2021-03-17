import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

import { useDispatch } from 'react-redux'
import { ADD } from '../redux/types'

export const Modal = ({ open, setOpen }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [form, setForm] = React.useState({})
  const dispatch = useDispatch()

  // закрытие окна диалога
  const handleClose = () => {
    setOpen(false)
    setForm({})
  }

  // изменение формы
  const handleChange = (e) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }))
  }

  // отправка записи формы в редакс
  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(form).length > 0) {
      dispatch({ type: ADD, payload: form })
    }
    setOpen(false)
    setForm({})
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='form'
      >
        <DialogTitle id='form'>{'Форма ввода нового пользователя'}</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off'>
            <TextField
              autoFocus
              margin='dense'
              name='name'
              label='Name'
              fullWidth
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin='dense'
              name='email'
              label='Email'
              type='email'
              fullWidth
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Отмена
          </Button>
          <Button onClick={handleSubmit} color='primary' autoFocus>
            ОК
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
