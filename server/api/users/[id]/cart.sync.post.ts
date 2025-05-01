import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
    const { id, cart } = await readBody(event)

    if (!id || !Array.isArray(cart)) {
        return { statusCode: 400, message: 'Invalid input' }
    }

    try {
        const user = await User.findById(id)
        if (!user) {
            return { statusCode: 404, message: 'User not found' }
        }

        user.cart = cart.map(item => ({
            productId: new mongoose.Types.ObjectId(item.productId),
            quantity: item.quantity
        }))

        await user.save()

        return { message: 'Cart synced successfully', cart: user.cart }
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Server error during cart sync',
            error: error.message
        }
    }
})
