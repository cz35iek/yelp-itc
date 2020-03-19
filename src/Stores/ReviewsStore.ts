import { runInAction } from 'mobx'
import { Stores } from './Stores'

type GetReviewsResponse = {
  body: {
    reviews: Review[]
  }
}

export type Review = {
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

export class ReviewsStore {
  private stores: Stores
  public constructor(stores: Stores) {
    this.stores = stores
  }
  getReviews = async (id: string) => {
    this.stores.setIsLoading(true)
    try {
      const reviewsResponse = await this.stores.api.get<GetReviewsResponse>(
        `https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/${id}/reviews`
      )
      return reviewsResponse.data.body.reviews
    } catch (err) {
      console.log(err)
      runInAction(() => {
        this.stores.setError(err.toString())
      })
      throw err
    } finally {
      runInAction(() => {
        this.stores.setIsLoading(false)
      })
    }
  }
}
