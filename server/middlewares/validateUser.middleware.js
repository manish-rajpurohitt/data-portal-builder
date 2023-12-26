import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import responseHelper from "../helpers/response.helper.js";

let authMiddleware = {};

authMiddleware.validateToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  const tokenParts = token.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized - Invalid token format' });
  }

  const accessToken = tokenParts[1];

  let userDetails = await User.findOne({token: accessToken});
  
  if(!userDetails)
    return responseHelper.sendResponse(res, 401,'Unauthorized - Invalid token', null);


  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return responseHelper.sendResponse(res, 401,'Unauthorized - Invalid token', null);
    }
    req.user = decoded;

    if(req.user.tokenExpiryDate > Date.now())
      return responseHelper.sendResponse(res, 401,'Token expired. Please Re-Login.', null);

    next();
  });
};

export default authMiddleware;