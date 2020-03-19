import { BusinessStore } from './BusinessStore'
import { ReviewsStore } from './ReviewsStore'
import axios, { AxiosInstance } from 'axios'
import { observable, action } from 'mobx'

export class Stores {
  @observable isLoading: boolean = false
  @observable isError: boolean = false
  @observable errorMessage: string = ''
  api: AxiosInstance
  businessStore: BusinessStore
  reviewsStore: ReviewsStore

  constructor() {
    this.businessStore = new BusinessStore(this)
    this.reviewsStore = new ReviewsStore(this)
    this.api = axios.create()
  }
  @action setIsLoading = (loading: boolean) => {
    this.isLoading = loading
  }
  @action setError = (msg: string) => {
    this.isError = true
    this.errorMessage = msg
  }

  @action clearError = () => {
    this.isError = false
    this.errorMessage = ''
  }
}

export const rootStore = new Stores()
