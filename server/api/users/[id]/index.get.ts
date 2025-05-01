export default defineEventHandler(async (event) => {
    const { id } = event.context.params;

    try {
        const user = await User.findById(id).lean()

        if (!user) {
            return { status: 404, message: 'User not found' };
        }

        return { status: 200, user };
    } catch (error) {
        return { status: 500, message: 'Server error', error };
    }
});
