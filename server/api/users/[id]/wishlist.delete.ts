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
            { $pull: { wishlist: productId } },
            { new: true }
        )

        if (!user) {
            return { statusCode: 404, message: 'User not found' }
        }

        return {
            message: 'Product removed from wishlist successfully',
            user
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Error removing from wishlist',
            error: error.message
        }
    }
})
