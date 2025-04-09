import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const newCategory = new Category({
            title: body.title,
            parentCategory: body.parentCategory ? new mongoose.Types.ObjectId(body.parentCategory) : null,
            url: body.url,
        })
        await newCategory.save()
        return { success: true, data: newCategory }
    } catch (error) {
        console.error('[Category creation error]:', error)
        return { success: false, error: error.message || 'Unknown error' }
    }
})