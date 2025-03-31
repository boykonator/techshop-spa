export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const category = await Category.create(body)

    return category.toObject()
})