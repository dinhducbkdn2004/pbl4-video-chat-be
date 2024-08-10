import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: {
        type: String,
        default: null,
    },
    otpExp: {
        type: Date,
        default: null,
    },
    userId: { type: String, required: true },
    isVerified: {
        type: Boolean,
        default: false,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const Account = mongoose.model("Account", accountSchema, "accounts");
export default Account;
