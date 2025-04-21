import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
    const showLoginModal = ref(false)
    const showAdminModal = ref(false)
    const instanceCreated = ref(null)
    const isClicked = ref(false)

    const isAddOrEdit = ref(null)

    return {
        showLoginModal,
        showAdminModal,
        instanceCreated,
        isClicked,
        isAddOrEdit
    }
})

