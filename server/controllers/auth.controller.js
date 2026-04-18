import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id)=>{
    const token = jwt.sign(
        {userId: id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )

    return token;
}

export const register = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        const encryptPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: encryptPassword
        })

        if(!user){
            return res.json({
                message: "Something went wrong"
            })
        }

        res.json({
            success: true,
            message: "User created successfully!"
        })

    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const login = async (req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "Invalid email!"
            })
        }

        const validPassword = await user.comparePassword(password);
        if(!validPassword){
            return res.status(401).json({
                message: "Invalid password!"
            })
        }

        const token = generateToken(user._id);
        res.json({
            success: true,
            token,
            message: "Logged in"
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}