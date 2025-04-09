export default defineEventHandler(async () => {
    try {
        const catalog = await Category.find({ parentCategory: null })
        return { success: true, data: catalog }
    } catch (error) {
        return { success: false, error }
    }
})