import Delivery from "./_component/Delivery";
import PayCart from "./_component/PayCart";
import TableCart from "./_component/TableCart";

const CartPage = () => {
    return (
        <div>
            <div className="w-full lg:py-7 bg-[#F4F4F4] grid place-items-center -mt-[1px]">
                <div className="flex -translate-x-[1px] items-center gap-x-4 text-sm">
                    <div className="flex items-center gap-x-2">
                        <img
                            className="w-[30px] h-[30px] p-2 text-white bg-[#05422C] rounded-[50%]"
                            src="../Images/cart_icon.png"
                            alt=""
                        />
                        <span>Shopping Cart</span>
                    </div>
                    <div className="lg:w-[74.5px] mb:min-w-[39.5px] h-[1px] bg-[#C3D2CC]" />
                    <div className="flex items-center gap-x-2">
                        <img
                            className="w-[30px] h-[30px] p-2 text-white bg-white rounded-[50%]"
                            src="../Images/checkout.png"
                            alt=""
                        />
                        <span className="hidden lg:block">Checkout</span>
                    </div>
                    <div className="lg:w-[74.5px] mb:min-w-[39.5px] h-[1px] bg-[#C3D2CC]" />
                    <div className="flex items-center gap-x-2">
                        <img
                            className="w-[30px] h-[30px] p-2 text-white bg-white rounded-[50%]"
                            src="../Images/order.png"
                            alt=""
                        />
                        <span className="hidden lg:block">Order Complete</span>
                    </div>
                </div>
            </div>
            <main className="lg:w-[1170px] mb:w-[342px] lg:mt-8 mb:mt-6 mx-auto grid lg:grid-cols-[686px_420px] mb:grid-cols-[100%] justify-between *:w-full">
                <TableCart/>
                <PayCart/>
                <Delivery/>
            </main>
        </div>
    );
}
export default CartPage;