interface IUnsplashResult {
  id: string
  urls: {
    full: string
  }
  user: {
    name: string
    location: string
  }
}

export interface UnSplashResponse {
  results: IUnsplashResult[]
}

export interface IImage {
  id: string
  author: string
  location: string
  imageUrl: string
}
