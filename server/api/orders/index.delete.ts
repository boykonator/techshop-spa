export default defineEventHandler(async (event) => {
    const { _id } = await readBody(event)
    const order = await Order.findByIdAndDelete(_id)

    if (order) {
        return { message: 'Order deleted successfully' };
    } else {
        return { message: 'Order not found' };
    }
})