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
    }
})

export const Category = model("Category", CategorySchema)