import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync.utils.js";
import User from "../models/user.model.js";
import responseHelper from "../helpers/response.helper.js";
import tokenHelper from "../service/token.service.js";
import emailHelper from "../helpers/emailHelper.js";


let authController = {};
authController.signup = catchAsync(
  async (req, res, next) => {
    try {
      let { email, fullname, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return responseHelper.sendResponse(res, 400, "User already exists!", null);
      }

      let salt = await bcrypt.genSalt(10, "a");
      let hashedPass = await bcrypt.hash(password, salt);
      let token = await tokenHelper.generateToken({ message: "Email Verification Token" });

      user = await User.create({
        fullname,
        email,
        password: hashedPass,
        isVerified: false,
        token: token,
        tokenExpiryDate: new Date(new Date().getTime() + 12 * 60 * 60 * 1000)
      });

      let htmlTemplate = emailHelper.generateHTMLTemplate({
        user: fullname,
        verificationLink: (process.env.ENVIRONMENT === "LOCAL" ? "http://localhost:5173" : process.env.FRONTEND_HOST) + "/verifyEmail/" + token,
        companyName: process.env.COMPANY_NAME
      }, "USER_EMAIL_VERIFICATION_TEMPLATE");

      emailHelper.sendEmail(email, "Account Verification", "", htmlTemplate);

      user.password = null;
      user.token = null;
      return responseHelper.sendResponse(res, 200, "Signup Success. Please verify your account from email before Login.", {
        email, fullname
      });

    } catch (err) {
      console.log(err);
      return responseHelper.sendResponse(res, 500, "Internal Server Error !", null);
    }
  }
);

authController.login = catchAsync(
  async (req, res, next) => {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user)
        return responseHelper.sendResponse(res, 400, "User not found with provided email.", null);

      if (!user.isVerified) {
        console.log(user.tokenExpiryDate, Date.now());
        if (!user.token || (user.tokenExpiryDate < Date.now())) {
          let token = await tokenHelper.generateToken({ message: "Email Verification" });
          await User.findOneAndUpdate({ _id: user._id }, { token, tokenExpiryDate: new Date(new Date().getTime() + 12 * 60 * 60 * 1000) });
          let htmlTemplate = emailHelper.generateHTMLTemplate({
            user: user.fullname,
            verificationLink: (process.env.ENVIRONMENT === "LOCAL" ? "http://localhost:5173" : process.env.FRONTEND_HOST) + "/verifyEmail/" + token,
            companyName: process.env.COMPANY_NAME
          }, "USER_EMAIL_VERIFICATION_TEMPLATE");

          emailHelper.sendEmail(user.email, "Account Verification", "", htmlTemplate);
        }
        return responseHelper.sendResponse(res, 400, "Verification email sent! Please check your email and verify your account.", null);
      }

      let isValidPass = await bcrypt.compare(password, user.password);

      if (!isValidPass)
        return responseHelper.sendResponse(res, 400, "Invalid Password", null);

      let tokenExpiryDate = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);

      let token = await tokenHelper.generateToken({
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        tokenExpiryDate
      });

      await User.findOneAndUpdate({ _id: user._id }, { token, tokenExpiryDate });

      return responseHelper.sendResponse(res, 200, "Login Success !", {
        token,
        email: user.email,
        fullname: user.fullname,
        tokenExpiryDate
      });
    }
    catch (err) {
      console.log(err);
      return responseHelper.sendResponse(res, 400, "Internal Server Error !", null);
    }
  }
);

authController.verifyEmailByToken = catchAsync(
  async (req, res, next) => {
    try {
      let token = req.query.verify_token;
      let user = await User.findOne({ token });

      console.log(user);

      if (!user)
        return responseHelper.sendResponse(res, 400, "Invalid Token!", null);

      if (user.tokenExpiryDate < Date.now()) {
        await User.findOneAndUpdate({ _id: user._id }, { token: null, tokenExpiryDate: null });
        return responseHelper.sendResponse(res, 400, "Token has expired. Please Login to generate new token", null);
      }

      user = await User.findOneAndUpdate({ _id: user._id }, { isVerified: true, token: null, tokenExpiryDate: null });

      return responseHelper.sendResponse(res, 200, "User verified successfully!", null);

    } catch (err) {
      console.log(err);
      return responseHelper.sendResponse(res, 500, "Internal Server Error !", null);
    }
  })

authController.forgotPassword = catchAsync(
  async (req, res, next) => {
    try {
      let email = req.body.email;
      let user = await User.findOne({ email });

      if (!user)
        return responseHelper.sendResponse(res, 200, "Reset Password link will be sent if user with provided email exists!", null);

      let token = await tokenHelper.generateToken({ message: "Forgot Password Token !" });
      let tokenExpiryDate = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);

      await User.findOneAndUpdate({ _id: user._id }, { token, tokenExpiryDate });

      let htmlTemplate = emailHelper.generateHTMLTemplate({
        user: user.fullname,
        passwordResetLink: (process.env.ENVIRONMENT === "LOCAL" ? "http://localhost:5173" : process.env.FRONTEND_HOST) + "/resetPassword/" + token,
        companyName: process.env.COMPANY_NAME
      }, "USER_FORGOT_PASSWORD_TEMPLATE");

      emailHelper.sendEmail(email, "Reset Password", "", htmlTemplate);

      return responseHelper.sendResponse(res, 200, "Reset Password link will be sent if user with provided email exists!");
    } catch (err) {
      console.log(err);
      return responseHelper.sendResponse(res, 500, "Internal Server Error !", null);
    }
  })

authController.resetPassword = catchAsync(
  async (req, res, next) => {
    try {
      let token = req.query.verify_token;
      let password = req.body.password;
      let user = await User.findOne({ token });

      if (!user)
        return responseHelper.sendResponse(res, 400, "Password Reset Unsuccessful. Invalid Token!", null);

      if (user.tokenExpiryDate < Date.now()) {
        await User.findOneAndUpdate({ _id: user._id }, { token: null, tokenExpiryDate: null });
        return responseHelper.sendResponse(res, 400, "Token has expired. Please try again.", null);
      }

      let salt = await bcrypt.genSalt(10, "a");
      let hashedPass = await bcrypt.hash(password, salt);

      user = await User.findOneAndUpdate({ _id: user._id }, { password: hashedPass, token: null, tokenExpiryDate: null });

      return responseHelper.sendResponse(res, 200, "Password Reset successfull", null);

    } catch (err) {
      console.log(err);
      return responseHelper.sendResponse(res, 500, "Internal Server Error !", null);
    }
  })

export default authController;