import {Schema, model} from "mongoose"

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    url: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    brand: {
        type: String,
    },
    images: [{
        type: String
    }],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

export const Product = model('Product', ProductSchema)