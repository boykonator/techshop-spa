export default defineEventHandler(async () => {
    try {
        const categories = await Category.find({ parentCategory: { $ne: null } })
        return { success: true, data: categories }
    } catch (error) {
        return { success: false, error: error.message || 'Unknown error' }
    }
})