import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { PageHeader, Carousel, Spin, Descriptions, Rate, Comment, Avatar, Typography } from 'antd'

type BusinessDetails = {
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
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const businessResponse = await (await fetch(`https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/${id}`)).json()
      setBusiness(businessResponse.body)

      const reviewsResponse = await (await fetch(`https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/${id}/reviews`)).json()
      setReviews(reviewsResponse.body.reviews)
      setLoading(false)
    })()
  }, [id])

  return (
    <Spin spinning={loading}>
      <PageHeader onBack={() => history.goBack()} title={business?.name} subTitle='This is a subtitle' />
      <Carousel dots={true} autoplay effect='fade'>
        {business?.photos.map(p => {
          return (
            <div key={p}>
              <img alt='123' src={p} style={{ maxHeight: 300, textAlign: 'center' }} />
            </div>
          )
        })}
      </Carousel>
      <Descriptions
        title='Bussiness details'
        layout='vertical'
        bordered
        size='small'
        column={{ xxl: 5, xl: 5, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label='Phone'>{business?.display_phone}</Descriptions.Item>
        <Descriptions.Item label='Address'>{business?.location.display_address.join(', ')}</Descriptions.Item>
        <Descriptions.Item label='Categories'>
          {business?.categories
            .map(c => {
              return c.title
            })
            .join(', ')}
        </Descriptions.Item>
        <Descriptions.Item label='Price'>{business?.price}</Descriptions.Item>
        <Descriptions.Item label='Rating'>
          <Rate disabled value={business?.rating} allowHalf></Rate>
        </Descriptions.Item>
      </Descriptions>
      {reviews && (
        <>
          <Typography.Title level={4} style={{ marginTop: 20 }}>
            Reviews
          </Typography.Title>
          {reviews?.map(r => {
            return (
              <Comment
                author={r.user.name}
                avatar={<Avatar src={r.user.image_url} alt={r.user.name} />}
                content={r.text}
                datetime={r.time_created}
                key={r.id}
              />
            )
          })}
        </>
      )}
    </Spin>
  )
}
