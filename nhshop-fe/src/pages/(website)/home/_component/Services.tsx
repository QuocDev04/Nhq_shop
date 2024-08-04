const Services = () => {
    return (
        <div>
            <section className="bg-white-900">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-20 lg:py-16">
                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-center gap-4 border rounded-xl">
                            <span className="shrink-0 rounded-lg p-4">
                                <img
                                    className=""
                                    src="../Images/truck-fast.png"
                                    alt=""
                                />
                            </span>

                            <div>
                                <h2 className="text-lg font-bold">
                                    Reliable Shipping.
                                </h2>

                                <p className="mt-1 text-md text-gray-500">
                                    Green Society provides Canada Post Xpress
                                    Shipping right to your doorstep! You can
                                    also opt in for shipping insurance. For
                                    orders over $149, shipping is free!
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border rounded-xl">
                            <span className="shrink-0 rounded-lg  p-4">
                                <img
                                    className=""
                                    src="../Images/safe-home.png"
                                    alt=""
                                />
                            </span>

                            <div>
                                <h2 className="text-lg font-bold">
                                    You're Safe With Us
                                </h2>

                                <p className="mt-1 text-md text-gray-500">
                                    Our secure payment system accepts the most
                                    common forms of payments making the checkout
                                    process quicker! The payments we accept are
                                    debit, all major credit cards, and
                                    cryptocurrency.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border rounded-xl">
                            <span className="shrink-0 rounded-lg p-4">
                                <img src="../Images/coin.png" alt="" />
                            </span>

                            <div>
                                <h2 className="text-lg font-bold">
                                    Best Quality & Pricing
                                </h2>

                                <p className="mt-1 text-md text-gray-500">
                                    Here at Green Society, we take pride in the
                                    quality of our products and service. Our
                                    prices are set to ensure you receive your
                                    medication at a reasonable price and safely
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
