export interface Subcategory {
    _id: string
    title: string
    url: string
}

export interface Category {
    _id: string
    title: string
    url: string
    parentCategory?: string
    subcategories?: Subcategory[]
}

export interface CatalogItem {
    _id: string
    title: string
    url: string
    categories?: Category[]
}