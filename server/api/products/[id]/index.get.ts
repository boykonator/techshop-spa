export default defineEventHandler(async (event) => {
    const { _id } = await readBody(event)

    return event
})