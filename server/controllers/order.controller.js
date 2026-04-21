import Order from "../models/Order.js";

export const createOrder = async (req, res)=>{
    try{
        const order = await Order.create({
            user: req.user._id,
            ...req.body
        })

        res.json({
            success: true,
            data: order,
            message: "Order created successfully"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const getMyOrders = async(req, res)=>{
    try{
        const orders = await Order.find({user: req.user._id});
        if(!orders || !orders.length){
            return res.status(404).json({
                message: "No order found"
            })
        }

        res.json({
            success: true,
            data: orders,
            message: "Orders fetched successfully"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const getSingleOrder = async(req, res)=>{
    try{
        const {id} = req.params;
        
        const order = await Order.findById(id).populate("user", "name email").populate("orderItems.product", "name slug");

        if(!order){
            return res.status(404).json({
                message: "No order found"
            })
        }
        res.json({
            success: true,
            data: order,
            message: "Order fetched successfully"
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const getAllOrders = async(req, res)=>{
    try{
        const orders = await Order.find().populate("user", "name email");

        if(!orders || !orders.length){
            return res.status(404).json({
                message: "No order found"
            })
        }

        res.json({
            success: true,
            data: orders,
            message: "Orders fetched successfully"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const updateOrderStatus = async(req, res)=>{
    try{
        const {id} = req.params;
        const {orderStatus} = req.body;
        
        const order = await Order.findByIdAndUpdate(
            id,
            {orderStatus},
            {new: true, runValidators: true}
        );

        if(!order){
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.json({
            success: true,
            data: order,
            message: "Order status updated successfully"
        })
        
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}