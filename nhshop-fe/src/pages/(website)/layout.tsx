import Header from "@/pages/(website)/_component/Header";
import { Outlet } from "react-router-dom";
import Footer from "./_component/Footer";

const LayoutWebsite = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default LayoutWebsite;
