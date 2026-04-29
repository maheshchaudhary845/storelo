import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
    try {
        const { _id } = req.user;
        const cart = await Cart.findOne({ user: _id }).populate("items.product", "name price images slug");

        if (!cart) {
            return res.status(404).json({
                message: "No cart found."
            })
        }

        res.json({
            success: true,
            data: cart.items,
            message: "Cart fetched successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            const existingItem = cart.items.find(item => item.product.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
            await cart.save();
        } else {
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, quantity }]
            });
        }

        await cart.populate("items.product", "name price images slug");
        res.json({ 
            success: true,
            data: cart.items,
            message: "Cart updated successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updateCartItem = async (req, res)=>{
    try{
        const {productId} = req.params;
        const {quantity} = req.body;
        
        const cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            return res.status(404).json({
                message: "Cart not found."
            })
        }
        const item = cart.items.find(item => item.product.toString() === productId);
        if(!item){
            return res.status(404).json({
                message: "Item not found in cart."
            })
        }
        item.quantity = quantity;
        await cart.save();

        await cart.populate("items.product", "name price images slug");

        res.json({
            success: true,
            data: cart.items,
            message: "Cart item updated successfully"
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const removeCartItem = async(req, res)=>{
    try{
        const {productId} = req.params;

        const cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            return res.status(404).json({
                message: "Cart not found."
            })
        }
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        await cart.populate("items.product", "name price images slug");

        res.json({
            success: true,
            data: cart.items,
            message: "Item removed successfully"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const clearCart = async(req, res)=>{
    try{
        const cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            return res.status(404).json({
                message: "Cart not found."
            })
        }
        cart.items = [];
        await cart.save();

        res.json({
            success: true,
            message: "Cart cleared successfully"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}