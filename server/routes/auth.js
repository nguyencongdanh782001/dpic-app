import express from "express";
import { getUser, signin, signup, getAllUser } from "../controllers/auth.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", verifyToken, getUser);
router.get("/getall", getAllUser);
export default router;
