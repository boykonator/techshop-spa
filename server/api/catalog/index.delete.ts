export default defineEventHandler(async (event) => {
    const { _id } = await readBody(event); // Get the ID from the request body
    const category = await Category.findByIdAndDelete(_id); // Delete the category by its ID

    if (category) {
        return { message: 'Category deleted successfully' };
    } else {
        return { message: 'Category not found' };
    }
})