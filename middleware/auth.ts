import {useUserStore} from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUserStore()

    if (!store.user) {
        return navigateTo('/')
    }
})