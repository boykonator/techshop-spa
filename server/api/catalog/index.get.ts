export default defineEventHandler(async () => {
    const category = await Category.find()

    return category
})