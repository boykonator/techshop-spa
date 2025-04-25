export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const { productId } = await readBody(event)

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $addToSet: { cart: productId } },
            { new: true }
        )

        if (updatedUser) {
            return { message: 'Product added to cart', user: updatedUser }
        } else {
            return { message: 'User not found', _id: id }
        }
    } catch (error) {
        return {
            message: 'Error updating cart',
            error: error.message
        }
    }
})