import {defineStore} from 'pinia'
import axios from "axios"
import type {IProduct} from "~/types/catalog"
import {useUserStore} from '~/stores/user'
import {useStateStore} from '~/stores/state'

export const useProductStore = defineStore('product', () => {
    const state = useStateStore()
    const userStore = useUserStore()
    const route = useRoute()

    const product = ref<IProduct | null>(null)
    const products = ref<IProduct[]>([])

    const requestProduct = async () => {

        const {data} = await axios.get(`/api/products/by-url/${route.params.url}`);

        product.value = data
        console.log('data: ', product.value)
    }

    const requestAllProducts = async () => {
        const {data} = await axios.get(`/api/products/`)
        products.value = data
    }

    const updateList = async (type: 'wishlist' | 'cart', add: boolean, product: IProduct = null) => {
        const user = userStore.user
        const productId = product?._id

        if (type === 'cart') {
            if (!user) {
                state.showLoginModal = true
                return
            }

            const productInCart = user.cart?.some(item => item.productId === productId)

            if (add && productInCart) return
            if (productInCart && route.path !== '/cart') {
                navigateTo('/cart')
                return
            }
        }

        if (!user) {
            const index = userStore.tempWishlist.indexOf(productId)
            if (add && index === -1) userStore.tempWishlist.push(productId)
            else if (!add && index !== -1) userStore.tempWishlist.splice(index, 1)
            return
        }

        try {
            state.isClicked = true

            const method = add ? 'post' : 'delete'
            const url = `/api/users/${user._id}/${type}`

            const payload = type === 'cart'
                ? { product: { _id: productId, quantity: 1 } }
                : { productId }

            const { data } = await axios({ method, url, data: payload })

            if (type === 'wishlist') {
                userStore.user.wishlist = data.user.wishlist
            } else if (type === 'cart') {
                userStore.user.cart = data.user.cart
                await calculateCartTotal()

                await userStore.syncCartWithServer('push')
            }

            state.isClicked = false
            state.showAdminModal = false
        } catch (err) {
            console.error(`Error updating ${type}:`, err)
        }
    }

    const calculateCartTotal = async () => {
        const cartItems = userStore.user?.cart || []

        if (!cartItems.length) {
            state.setProducts([])
            return
        }

        try {
            const ids = cartItems.map(item => item.productId).join(',')
            const { data: products } = await axios.get('/api/products', {
                params: { ids }
            })

            state.setProducts(products)

        } catch (error) {
            console.error('Error calculating cart total:', error)
            state.setProducts([])
        }
    }

    const isInWishlist = (productId: string) => {
        return (
            userStore.user?.wishlist?.includes(productId) ||
            userStore.tempWishlist.includes(productId)
        )
    }

    const isInCart = (productId: string) => {
        return userStore.user?.cart?.some(item => item.productId === productId)
    }

    return {
        product,
        products,
        isInWishlist,
        isInCart,
        requestProduct,
        requestAllProducts,
        updateList,
        calculateCartTotal
    }
})