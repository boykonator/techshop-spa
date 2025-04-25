import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
    const showLoginModal = ref<boolean>(false)
    const showAdminModal = ref<boolean>(false)
    const instanceCreated = ref<boolean | null>(null)
    const isClicked = ref<boolean>(false)

    const isAddOrEdit = ref<'add' | 'edit' | null>(null)

    const deleteIndex = ref<string | null>(null)
    const editIndex = ref<string | null>(null)

    const openModal = (type: 'add' | 'edit' | 'delete', index: string | null = null) => {
        showAdminModal.value = true
        isAddOrEdit.value = type === 'edit' ? 'edit' : type === 'add' ? 'add' : null

        editIndex.value = type === 'edit' ? index : null
        deleteIndex.value = type === 'delete' ? index : null
    }

    return {
        showLoginModal,
        showAdminModal,
        instanceCreated,
        isClicked,
        isAddOrEdit,
        openModal,
        deleteIndex,
        editIndex
    }
})

