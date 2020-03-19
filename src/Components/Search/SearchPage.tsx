import React, { useState, useEffect, ChangeEvent } from 'react'
import { Empty } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { Card, TextField, InputAdornment, makeStyles, CardActionArea, CardMedia, CardContent, Typography, Grid } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import SearchIcon from '@material-ui/icons/Search'
import { Business } from '../../Stores/BusinessStore'
import { rootStore } from '../../Stores/Stores'
import { observer } from 'mobx-react-lite'

const useQuery = () => new URLSearchParams(useLocation().search)

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export const SearchPage = observer(() => {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const query = useQuery().get('query')
  const [inputValue, setInputValue] = useState<string>(query!)
  const history = useHistory()
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      setBusinesses(await rootStore.businessStore.searchBusinesses(query!))
    })()
  }, [query])

  return (
    <>
      <TextField
        id='standard-basic'
        label='input search query'
        onBlur={e => history.push(`/?query=${inputValue}`)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)}
        onKeyPress={ev => {
          if (ev.key === 'Enter') {
            history.push(`/?query=${inputValue}`)
          }
        }}
        value={inputValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Grid container className={classes.root} spacing={2}>
        {businesses.map((b: Business) => (
          <Grid item key={b.id}>
            <Card className={classes.card}>
              <CardActionArea onClick={() => history.push(`/business/${b.id}`)}>
                <CardMedia className={classes.media} image={b.image_url || '/logo192.png'} title={b.name} />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {b.name}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {b.price && `price:${b.price} `}
                    {b.display_phone && `phone:${b.display_phone}`}
                  </Typography>
                  <Rating defaultValue={b.rating} precision={0.5} readOnly></Rating>
                  {b.review_count > 0 && (
                    <Typography variant='body2' color='textSecondary' component='p'>
                      {b.review_count} {b.review_count === 1 ? 'review' : 'reviews'}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {businesses.length === 0 && !rootStore.isLoading && <Empty />}
      </Grid>
    </>
  )
})
