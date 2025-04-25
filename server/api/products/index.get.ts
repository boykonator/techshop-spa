import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (query.ids) {
        const idsArray = (query.ids as string).split(',').filter(id => mongoose.Types.ObjectId.isValid(id))
        const products = await Product.find({ _id: { $in: idsArray } })
        return products
    }

    if (query._id) {
        const categoryId = query._id
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return { error: 'Invalid category ID: ' + categoryId }
        }
        const products = await Product.find({ category: categoryId })
        return products
    }

    const products = await Product.find()
    return products
})
