export default defineEventHandler(async (event) => {
    const { _id } = await readBody(event)
    const product = await Product.findByIdAndDelete(_id)

    if (product) {
        return { message: 'Product deleted successfully' };
    } else {
        return { message: 'Product not found' };
    }
})