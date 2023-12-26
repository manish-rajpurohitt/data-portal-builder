import express from "express";
import authRouter from "./auth.route.js";

const router = express.Router();

const routesMapping = [
  { path: "/auth", route: authRouter },
];

routesMapping.forEach((rm) => {
  if (rm.path) router.use(rm.path, rm.route);
  else router.use(rm.route);
});

export default router;