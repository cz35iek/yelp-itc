import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Backdrop, CircularProgress, Typography } from '@material-ui/core'
import { Details } from './Details'
import { Reviews } from './Reviews'
import { Gallery } from './Gallery'

export type BusinessDetails = {
  id: string
  name: string
  image_url: string
  price: string
  display_phone: string
  rating: number
  photos: string[]
  location: { display_address: string[] }
  categories: { title: string }[]
}

type Review = {
  id: string
  rating: number
  text: string
  time_created: Date
  user: {
    id: string
    image_url: string
    name: string
  }
}

export const DetailsPage = () => {
  const id = useRouteMatch<{ id: string }>('/business/:id')?.params.id
  const [business, setBusiness] = useState<BusinessDetails>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      const businessResponse = await (await fetch(`https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/${id}`)).json()
      setBusiness(businessResponse.body)
      setLoading(false)
    })()
  }, [id])

  return (
    <>
      <Typography variant='h4' style={{ marginTop: 10 }} align='left' gutterBottom>
        {business?.name}
      </Typography>
      <Gallery {...business!} />
      {!loading && <Details {...business!} />}
      <Reviews />
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}
