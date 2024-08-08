
import LoginPages from "@/pages/(auth)/login/Login";
import RegisterPages from "@/pages/(auth)/register/Register";
import Unauthorized from "@/pages/(auth)/Unauthorized/Unauthorized";
import AddCategory from "@/pages/(dashboard)/category/add/add";
import EditCategory from "@/pages/(dashboard)/category/edit/edit";
import ListCategory from "@/pages/(dashboard)/category/pages";
import Dashboard from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import AddProduct from "@/pages/(dashboard)/product/AddProduct/add";
import EditPage from "@/pages/(dashboard)/product/EditProduct/update";
import ProductAdmin from "@/pages/(dashboard)/product/page";
import CartPage from "@/pages/(website)/cart/page";
import CheckOutPage from "@/pages/(website)/checkout/page";
import DetailPage from "@/pages/(website)/detail/page";
import FavouritePages from "@/pages/(website)/favourite/pages";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import Product from "@/pages/(website)/product/page";

import { Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<Product />} />
                    <Route path="products/:id" element={<DetailPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="order" element={<CheckOutPage />} />
                    <Route path="favourite" element={<FavouritePages />} />
                </Route>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />
                    {/* Products */}
                    <Route path="product" element={<ProductAdmin />} />
                    <Route path="add" element={<AddProduct />} />
                    <Route path=":id/edit" element={<EditPage />} />
                    {/* Category */}
                    <Route path="category" element={<ListCategory />} />
                    <Route path="addCategory" element={<AddCategory />} />
                    <Route path="editCategory/:id" element={<EditCategory />} />
                </Route>
                {/* Đăng nhập và Đăng ký */}
                <Route path="/register" element={<RegisterPages />} />
                <Route path="/login" element={<LoginPages />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </>
    );
};

export default Router;
