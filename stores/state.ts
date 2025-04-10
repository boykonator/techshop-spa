import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
    const showLoginModal = ref(false)
    const showDeleteModal = ref(false)

    return {
        showLoginModal,
        showDeleteModal
    }
})

