import { Router } from "express";
import { delId, getAllComment, getIdComment, postComment, putComment } from "../controllers/comment";

const router = Router();

router.post("/comment", postComment);
router.get("/comment", getAllComment);
router.get("/comment/:productId", getIdComment);
router.put("/comment/:id", putComment);
router.delete("/comment/:id", delId);

export default router;
