import {defineStore} from 'pinia'
import axios from "axios"
import type {IProduct} from "~/types/catalog"

export const useProductStore = defineStore('product', () => {
    const product = ref<IProduct | null>(null)
    const products = ref<IProduct[]>([])

    const requestProduct = async () => {
        const route = useRoute()
        const {data} = await axios.get(`/api/products/${route.params.url}`)

        product.value = data
        console.log('data: ', product.value)
    }

    const requestAllProducts = async () => {
        const {data} = await axios.get(`/api/products/`)

        products.value = data
        console.log('data: ', products.value)
    }

    return {
        product,
        products,
        requestProduct,
        requestAllProducts
    }
})