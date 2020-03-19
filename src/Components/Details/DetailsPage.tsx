import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { Details } from './Details'
import { Reviews } from './Reviews'
import { Gallery } from './Gallery'
import { BusinessDetails } from '../../Stores/BusinessStore'
import { rootStore } from '../../Stores/Stores'

export const DetailsPage = () => {
  const id = useRouteMatch<{ id: string }>('/business/:id')?.params.id
  const [business, setBusiness] = useState<BusinessDetails>()
  const { businessStore } = rootStore

  useEffect(() => {
    ;(async () => {
      setBusiness(await businessStore.getBusinessDetails(id!))
    })()
  }, [businessStore, id])

  return (
    <>
      <Typography variant='h4' style={{ marginTop: 10 }} align='left' gutterBottom>
        {business?.name}
      </Typography>
      <Gallery {...business!} />
      {!rootStore.isLoading && business && <Details {...business} />}
      <Reviews />
    </>
  )
}
