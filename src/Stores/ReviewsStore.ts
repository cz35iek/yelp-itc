import { observable, runInAction } from 'mobx'

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

class ReviewsStore {
  @observable isLoading: boolean = false

  getReviews = async (id: string) => {
    runInAction(() => {
      this.isLoading = true
    })
    const reviewsResponse = await (await fetch(`https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/${id}/reviews`)).json()
    runInAction(() => {
      this.isLoading = false
    })

    return reviewsResponse.body.reviews as Review[]
  }
}

export const reviewsStore = new ReviewsStore()
