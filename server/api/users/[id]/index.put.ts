export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const body = await readBody(event)

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        )

        if (updatedUser) {
            return { message: 'User updated successfully', user: updatedUser }
        } else {
            return { message: 'User not found', _id: id }
        }
    } catch (error) {
        return {
            message: 'Error updating user',
            error: error.message
        }
    }
})