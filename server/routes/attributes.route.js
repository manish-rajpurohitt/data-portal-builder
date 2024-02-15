import authMiddleware from "../middlewares/validateUser.middleware.js";
import express from "express";
const                                                                                                       router = express.Router();
import attributeController from "../controllers/attributes.controller.js";


router.route("/").get(authMiddleware.validateToken, attributeController.getAllAttributes);
router.route("/:id").get(authMiddleware.validateToken, attributeController.getAttributeDetails);
router.route("/").post(authMiddleware.validateToken, attributeController.createAttribute);
router.route("/:id").put(authMiddleware.validateToken, attributeController.updateAttribute);
router.route("/:id").delete(authMiddleware.validateToken, attributeController.deleteAttribute);

export default router;
