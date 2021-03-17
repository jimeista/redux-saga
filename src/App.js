import React from 'react'
import { SnackbarProvider } from 'notistack'
import Slide from '@material-ui/core/Slide'

import { Wrapper } from './components/Wrapper'
import CustomTable from './components/Table'
import { Buttons } from './components/Buttons'

import './App.css'

function App() {
  return (
    // обертка для оповещении на запрос
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      TransitionComponent={Slide}
    >
      <div className='App'>
        <Wrapper>
          <Buttons />
          <CustomTable />
        </Wrapper>
      </div>
    </SnackbarProvider>
  )
}

export default App
