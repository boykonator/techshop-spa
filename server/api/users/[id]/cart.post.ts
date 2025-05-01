import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const { product } = await readBody(event)

    try {
        const user = await User.findById(id)

        if (!user) {
            return { message: 'User not found', _id: id }
        }

        const productIdStr = product._id.toString()

        const existingItemIndex = user.cart.findIndex(
            item => item.productId.toString() === productIdStr
        )

        if (existingItemIndex !== -1) {
            user.cart[existingItemIndex].count += product.count || 1
        } else {
            user.cart.push({
                productId: new mongoose.Types.ObjectId(product._id),
                count: product.count || 1
            })
        }

        await user.save()

        return {
            message: 'Cart updated',
            user
        }
    } catch (error) {
        return {
            message: 'Error updating cart',
            error: error.message
        }
    }
})