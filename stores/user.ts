import axios from "axios"
import {defineStore} from 'pinia'
import type {IUser} from "~/types/catalog"

export const useUserStore = defineStore('user', () => {
    const user = ref<IUser | null>(null)

    const setUser = (userData: IUser) => {
        user.value = userData
    }

    const logout = () => {
        user.value = null
    }

    const updateUser = async () => {
        if (!user.value?._id) return

        const { data } = await axios.get(`/api/users/${user.value._id}`)

        const serverCart = data.user.cart || []
        const localCart = user.value.cart || []

        const finalCart = serverCart.length >= localCart.length ? serverCart : localCart

        user.value = {
            ...user.value,
            ...data.user,
            cart: finalCart
        }

        const productStore = useProductStore()
        await productStore.requestAllProducts()
        await productStore.calculateCartTotal()
    }

    const updateCartQuantity = (productId: string, quantity: number) => {
        const item = user.value?.cart?.find(i => i.productId === productId)
        if (item) {
            item.quantity = quantity
        }
    }

    const syncCartWithServer = async (mode: 'push' | 'pull' = 'pull') => {
        if (!user.value?._id) return

        try {
            if (mode === 'pull') {
                const { data } = await axios.get(`/api/users/${user.value._id}`)
                user.value = {
                    ...user.value,
                    ...data.user,
                    cart: data.user.cart || user.value.cart
                }

                console.log('Cart pulled from server', user.value.cart)
            } else {
                const normalizedCart = user.value.cart.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))

                await axios.post(`/api/users/${user.value._id}/cart.sync`, {
                    id: user.value._id,
                    cart: normalizedCart
                })

                console.log('Cart pushed to server', normalizedCart)
            }
        } catch (error) {
            console.error('Cart sync failed:', error)
        }
    }

    const isAuthenticated = computed(() => !!user.value)

    const tempWishlist = ref<string[]>([])

    return {
        user,
        isAuthenticated,
        tempWishlist,
        setUser,
        logout,
        updateUser,
        updateCartQuantity,
        syncCartWithServer
    }
})
