import { runInAction, action } from 'mobx'

import { Stores } from './Stores'

type BusinessSearchResponse = {
  body: {
    businesses: Business[]
  }
}
type BusinessGetResponse = {
  body: BusinessDetails
}

export type Business = {
  id: string
  name: string
  image_url: string
  price: string
  display_phone: string
  rating: number
  review_count: number
}

export type BusinessDetails = Business & {
  photos: string[]
  location: { display_address: string[] }
  categories: { title: string }[]
}

export class BusinessStore {
  private stores: Stores
  public constructor(stores: Stores) {
    this.stores = stores
  }

  @action searchBusinesses = async (query: string): Promise<Business[]> => {
    this.stores.setIsLoading(true)
    try {
      const searchResponse = await this.stores.api.get<BusinessSearchResponse>(
        `https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/search?term=${query}`
      )
      return searchResponse.data.body.businesses
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

  @action getBusinessDetails = async (id: string): Promise<BusinessDetails> => {
    this.stores.setIsLoading(true)
    try {
      const businessResponse = await this.stores.api.get<BusinessGetResponse>(
        `https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/${id}`
      )
      return businessResponse.data.body
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
