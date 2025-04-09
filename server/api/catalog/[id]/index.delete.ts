export default defineEventHandler(async (event) => {
    const { id } = event.context.params;
    const category = await Category.findByIdAndDelete(id)

    if (category) {
        return { message: 'Category deleted successfully' };
    } else {
        return { message: 'Category not found', _id: id };
    }
})