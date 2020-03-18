import React from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { SearchPage } from '../Search/SearchPage'
import { Switch, Route } from 'react-router-dom'
import { DetailsPage } from '../Details/DetailsPage'
import { Container, Backdrop, CircularProgress } from '@material-ui/core'
import { businessStore } from '../../Stores/BusinessStore'
import { observer } from 'mobx-react-lite'
import { reviewsStore } from '../../Stores/ReviewsStore'

export const App = observer(() => {
  return (
    <div className='App'>
      {/* <Header
          style={{
            background:
              '#d32323 url(https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c146b0884f6a/assets/img/structural/header_stars.png) no-repeat center',
          }}
        >
          <div
            style={{
              backgroundImage:
                'url(https://s3-media1.fl.yelpcdn.com/assets/srv0/yelp_design_web/48792dd29811/assets/img/logos_desktop/default.png)',
              backgroundSize: '80px 40px',
              width: '80px',
              height: '50px',
              backgroundRepeat: 'no-repeat',
              marginTop: '8px',
            }}
          ></div>
        </Header> */}
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>News</Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
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
        <Backdrop open={businessStore.isLoading || reviewsStore.isLoading}>
          <CircularProgress />
        </Backdrop>
      </Container>
    </div>
  )
})
