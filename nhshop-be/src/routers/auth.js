import express from "express";
import { getAllUser, logout,  register, signin } from "../controllers/auth";
const router = express.Router();
router.get('/user',getAllUser)
router.post("/signup", register);
router.post("/signin", signin);
// router.post("/refresh-token",refreshToken);
router.post("/logout", logout);
export default router;
