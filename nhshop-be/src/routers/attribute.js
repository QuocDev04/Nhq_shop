import { Router } from "express";
import {
  CreateAttrubite,
  createValueAttribute,
  delAttru,
  delValue,
  GetAll,
  GetAllValues,
  GetId,
  getIdValue,
  putAttru,
  putValue,
} from "../controllers/attribute";

const router = Router();
//ATTRiBuTE
router.post("/attributes", CreateAttrubite);

router.get("/attributes", GetAll);

router.get("/attributes/:id", GetId);

router.put("/attributes/:id", putAttru);

router.delete("/attributes/:id", delAttru);

//VALUES
router.post("/value/:attributesId", createValueAttribute);

router.get("/values", GetAllValues);

router.get("/value/:id", getIdValue);

router.put("/values/:id", putValue);

router.delete("/values/:id", delValue);

export default router;
