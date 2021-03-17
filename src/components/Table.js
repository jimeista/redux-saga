import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { useSelector, useDispatch } from 'react-redux'
import { DELETE } from '../redux/types'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    height: 400,
    width: '100%',
  },
  typography: {
    padding: theme.spacing(2),
  },
}))

const CustomTable = () => {
  const state = useSelector((state) => state)

  const [anchorEl, setAnchorEl] = React.useState(null) //эелемент для вслпывающего окна
  const [params, setParams] = React.useState(null) // данные выбранной строки таблицы

  const classes = useStyles()
  const open = Boolean(anchorEl) //состояние окна
  const id = open ? 'simple-popover' : undefined

  const dispatch = useDispatch()

  // клин на кнопку удаления
  const handleClick = (data, e) => {
    setParams(data)
    setAnchorEl(e.currentTarget)
  }

  // колонки таблицы
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center' },
    { field: 'name', headerName: 'Name', width: 250, headerAlign: 'center' },
    { field: 'email', headerName: 'Email', width: 300, headerAlign: 'center' },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      width: 150,
      renderCell: (data) => (
        <>
          <IconButton
            aria-label='delete'
            color='primary'
            onClick={(e) => handleClick(data, e)}
            id={id}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ]

  // подтверждение удаления данных
  const handleOk = () => {
    dispatch({ type: DELETE, payload: params.row.id })
    setAnchorEl(null)
  }

  // отмена действия
  const handleCancel = () => {
    setAnchorEl(null)
    setParams(null)
  }

  return (
    <div className={classes.table}>
      {/* таблица */}
      <DataGrid rows={state.data} columns={columns} pageSize={5} />
      {/*окно подтверждения действия удаления*/}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCancel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          Вы уверены что хотите удалить?
        </Typography>
        <Button onClick={handleOk} color='primary'>
          Да
        </Button>
        <Button onClick={handleCancel} color='primary' autoFocus>
          Нет
        </Button>
      </Popover>
    </div>
  )
}

export default React.memo(CustomTable)
