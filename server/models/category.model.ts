import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null
    }
})

export const Category = model("Category", CategorySchema)