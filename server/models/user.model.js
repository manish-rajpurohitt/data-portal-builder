import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        defaultValue: false
    },
    token: String,
    tokenExpiryDate: Date
})

let User = mongoose.model("user", UserSchema);

export default User;