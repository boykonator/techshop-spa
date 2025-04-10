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