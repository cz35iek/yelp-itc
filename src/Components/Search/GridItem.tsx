import { Business } from '../../Stores/BusinessStore'
import { Grid, CardActionArea, CardMedia, CardContent, Typography, Card } from '@material-ui/core'
import React from 'react'
import Rating from '@material-ui/lab/Rating'
import styled from 'styled-components'
import PhotoIcon from '@material-ui/icons/Photo'
import { useHistory } from 'react-router-dom'

export const StyledCard = styled(Card)`
  min-height: 282px;
  width: 330px;
  margin: 0 0px 10px 0;
  text-align: center;
`
export const GridItem = (b: Business) => {
  const history = useHistory()
  return (
    <Grid item key={b.id}>
      <StyledCard>
        <CardActionArea onClick={() => history.push(`/business/${b.id}`)}>
          {b.image_url ? (
            <CardMedia image={b.image_url} title={b.name} style={{ height: 140 }} />
          ) : (
            <PhotoIcon style={{ width: '140px', height: '100%' }} />
          )}
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
      </StyledCard>
    </Grid>
  )
}
