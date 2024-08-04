
const CheckOutPages = () => {
    return (
        <div className="mb-52">
            <div className="w-full lg:py-7 mb:py-[18px] bg-[#F4F4F4] grid place-items-center -mt-[1px]">
                <div className="flex -translate-x-[1px] items-center gap-x-4 text-sm">
                    <div className="flex items-center gap-x-2">
                        <div className="w-[30px] h-[30px] p-2 text-white bg-[#C3D2CC] rounded-[50%] flex place-items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke=" #05422C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-check"
                            >
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>
                        <span className="hidden lg:block">Shopping Cart</span>
                    </div>
                    <div className="lg:w-[74.5px] mb:min-w-[39.5px] h-[1px] bg-[#05422C]" />
                    <div className="flex items-center gap-x-2">
                        <div className="w-[30px] h-[30px] p-2 text-white bg-[#05422C] invert rounded-[50%] flex place-items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke=" #ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-credit-card"
                            >
                                <rect
                                    width={20}
                                    height={14}
                                    x={2}
                                    y={5}
                                    rx={2}
                                />
                                <line x1={2} x2={22} y1={10} y2={10} />
                            </svg>
                        </div>
                        <span>Checkout</span>
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

        
                {/* main (shipping) */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                    <div className="rounded-lg mx-6">
                        <section className="flex justify-between border-b lg:pb-6 pb-6">
                            <strong className="font-medium text-xl text-[#060709] tracking-[-0.3px]">
                                Shipping
                            </strong>
                        </section>
                        {/* form */}
                        <div className="lg:mt-[33px] mt-[22px] w-full flex flex-col lg:gap-y-[23px] gap-y-[18px]">
                            {/* name */}
                            <div className="lg:flex lg:items-center grid grid-cols-[47%_47%] gap-x-5 *:w-full">
                                <div className="flex flex-col gap-y-2">
                                    <label
                                        htmlFor="first_name"
                                        className="text-xs uppercase tracking-[0.9px] text-[#46494F]"
                                    >
                                        Tên *
                                    </label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        className="border h-12 rounded-xl px-4 text-sm"
                                    />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <label
                                        htmlFor="last_name"
                                        className="text-xs uppercase tracking-[0.9px] text-[#46494F]"
                                    >
                                        Họ *
                                    </label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        className="border h-12 rounded-xl px-4 text-sm"
                                    />
                                </div>
                            </div>
                            {/* country, region : country */}
                            <div className="flex flex-col gap-y-2">
                                <label
                                    htmlFor="country"
                                    className="uppercase text-xs tracking-[0.9px] text-[#46494F]"
                                >
                                    Quốc Gia / Khu vực *
                                </label>
                                <select
                                    name="country"
                                    id="country"
                                    className="border h-12 rounded-xl px-3 text-sm"
                                >
                                    <option value="singapore">Singapore</option>
                                </select>
                            </div>
                            {/* town city - province - post code */}
                            <div className="flex lg:flex-row flex-col gap-y-[18px] items-center *:w-full gap-x-5">
                                {/* town */}
                                <div className="flex flex-col gap-y-2">
                                    <label
                                        htmlFor="town"
                                        className="uppercase text-xs tracking-[0.9px] text-[#46494F]"
                                    >
                                        Thành phố *
                                    </label>
                                    <input
                                        type="text"
                                        className="h-12 border rounded-xl px-4 text-sm"
                                    />
                                </div>
                                {/* province */}
                                <div className="flex flex-col gap-y-2">
                                    <label
                                        htmlFor="province"
                                        className="text-[#46494F] tracking-[0.9px] text-xs uppercase"
                                    >
                                        Huyện *
                                    </label>
                                    <input
                                        type="text"
                                        className="h-12 rounded-xl border px-2 text-sm"
                                    />
                                </div>
                                {/* post code */}
                                <div className="flex flex-col gap-y-2">
                                    <label
                                        htmlFor="post_code"
                                        className="text-[#46494F] uppercase text-xs tracking-[0.9px]"
                                    >
                                        mã bưu điện (Nếu có)*
                                    </label>
                                    <input
                                        type="text"
                                        className="h-12 rounded-xl border px-2 text-sm"
                                        placeholder="Nếu có"
                                    />
                                </div>
                            </div>
                            {/* country , region : address */}
                            <div className="flex flex-col gap-y-2 *:rounded-xl">
                                <span className="text-xs uppercase text-[#46494F] tracking-[0.9px]">
                                    Địa chỉ *
                                </span>
                                <input
                                    type="text"
                                    className="h-12 border px-4 text-sm"
                                    placeholder="Số nhà và tên đường"
                                />
                                <input
                                    type="text"
                                    className="h-12 border px-4 text-sm"
                                    placeholder="Căn hộ, phòng, đơn vị, v.v."
                                />
                            </div>
                            {/* phone */}
                            <div className="lg:flex items-center grid grid-cols-[47%_47%] gap-x-5 *:w-full border-b pb-4 lg:-mt-0.5">
                                {/* phone */}
                                <div className="flex flex-col gap-y-2">
                                    <label
                                        htmlFor="phone"
                                        className="uppercase text-[#46494F] text-xs tracking-[0.9px]"
                                    >
                                        số điện thoại
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        className="h-12 rounded-xl border px-4 text-sm"
                                    />
                                </div>
                                {/* email */}
                                <div className="flex flex-col gap-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-xs uppercase text-[#46494F] tracking-[0.9px]"
                                    >
                                        email *
                                    </label>
                                    <input
                                        id="email"
                                        type="text"
                                        className="h-12 border rounded-xl px-4 text-sm"
                                        placeholder="johndoe@example.com"
                                    />
                                </div>
                            </div>
                            {/* note order */}
                            <div className="flex flex-col gap-y-2 border-b lg:pb-8 pb-5 lg:mt-0 mt-1">
                                <label
                                    htmlFor="note_order"
                                    className="text-xs uppercase text-[#46494F] tracking-[0.9px]"
                                >
                                    ghi chú đơn hàng(tùy chọn)
                                </label>
                                <textarea
                                    name="note-order"
                                    id="note_order"
                                    className="h-[98px] px-4 py-3 text-sm border rounded-xl"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg">
                        <div className="border rounded-2xl flex flex-col gap-y-5 lg:p-6 px-5 py-[22px]">
                            <div className="flex flex-col gap-y-[17px] border-b pb-5">
                                <section className="flex justify-between text-sm">
                                    <span className="text-[#9D9EA2]">
                                        Subtotal{" "}
                                    </span>
                                    <p>$497.00</p>
                                </section>
                                <section className="flex justify-between text-sm">
                                    <span className="text-[#9D9EA2]">
                                        Shipping{" "}
                                    </span>
                                    <p>New York, US</p>
                                </section>
                                <section className="flex justify-between text-sm">
                                    <span className="text-[#9D9EA2]">
                                        Discount{" "}
                                    </span>
                                    <p>$0.0</p>
                                </section>
                                <section className="flex justify-between text-sm">
                                    <span className="text-[#9D9EA2]">
                                        Shipping Costs{" "}
                                    </span>
                                    <p>$50.00</p>
                                </section>
                            </div>
                            {/* voucher */}
                            <div className="border-b flex flex-col gap-y-5">
                                <label
                                    htmlFor="email_money"
                                    className="text-sm text-[#9D9EA2]"
                                >
                                    Email Money Transfer
                                </label>
                                <div className="lg:flex items-center grid grid-cols-[50%_45%] justify-between gap-x-3 *:h-12">
                                    <input
                                        type="text "
                                        placeholder="Coupon code"
                                        className="pl-[22px] py-2 rounded-xl border"
                                    />
                                    <button className="text-[#17AF26] font-medium bg-[#F3FBF4] border whitespace-nowrap text-sm rounded-[100px] px-5 py-2">
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                            {/* dieu khoan dich vu */}
                            <div className="w-full grid grid-cols-[22px_auto] gap-x-2.5 my-5">
                                <input
                                    type="checkbox"
                                    className="rounded h-[22px]"
                                />
                                <p className="text-[#717378] text-[14px]">
                                    I confirm that my address is 100% correct
                                    and WILL NOT hold Top Shelf BC liable if
                                    this shipment is sent to an incorrect
                                    address. *
                                </p>
                            </div>
                            <div className="w-full grid grid-cols-[22px_auto] gap-x-2.5 border-b -mt-5 pb-[19px]">
                                <input
                                    type="checkbox"
                                    className="h-[22px] rounded"
                                />
                                <p className="text-[#717378] text-sm">
                                    Sign me up to receive email updates and news
                                    (optional)
                                </p>
                            </div>
                            {/* voucher xu */}
                            <div className="flex items-center justify-between mt-0.5">
                                <span className="flex items-center text-sm gap-x-2">
                                    <img src="../Images/xu_icon.png" alt="xu" />
                                    Your point <p>10.850</p>
                                </span>
                                {/* toggle */}
                                <div className="relative group w-[49px] h-6 rounded-[100px] bg-[#C8C9CB] cursor-pointer hover:bg-[#17AF26] duration-300">
                                    <div className="group-hover:left-[27px] w-5 h-5 bg-white absolute rounded-[50%] left-0.5 top-[2.5px] duration-300"></div>
                                </div>
                            </div>
                            <button className="bg-[#C8C9CB] px-10 h-14 rounded-[100px] text-white flex gap-x-4 place-items-center justify-center">
                                <span>Place Order</span>|<span>$547.00</span>
                            </button>
                            {/* payment */}
                            <div className="flex flex-col gap-y-4">
                                <span className="tracking-[0.8px] text-[#717378] text-xs">
                                    SECURE PAYMENTS PROVIDED BY
                                </span>
                                <div className="flex items-center gap-x-3 *:cursor-pointer">
                                    <img
                                        src="../Images/mastercard_v1.png"
                                        alt=""
                                    />
                                    <img
                                        src="../Images/mastercard_v2.png"
                                        alt=""
                                    />
                                    <img
                                        src="../Images/mastercard_v3.png"
                                        alt=""
                                    />
                                    <img
                                        src="../Images/mastercard_v4.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default CheckOutPages;
