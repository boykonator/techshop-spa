export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const order = await Order.create(body)

    return order.toObject()
})