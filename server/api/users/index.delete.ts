export default defineEventHandler(async (event) => {
    const { _id } = await readBody(event)
    const user = await User.findByIdAndDelete(_id)

    if (user) {
        return { message: 'User deleted successfully' };
    } else {
        return { message: 'User not found' };
    }
})