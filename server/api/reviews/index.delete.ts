export default defineEventHandler(async (event) => {
    const { _id } = await readBody(event)
    const review = await Review.findByIdAndDelete(_id)

    if (review) {
        return { message: 'Review deleted successfully' };
    } else {
        return { message: 'Review not found' };
    }
})