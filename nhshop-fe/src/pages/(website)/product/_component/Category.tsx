const   Category = () => {
    return (
        <div>
            <section className="flex flex-col pt-[47px] pb-6">
                <span className="text-[#717378] text-xs tracking-[1px]">
                    PRODUCT CATEGORY
                </span>
                <fieldset>
                    <legend className="sr-only">Checkboxes</legend>

                    <div className="divide-y divide-gray-200">
                        <label
                            htmlFor="Option1"
                            className="flex  items-start gap-4 py-4"
                        >
                            <div className="flex items-center">
                                &#8203;
                                <input
                                    type="checkbox"
                                    className="size-4 rounded border-gray-300"
                                />
                            </div>

                            <div>
                                <strong className="font-medium text-gray-900">
                                    {" "}
                                    John Clapton{" "}
                                </strong>

                                <p className="mt-1 text-pretty text-sm text-gray-700">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                        </label>

                        <label
                            htmlFor="Option2"
                            className="flex cursor-pointer items-start gap-4 py-4"
                        >
                            <div className="flex items-center">
                                &#8203;
                                <input
                                    type="checkbox"
                                    className="size-4 rounded border-gray-300"
                                    id="Option2"
                                />
                            </div>

                            <div>
                                <strong className="font-medium text-gray-900">
                                    {" "}
                                    Peter Mayer{" "}
                                </strong>

                                <p className="mt-1 text-pretty text-sm text-gray-700">
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Architecto!
                                </p>
                            </div>
                        </label>

                        <label
                            htmlFor="Option3"
                            className="flex cursor-pointer items-start gap-4 py-4"
                        >
                            <div className="flex items-center">
                                &#8203;
                                <input
                                    type="checkbox"
                                    className="size-4 rounded border-gray-300"
                                    id="Option3"
                                />
                            </div>

                            <div>
                                <strong className="font-medium text-gray-900">
                                    {" "}
                                    Eric King{" "}
                                </strong>

                                <p className="mt-1 text-pretty text-sm text-gray-700">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Deleniti, mollitia.
                                </p>
                            </div>
                        </label>
                    </div>
                </fieldset>
            </section>
        </div>
    );
}
 
export default Category;