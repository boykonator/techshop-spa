import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const _id = query._id

    if (!query) {
        const products = await Product.find()

        return products
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return { error: 'Invalid category ID: ' + _id }
    }

    const products = await Product.find({ category: _id })
    return products
})