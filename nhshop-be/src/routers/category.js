import { Router } from "express";
import {
    delCategory,
    getAllCategory,
    getIdCategory,
    postCategory,
    putCategory,
} from "../controllers/category";

const router = Router();
router.get("/category", getAllCategory);
router.get("/category/:id", getIdCategory);
router.delete("/category/:id", delCategory);
router.put("/category/:id", putCategory);
router.post("/category", postCategory);
export default router;
