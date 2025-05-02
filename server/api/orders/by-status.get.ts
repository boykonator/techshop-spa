export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const status = query.status

    if (!["pending", "shipped", "delivered"].includes(status)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid status provided"
        })
    }

    const orders = await Order.find({ status }).populate('items.product')

    return orders
})
