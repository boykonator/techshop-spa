export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const body = await readBody(event)
    const productId = body?.product?._id

    if (!productId) {
        return {
            statusCode: 400,
            message: 'Product ID is required to remove from cart'
        }
    }

    try {
        const user = await User.findById(id)

        if (!user) {
            return { statusCode: 404, message: 'User not found' }
        }

        user.cart = user.cart.filter(
            item => item.productId.toString() !== productId
        )

        await user.save()

        return {
            message: 'Product removed from cart successfully',
            user
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Error removing product from cart',
            error: error.message
        }
    }
})