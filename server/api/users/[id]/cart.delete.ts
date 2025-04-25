export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const { productId } = await readBody(event)

    if (!productId) {
        return {
            statusCode: 400,
            body: { message: 'Product ID is required' }
        }
    }

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { $pull: { cart: productId } },
            { new: true }
        )

        if (!user) {
            return { statusCode: 404, message: 'User not found' }
        }

        return {
            message: 'Product removed from cart successfully',
            user
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Error removing from cart',
            error: error.message
        }
    }
})
