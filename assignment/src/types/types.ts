type ResponseCode = 'OK' | 'ERROR'
type BannerData = {
    imageSrc: string
    url: string
}
export type CommonResponse = {
    result: ResponseCode
}

export type BannerResponse = CommonResponse & {
    data?: BannerData
}


export type Product = {
    productId: string
    name: string
    price: number
    discount: number
    imageSrc: string
}

export type TimeDealResponse = CommonResponse & {
    data: {
        items: Array<Product>
        dealEnded: string
    }
}

export type RecommendedResponse = CommonResponse & {
    data: {
        productList: Array<Product>
    }
}