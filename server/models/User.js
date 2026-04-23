import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be atleast 8 characters long"]
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
)

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model("User", userSchema);