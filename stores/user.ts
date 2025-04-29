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

    const isAuthenticated = computed(() => !!user.value)

    const tempWishlist = ref<string[]>([])

    return {
        user,
        isAuthenticated,
        setUser,
        logout,
        tempWishlist
    }
    }, {
    persist: true
})

