import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Comment, Avatar } from 'antd'
import { Review } from '../../Stores/ReviewsStore'
import { rootStore } from '../../Stores/Stores'

export const Reviews = () => {
  const id = useRouteMatch<{ id: string }>('/business/:id')?.params.id

  useEffect(() => {
    ;(async () => {
      setReviews(await rootStore.reviewsStore.getReviews(id!))
    })()
  }, [id])

  const [reviews, setReviews] = useState<Review[]>([])

  return (
    <>
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
  )
}
