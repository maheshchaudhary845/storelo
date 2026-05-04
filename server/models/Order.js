import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                image: {
                    type: String,
                    required: false
                }
            }
        ],
        shippingAddress: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            pincode: {
                type: String,
                required: true
            }
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending"
        },
        paymentId: {
            type: String,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: ["processing", "shipped", "delivered", "cancelled"],
            default: "processing"
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Order", orderSchema);