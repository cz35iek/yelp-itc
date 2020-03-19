import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import React from 'react'
import { BusinessDetails } from '../../Stores/BusinessStore'

export const Details = (business: BusinessDetails) => (
  <List dense disablePadding subheader={<Typography align='left'>Description</Typography>}>
    <ListItem>
      <ListItemText primary='rating' secondary={<Rating defaultValue={business?.rating} readOnly precision={0.5} size='medium'></Rating>} />
    </ListItem>
    {business?.price && (
      <ListItem>
        <ListItemText primary='price' secondary={business?.price} />
      </ListItem>
    )}
    {business?.display_phone && (
      <ListItem>
        <ListItemText primary='phone' secondary={business?.display_phone} />
      </ListItem>
    )}
    <ListItem>
      <ListItemText primary='address' secondary={business?.location.display_address.join(', ')} />
    </ListItem>
    <ListItem>
      <ListItemText
        primary='categories'
        secondary={business?.categories
          .map(c => {
            return c.title
          })
          .join(', ')}
      />
    </ListItem>
  </List>
)
