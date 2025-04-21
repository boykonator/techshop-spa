export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const body = await readBody(event)

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            body,
            { new: true }
        )

        if (updatedProduct) {
            return { message: 'Product updated successfully', product: updatedProduct }
        } else {
            return { message: 'Product not found', _id: id }
        }
    } catch (error) {
        return {
            message: 'Error updating product',
            error: error.message
        }
    }
})