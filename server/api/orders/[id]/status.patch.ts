export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const { status } = await readBody(event)

    if (!id || !status) {
        throw createError({ statusCode: 400, message: 'Missing ID or status' })
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    )

    if (!updatedOrder) {
        throw createError({ statusCode: 404, message: 'Order not found' })
    }

    return { success: true, id, status }
})
