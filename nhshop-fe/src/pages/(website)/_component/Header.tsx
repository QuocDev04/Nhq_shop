import {  Drawer,Popover } from "antd";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const ListMenu = [
        {name:"Shop All", url:"/shop"},
    ]
      const [open, setOpen] = useState(false);

      const showDrawer = () => {
          setOpen(true);
      };

      const onClose = () => {
          setOpen(false);
      };
    const account = (
        <div>
            <Link to={"/login"}>
                <div>Đăng nhập</div>
            </Link>
            <Link to={"/register"}>
                <div>Đăng ký</div>
            </Link>
        </div>
    );
    const user = (
        <div>
            <Link to={"/information"}>
                <div>Thông tin</div>
            </Link>
            <Link to={"/logout"}>
                <div>Đăng xuất</div>
            </Link>
        </div>
    );
    const userName = localStorage.getItem("name");
    return (
        <>
            {/* <!-- top header --> */}
            <div className="bg-[#05422c] px-4 flex justify-center items-center text-white shadow-lg">
                <span className="text-center text-sm opacity-75">
                    LIMITED OFFER: 30% OFF. Use RABBIT30 at Checkout.
                </span>
                <span className="m-3">23 : 15 : 00</span>
            </div>
            {/* <!-- logo, search and cart --> */}
            <div className="w-full flex justify-center items-center border-b">
                <div className="container lg:mr-7 lg:ml-7 flex justify-between items-center">
                    {/* <!-- icon menu --> */}
                    <div className="lg:hidden mb:block ">
                        <p onClick={showDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-menu"
                            >
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                        </p>
                        <Drawer
                            title="Menu"
                            placement="left"
                            closable={false}
                            onClose={onClose}
                            open={open}
                            width={240}
                        >
                            <div className="h-full  overflow-y-auto">
                                <ul className="font-medium">
                                    <li>
                                        <NavLink
                                            to={"/"}
                                            className="flex items-center p-2 text-black rounded-lg hover:bg-gray-200 hover:text-green-600 "
                                        >
                                            <span>Trang Chủ</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={"/"}
                                            className="flex items-center p-2 text-black rounded-lg hover:bg-gray-200 hover:text-green-600 "
                                        >
                                            <span>Trang Chủ</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Drawer>
                    </div>
                    <div className="">
                        <Link
                            to={""}
                            className=" text-teal-600 flex justify-center items-center"
                        >
                            <div>
                                <img
                                    src="../../images/logo.png"
                                    alt=""
                                    className="w-44"
                                />
                            </div>
                        </Link>
                    </div>
                    <div>
                        <form className=" hidden lg:block none">
                            <div className="w-[456px] h-[48px] justify-between flex">
                                <input
                                    type="text"
                                    className="border rounded-full w-[400px] pl-3"
                                    placeholder="Search"
                                />
                                <button className="rounded-[50%] bg-[#17af26] w-[48px]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="size-6 text-white mx-auto"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-between">
                        {/* Hiển thị tên người dùng */}
                        {userName ? (
                            <Popover
                                content={user}
                                trigger="click"
                                className="cursor-pointer mr-4"
                            >
                                {userName && <p>Welcome, {userName}!</p>}
                            </Popover>
                        ) : (
                            <Popover
                                content={account}
                                trigger="click"
                                className="cursor-pointer"
                            >
                                <div>You account&emsp;|&emsp;</div>
                            </Popover>
                        )}
                        <button className="">
                            <Link to={"/cart"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6 w-[24px]"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- menu --> */}
            <div className="hidden lg:block">
                <div className="w-full flex justify-center items-center *:flex *:justify-center">
                    <div className="gap-x-[49.5px] h-[56px] items-center">
                        {ListMenu.map((menu) => (
                            <Link to={menu.url}>{menu.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <form className="lg:hidden mt-3">
                    <div className="w-[630px] h-[48px] justify-center flex">
                        <input
                            type="text"
                            className="border rounded-full w-[300px] pl-3"
                            placeholder="Search"
                        />
                        <button className="rounded-[50%] bg-[#17af26] w-[48px] ml-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6 text-white mx-auto"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Header;
