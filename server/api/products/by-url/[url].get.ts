export default defineEventHandler(async (event) => {
    const url = event.context.params?.url;

    if (!url) {
        throw createError({statusCode: 400, statusMessage: 'URL is required'});
    }

    const product = await Product.findOne({url}).populate('category');

    if (!product) {
        throw createError({statusCode: 404, statusMessage: 'Product not found'});
    }

    return product
})