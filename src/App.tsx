import React from 'react'
import './App.css'
// import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { SearchPage } from './SearchPage'
import { Switch, Route } from 'react-router-dom'
import { DetailsPage } from './DetailsPage'
import { Container, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

function App() {
  // const useStyles = makeStyles(theme => ({
  //   root: {
  //     flexGrow: 1,
  //   },
  //   menuButton: {
  //     marginRight: theme.spacing(2),
  //   },
  //   title: {
  //     flexGrow: 1,
  //   },
  // }))

  const [value, setValue] = React.useState(0)

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
      </Container>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        // className={classes.root}
      >
        <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
        <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
        <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
      </BottomNavigation>
      {/* <Footer>Copyright @{new Date().getFullYear()} by dcode </Footer> */}
    </div>
  )
}

export default App
