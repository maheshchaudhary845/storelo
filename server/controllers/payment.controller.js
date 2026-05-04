import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createRazorpayOrder = async (req, res) => {
    const { totalPrice } = req.body;

    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const order = await razorpay.orders.create({
            amount: Math.round(Number(totalPrice) * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        })

        if (!order) {
            return res.status(400).json({
                message: "Error on creating an order"
            })
        }
        res.json({
            success: true,
            data: order,
            message: "Order created successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shippingAddress, cartItems } = req.body;

    try {
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex")

        if(expectedSignature !== razorpay_signature){
            return res.status(400).json({
                message: "Invalid payment signature"
            })
        }

        const orderItems = cartItems.map(item =>({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images?.[0] || "no-image"
        }))

        const order = await Order.create({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentStatus: "paid",
            paymentId: razorpay_payment_id,
            totalPrice: cartItems.reduce((total, item)=> total + item.product.price * item.quantity, 0),
        })

        if(!order){
            return res.status(400).json({
                message: "Error in verifying or creating order to db"
            })
        }

        const cart = await Cart.findOneAndUpdate(
            {user: req.user._id},
            {items: []}
        );
        if(!cart){
            return res.status(404).json({
                message: "No cart item found"
            })
        }

        res.json({
            success: true,
            data: order,
            message: "Payment verified and order placed!"
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}