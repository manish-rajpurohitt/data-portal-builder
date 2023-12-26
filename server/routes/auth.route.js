import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/validateUser.middleware.js";
const router = express.Router();


router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/verify_email_by_token").get(authController.verifyEmailByToken);
router.route("/login").post(authController.login);
router.route("/forgot_password").post(authController.forgotPassword);
router.route("/reset_password").post(authController.resetPassword);


export default router;