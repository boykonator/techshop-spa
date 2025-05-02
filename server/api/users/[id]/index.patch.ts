export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id
        if (!id) {
            throw createError({ statusCode: 400, statusMessage: 'User ID is required' })
        }

        const body = await readBody(event)

        const updatedUser = await User.findByIdAndUpdate(id, body, {
            new: true,
        })

        if (!updatedUser) {
            throw createError({ statusCode: 404, statusMessage: 'User not found' })
        }

        return updatedUser
    } catch (err: any) {
        console.error('PATCH /api/users/[id] error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            statusMessage: err.statusMessage || 'Internal Server Error',
        })
    }
})
