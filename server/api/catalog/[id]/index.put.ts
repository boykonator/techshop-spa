export default defineEventHandler(async (event) => {
    const { id } = event.context.params;
    const body = await readBody(event);

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );

        if (updatedCategory) {
            return { message: 'Category updated successfully', category: updatedCategory };
        } else {
            return { message: 'Category not found', _id: id };
        }
    } catch (error) {
        return {
            message: 'Error updating category',
            error: error.message
        };
    }
});