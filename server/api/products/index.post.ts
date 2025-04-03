export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const product = await Product.create(body)

    return product.toObject()
})