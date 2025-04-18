export default defineEventHandler(async (event) => {
    const data = event.context.params
    console.log(data)
    const product = await Product.findByIdAndUpdate(data)

    if (product) {
        return { message: 'Product updated successfully' };
    } else {
        return { message: 'Product not found', _id: data };
    }
})