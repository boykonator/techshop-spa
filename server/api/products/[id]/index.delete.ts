export default defineEventHandler(async (event) => {
    const { id } = event.context.params;
    const product = await Product.findByIdAndDelete(id)

    console.log(product, id)

    if (product) {
        return { message: 'Product deleted successfully' };
    } else {
        return { message: `Product not found: ${id}` };
    }
})