
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import routerAuth from "./routers/auth";
import routerProduct from "./routers/product";
import routerCategory from "./routers/category";
import cartRouter from "./routers/cart";
import favouriteRouter from "./routers/favourite";
import orderRouter from "./routers/order"
import commentRouter from "./routers/comment";
import attrubitetRouter from "./routers/attribute";

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/", routerAuth);
//monggo
async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log(`Kết Nối Thành Công`);
  } catch (error) {
    console.log(`Kết Nối Thất Bại`);
  }
}
connectDB(`mongodb://localhost:27017/Shop_Top_Shelf`);
//router
app.use("/api/", routerProduct);
app.use("/api/",routerCategory)
app.use("/api/", cartRouter);
app.use("/api/", favouriteRouter);
app.use("/api/", orderRouter);
app.use("/api/", commentRouter);
app.use("/api/", attrubitetRouter);
export const viteNodeApp = app;