import React, { useState, useEffect, ChangeEvent } from 'react'
import { Empty, Spin } from 'antd'
// import Meta from 'antd/lib/card/Meta'
import { useHistory, useLocation } from 'react-router-dom'
import {
  Card,
  TextField,
  InputAdornment,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import SearchIcon from '@material-ui/icons/Search'

type Business = {
  id: string
  name: string
  image_url: string
  price: string
  phone: string
  rating: number
  review_count: number
}

const useQuery = () => new URLSearchParams(useLocation().search)

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export const SearchPage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const query = useQuery().get('query')
  const [inputValue, setInputValue] = useState<string>(query!)
  const history = useHistory()
  const classes = useStyles()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const response = await (await fetch(`https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/search?term=${query}`)).json()
      setBusinesses(response.body.businesses as Business[])
      setLoading(false)
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
          fullWidth: true,
        }}
        style={{ marginTop: 20 }}
      />
      <Spin spinning={loading}>
        {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}> */}
        {businesses.map((b: Business) => (
          // <Card
          //   key={b.id}
          //   style={{ margin: 10, width: 300 }}
          //   cover={<img alt='example' src={b.image_url} />}
          //   onClick={e => history.push(`/business/${b.id}`)}
          //   hoverable
          // >
          //   <Meta title={b.name} description={`price: ${b.price} phone: ${b.phone}`} />
          //   <Rate disabled allowHalf defaultValue={b.rating}></Rate>
          // </Card>
          <Card className={classes.root} key={b.id}>
            <CardActionArea onClick={e => history.push(`/business/${b.id}`)}>
              <CardMedia className={classes.media} image={b.image_url} title={b.name} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {b.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  price: {b.price}
                  phone: {b.phone}
                </Typography>
                <Rating defaultValue={b.rating} precision={0.1} readOnly></Rating>
                {b.review_count > 0 && (
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {b.review_count} {b.review_count === 1 ? 'review' : 'reviews'}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary'>
                Share
              </Button>
              <Button size='small' color='primary'>
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
        {businesses.length === 0 && !loading && <Empty />}
        {/* </div> */}
      </Spin>
    </>
  )
}
