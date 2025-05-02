import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
    const showLoginModal = ref(false)
    const showAdminModal = ref(false)
    const instanceCreated = ref<boolean | null>(null)
    const isClicked = ref(false)

    const isAddOrEdit = ref<'add' | 'edit' | null>(null)

    const deleteIndex = ref<string | null>(null)
    const editIndex = ref<string | null>(null)

    const productsMap = ref(new Map<string, any>())

    const setProducts = (products: any[]) => {
        productsMap.value = new Map(products.map(p => [p._id, p]))
    }

    const userStore = useUserStore()

    const cartTotalPrice = computed(() => {
        return userStore.user?.cart?.reduce((sum, item) => {
            const product = productsMap.value.get(item.productId)
            return sum + (product ? product.price * item.quantity : 0)
        }, 0) || 0
    })

    const cartTotalPriceBeforeDiscounts = computed(() => {
        return userStore.user?.cart?.reduce((sum, item) => {
            const product = productsMap.value.get(item.productId)
            const randomDiscount = 10000
            return sum + (product ? (product.price + randomDiscount) * item.quantity : 0)
        }, 0) || 0
    })

    const openModal = (type: 'add' | 'edit' | 'delete', index: string | null = null) => {
        showAdminModal.value = true
        isAddOrEdit.value = type === 'edit' ? 'edit' : type === 'add' ? 'add' : null
        editIndex.value = type === 'edit' ? index : null
        deleteIndex.value = type === 'delete' ? index : null
    }

    const toggleLoginModal = () => {
        showLoginModal.value = !showLoginModal.value
    }

    return {
        showLoginModal,
        showAdminModal,
        instanceCreated,
        isClicked,
        isAddOrEdit,
        deleteIndex,
        editIndex,
        cartTotalPrice,
        cartTotalPriceBeforeDiscounts,
        productsMap,
        openModal,
        toggleLoginModal,
        setProducts
    }
})

