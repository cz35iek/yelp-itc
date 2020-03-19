import React from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import { SearchPage } from '../Search/SearchPage'
import { Switch, Route } from 'react-router-dom'
import { DetailsPage } from '../Details/DetailsPage'
import { Container, Backdrop, CircularProgress, Snackbar } from '@material-ui/core'
import { rootStore } from '../../Stores/Stores'
import { observer } from 'mobx-react-lite'
import Alert from '@material-ui/lab/Alert'
import styled from 'styled-components'

const StyledToolbar = styled(Toolbar)`
  background: #d32323 url(https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c146b0884f6a/assets/img/structural/header_stars.png)
    no-repeat center;
`

const StyledLogo = styled.div`
  background-image: url(https://s3-media1.fl.yelpcdn.com/assets/srv0/yelp_design_web/48792dd29811/assets/img/logos_desktop/default.png);
  background-size: 80px 40px;
  width: 80px;
  height: 50px;
  background-repeat: no-repeat;
  margin-top: 8px;
`

export const App = observer(() => {
  return (
    <div className='App'>
      <AppBar position='static'>
        <StyledToolbar>
          <StyledLogo />
        </StyledToolbar>
      </AppBar>
      <Container maxWidth='xl'>
        <Switch>
          <Route path='/' exact>
            <SearchPage />
          </Route>
          <Route path='/business/:id?'>
            <DetailsPage />
          </Route>
        </Switch>
        <Backdrop open={rootStore.isLoading}>
          <CircularProgress style={{ color: '#d32323' }} />
        </Backdrop>
      </Container>
      <Snackbar open={rootStore.isError} autoHideDuration={6000} onClose={rootStore.clearError}>
        <Alert onClose={rootStore.clearError} severity='error'>
          {rootStore.errorMessage}
        </Alert>
      </Snackbar>
    </div>
  )
})
