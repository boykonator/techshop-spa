export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body;

    try {
        const existingUser = await User.findOne({ email })
        const validUserData = await User.findOne({ email, password })

        if (existingUser && !validUserData) {
            return { status: 400, message: "User exists, bad password" };
        }

        return { status: 200, message: "Logging in...", user: validUserData };
    } catch (error) {
        return { status: 500, message: "Server error", error };
    }
});