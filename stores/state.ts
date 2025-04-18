import {defineStore} from 'pinia'
import { useRoute } from 'vue-router';

export const useStateStore = defineStore('state', () => {
    const showLoginModal = ref(false)
    const showAdminModal = ref(false)
    const instanceCreated = ref(null)
    const isClicked = ref(false)

    const route = useRoute();
    const isAddOrEdit = computed(() => {
        return route.path.split('/').includes('add') ? 'add' : 'edit'
    })

    return {
        showLoginModal,
        showAdminModal,
        instanceCreated,
        isClicked,
        isAddOrEdit
    }
})

