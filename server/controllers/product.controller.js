import Product from "../models/Product.js";
import slugify from "slugify";

export const getAllProducts = async (req, res)=>{
    try{
        const products = await Product.find();

        if(!products.length){
            return res.json({
                message: "Product list is empty!"
            })
        }

        res.json({
            success: true,
            data: products,
            message: "Products fetched successfully"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const getSingleProduct = async (req, res)=>{
    try{
        const { slug } = req.params;
        const product = await Product.findOne({slug});

        if(!product){
            return res.status(404).json({
                message: "No product found"
            })
        }

        res.json({
            success: true,
            data: product,
            message: "Product fetched successfully"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const createProduct = async (req, res)=>{
    try{
        const name = req.body.name;
        let slug = slugify(name, {
            lower: true,
            trim: true
        })

        let uniSlug = await Product.findOne({slug});
        let count = 1;
        let baseSlug = slug;
        while(uniSlug){
            slug = `${baseSlug}-${count}`;

            uniSlug = await Product.findOne({slug});
            count++;
        }

        const product = await Product.create({
            ...req.body,
            slug
        })

        res.json({
            success: true,
            data: product,
            message: "Product created successfully"
        })
        
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const updateProduct = async(req, res)=>{
    try{
        const {slug} = req.params;
        const product = await Product.findOneAndUpdate(
            {slug},
            req.body,
            {new: true, runValidators: true}
        )

        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        
        res.json({
            success: true,
            data: product,
            message: "Product updated successfully"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const deleteProduct = async (req, res)=>{
    try{
        const {slug} = req.params;
        const product = await Product.findOneAndDelete({slug});
        
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.json({
            success: true,
            data: product,
            message: "Product deleted successfully"
        })
        
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}