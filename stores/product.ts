import {defineStore} from 'pinia'
import axios from "axios"
import type {IProduct} from "~/types/catalog"
import { useUserStore } from '~/stores/user'
import { useStateStore } from '~/stores/state'

export const useProductStore = defineStore('product', () => {
    const product = ref<IProduct | null>(null)
    const products = ref<IProduct[]>([])

    const requestProduct = async () => {
        const route = useRoute()
        const {data} = await axios.get(`/api/products/by-url/${route.params.url}`);

        product.value = data
        console.log('data: ', product.value)
    }

    const requestAllProducts = async () => {
        const {data} = await axios.get(`/api/products/`)
        products.value = data
    }

    const updateList = async (type: 'wishlist' | 'cart', add: boolean, product: IProduct = null) => {
        const state = useStateStore()
        const userStore = useUserStore()
        const user = userStore.user
        const productId = product?._id

        if (type === 'cart') {
            if (!user) {
                state.showLoginModal = true
            } else {
                navigateTo('/cart')
            }
            return
        }

        if (!user) {
            const index = userStore.tempWishlist.indexOf(productId)

            if (add && index === -1) {
                userStore.tempWishlist.push(productId)
            } else if (!add && index !== -1) {
                userStore.tempWishlist.splice(index, 1)
            }
            return
        }

        try {
            const method = add ? 'post' : 'delete'
            const url = `/api/users/${user._id}/${type}`

            const { data } = await axios({ method, url, data: { productId } })
            userStore.user = data.user
        } catch (err) {
            console.error(`Error updating ${type}:`, err)
        }
    }

    return {
        product,
        products,
        requestProduct,
        requestAllProducts,
        updateList
    }
})