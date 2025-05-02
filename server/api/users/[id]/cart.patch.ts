export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { cart: body.cart },
        { new: true }
    )

    return {
        success: true,
        user: updatedUser
    }
})
