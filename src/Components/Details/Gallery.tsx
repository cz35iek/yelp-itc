import React from 'react'
import { Grid } from '@material-ui/core'
import { BusinessDetails } from '../../Stores/BusinessStore'

export const Gallery = (business: BusinessDetails) => (
  <Grid container spacing={2}>
    {business.photos?.map(p => {
      return (
        <Grid item key={p}>
          <img alt='123' src={p} style={{ maxHeight: 300, textAlign: 'center' }} />
        </Grid>
      )
    })}
  </Grid>
)
