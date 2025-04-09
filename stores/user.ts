import {defineStore} from 'pinia';
import persistedState from "pinia-plugin-persistedstate";

export const useUserStore = defineStore('user', () => {
    const user = ref<{} | null>(null)

    const setUser = (userData: {}) => {
        user.value = userData;
    };

    const logout = () => {
        user.value = null;
    };

    const isAuthenticated = computed(() => !!user.value);

    const showLoginModal = ref(false)

    return {
        user,
        isAuthenticated,
        setUser,
        logout,
        showLoginModal
    }
    }, {
    persist: true
})

