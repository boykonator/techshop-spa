import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        required: false,
        unique: true,
    },
    phone: {
        type: Number,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        zip: Number,
    },
    cart: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "ProductCard",
            },
            quantity: {type: Number, default: 1}
        }
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "ProductCard"
        }
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    registrationDate: {
        type: Date,
        default: Date.now
    }
})

UserSchema.path('email').validate(function (value) {
    return value || this.phone;
}, 'Either email or phone is required.');

UserSchema.path('phone').validate(function (value) {
    return value || this.email;
}, 'Either email or phone is required.');

export const User = model('User', UserSchema)