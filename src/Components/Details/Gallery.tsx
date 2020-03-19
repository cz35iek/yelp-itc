import React from 'react'
import { Grid } from '@material-ui/core'
import { BusinessDetails } from '../../Stores/BusinessStore'
import styled from 'styled-components'

const StyledImage = styled.img`
  max-height: 300px;
  text-align: 'center';
`

export const Gallery = (business: BusinessDetails) => (
  <Grid container spacing={2}>
    {business.photos?.map(p => {
      return (
        <Grid item key={p}>
          <StyledImage alt={business.name} src={p} />
        </Grid>
      )
    })}
  </Grid>
)
