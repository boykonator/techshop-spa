export default defineEventHandler(async () => {
    const mainCategories = await Category.find({ parentCategory: null });
    console.log(mainCategories);

    const subcategories = await Category.find({ parentCategory: household._id });
    console.log(subcategories);

    const categories = await Category.find()

    return categories
})