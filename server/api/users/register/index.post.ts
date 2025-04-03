export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return { status: 400, message: "User already exists" };
        }

        const newUser = new User({ email, password });
        await newUser.save();

        return { status: 201, message: "User created", user: newUser };
    } catch (error) {
        return { status: 500, message: "Server error", error };
    }
});