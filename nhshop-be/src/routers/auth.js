import express from "express";
import { delIdUser, getAllUser, getIdUser, logout,  postIdUser,  putIdUser,  register, signin } from "../controllers/auth";
const router = express.Router();
router.get('/user',getAllUser)
router.get('/user/:id',getIdUser)
router.post("/user", postIdUser);
router.put("/user/:id", putIdUser);
router.delete("/user/:id", delIdUser);
router.post("/signup", register);
router.post("/signin", signin);
// router.post("/refresh-token",refreshToken);
router.post("/logout", logout);
export default router;
