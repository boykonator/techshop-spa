export interface ISubcategory {
    _id: string
    title: string
    url: string
    parentCategory: string
}

export interface ICategory {
    _id: string
    title: string
    url: string
    parentCategory?: string
    subcategories?: ISubcategory[]
}

export interface ICatalogItem {
    _id: string
    title: string
    url: string
    parentCategory: null
    categories?: ICategory[]
}

export interface IProduct {
    title: string
    description: string
    price: number
    category: string
    url: string
    stock: number
    brand: string
    images?: string[]
    reviews?: IReview[]
}

export interface IUser {
    email: string
    phone: string
    password: string
    name?: string
    address?: IAddress
    cart?: IProduct[]
    wishlist?: IProduct[]
    orders?: IOrder[]
    registrationDate: Date
}

export interface IReview {
    user: IUser
    product: IProduct
    rating: number
    comment: string
    createdAt: Date
}

export interface IAddress {
    city: string
    street: string
    house: string
    apartment?: string
}

export interface IOrder {
    user: IUser
    items: IProduct[]
    totalPrice: number
    status: string
    createdAt: Date
}