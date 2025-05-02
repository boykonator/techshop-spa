export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true })

    return updatedProduct
})