import { Router } from "express";
import { delFavouriteByUserId, getFavouriteByUserId, postFavouriteByUserId } from "../controllers/favourite";





const router = Router()
router.get("/favourite/:userId", getFavouriteByUserId)
router.post("/favourite/add-to-favourite", postFavouriteByUserId)
router.post("/favourite/remove",delFavouriteByUserId);
export default router