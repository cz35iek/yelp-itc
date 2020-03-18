import { observable, runInAction } from 'mobx'

export type Business = {
  id: string
  name: string
  image_url: string
  price: string
  display_phone: string
  rating: number
  review_count: number
}

class BusinessStore {
  @observable isLoading: boolean = false

  getBusiness = async (query: string) => {
    runInAction(() => {
      this.isLoading = true
    })
    const response = await (await fetch(`https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/search?term=${query}`)).json()
    runInAction(() => {
      this.isLoading = false
    })

    return response.body.businesses as Business[]
  }
}

export const businessStore = new BusinessStore()
