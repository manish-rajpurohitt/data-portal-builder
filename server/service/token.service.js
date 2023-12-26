import jwt from "jsonwebtoken"

let tokenHelper = {};

tokenHelper.generateToken = async (payload) => {
    return await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});
}


export default tokenHelper;