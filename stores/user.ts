import axios from "axios";
import {defineStore} from 'pinia';
import persistedState from "pinia-plugin-persistedstate";

export const useUserStore = defineStore('user', () => {
    const user = ref<{} | null>(null)

    const setUser = (userData: {}) => {
        user.value = userData;
    }

    const logout = () => {
        user.value = null;
    }

    const updateUser = async () => {
        const productStore = useProductStore()

        const { data } = await axios.get(`/api/users/${user.value._id}`)
        user.value = data.user

        await productStore.requestAllProducts()
        await productStore.calculateCartTotal()
    }

    const syncCartWithServer = async () => {
        if (!user.value?._id) return;

        try {
            const normalizedCart = user.value.cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))

            await axios.post(`/api/users/${user.value._id}/cart.sync`, {
                id: user.value._id,
                cart: normalizedCart
            });

            console.log('Cart synced successfully', normalizedCart);
        } catch (error) {
            console.error('Cart sync failed:', error);
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
        syncCartWithServer
    }
    }, {
    persist: true
})

