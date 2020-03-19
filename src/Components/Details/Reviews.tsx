import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Review } from '../../Stores/ReviewsStore'
import { rootStore } from '../../Stores/Stores'
import { observer } from 'mobx-react-lite'
import Avatar from '@material-ui/core/Avatar'
import { Typography, Card, CardHeader, CardContent, Grid } from '@material-ui/core'
import styled from 'styled-components'

const StyledGrid = styled(Grid)`
  flex-grow: 1;
  margin-top: 10px;
`
export const Reviews = observer(() => {
  const id = useRouteMatch<{ id: string }>('/business/:id')?.params.id!
  const { reviewsStore } = rootStore

  useEffect(() => {
    ;(async () => {
      setReviews(await reviewsStore.getReviews(id))
    })()
  }, [id, reviewsStore])

  const [reviews, setReviews] = useState<Review[]>([])

  return (
    <StyledGrid container spacing={2}>
      {reviews.map(r => {
        return (
          <Grid item key={r.id}>
            <Card style={{ maxWidth: 345 }}>
              <CardHeader avatar={<Avatar src={r.user.image_url} alt={r.user.name} />} title={r.user.name} subheader={r.time_created} />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {r.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </StyledGrid>
  )
})
