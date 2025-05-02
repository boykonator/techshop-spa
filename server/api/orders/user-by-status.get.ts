export default defineEventHandler(async () => {
    const orders = await Order.find().populate('user').populate('items.product')

    const grouped = {
        pending: [],
        shipped: [],
        delivered: []
    }

    for (const order of orders) {
        if (grouped[order.status]) {
            grouped[order.status].push(order)
        }
    }

    return grouped
})