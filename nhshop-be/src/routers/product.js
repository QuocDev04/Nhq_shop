import express from "express";


import {
  create,
  delProduct,
  getAllProduct,
  getIdProduct,
  putProduct,
} from "../controllers/product";
// import { checkAuth } from "../middleware/checkAuth";
const router = express.Router();
// router.use(checkAuth);
router.get("/product",getAllProduct);
router.get("/product/:id", getIdProduct);
router.post("/product", create);
router.put("/product/:id", putProduct);
router.delete("/product/:id", delProduct);
export default router;
