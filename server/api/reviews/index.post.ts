export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const review = await Review.create(body)

    return review.toObject()
})