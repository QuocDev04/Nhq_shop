const Banner = () => {
    return (
        <div className="w-full bg-gradient-to-r from-[#386957] to-[#134d38]">
            <div className="">
                <div className="relative mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:flex lg:items-center lg:px-8">
                    <div className="max-w-xl  ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-lg font-extrabold sm:text-lg text-yellow-500">
                            Let us find your
                        </h1>
                        <strong className="block font-extrabold text-white text-5xl">
                            {" "}
                            Forever Home.{" "}
                        </strong>
                        <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white text-xl">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Nesciunt illo tenetur fuga ducimus numquam ea!
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4 text-center">
                            <a
                                href="#"
                                className="block w-full rounded-xl bg-green-600 px-20 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
