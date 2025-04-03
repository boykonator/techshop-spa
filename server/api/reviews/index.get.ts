export default defineEventHandler(async () => {
    const reviews = await Review.find()

    return reviews
})