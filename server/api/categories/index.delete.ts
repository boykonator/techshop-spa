export default defineEventHandler(async (event) => {
    const { _id } = await readBody(event)
    const category = await Category.findByIdAndDelete(_id)

    if (category) {
        return { message: 'Category deleted successfully' };
    } else {
        return { message: 'Category not found' };
    }
})