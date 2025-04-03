export default defineEventHandler(async () => {
    const orders = await Order.find()

    return orders
})