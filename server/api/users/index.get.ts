export default defineEventHandler(async () => {
    const users = await User.find()

    return users
})