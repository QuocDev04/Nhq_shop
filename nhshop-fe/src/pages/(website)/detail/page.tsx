import { useEffect } from "react";
import RowLeft from "./_component/rowleft/RowLeft";
import DeatilComment from "./_component/rowright/DetailComment";
import DetailRefer from "./_component/rowright/DetailRefer";
import FeaturedProduct from "./_component/rowright/FeaturedProduct";
import MenuDescription from "./_component/rowright/MenuDescription";
import Row1 from "./_component/rowright/row1";
import Row2 from "./_component/rowright/row2";
import Row3 from "./_component/rowright/row3";
import Row4 from "./_component/rowright/row4";
import Row5 from "./_component/rowright/row5";
import TextDescription from "./_component/rowright/TextDescription";

const DetailPage = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <div className="rounded-lg ">
                    <RowLeft />
                </div>
                <div className=" rounded-lg lg:col-span-2">
                    {" "}
                    <div className="h-full w-full *:w-full lg:mt-0 mb:mx-2 mb:mt-[42px]">
                        <div className="flex flex-col lg:gap-y-5">
                            {/* row 1 */}
                            <Row1 />

                            {/* row 2 */}
                            <Row2 />

                            {/* row 3 */}
                            <Row3 />

                            {/* row 4 */}
                            <Row4 />

                            {/* row 5 */}
                            <Row5 />

                            {/* different */}
                            <div className="grid lg:grid-cols-[49%_49%] justify-between lg:gap-y-0 mb:gap-y-4 lg:text-sm mb:text-xs *:flex border-t lg:pt-6 lg:mt-0 mb:pt-[18px] mb:mt-5 mb:grid-cols-full">
                                <span className="lg:gap-x-[84px] gap-x-[78px] font-light text-[#717378]">
                                    SKU{" "}
                                    <p className="font-normal text-[#060709]">
                                        :&nbsp;&nbsp;&nbsp; N/A
                                    </p>
                                </span>
                                <span className="font-light text-[#717378] lg:gap-x-[50px] mb:gap-x-10">
                                    Categories{" "}
                                    <p className="text-[#17AF26] font-normal">
                                        :&nbsp;&nbsp;&nbsp;&nbsp; AAAA Weed,
                                        Indica
                                    </p>
                                </span>
                            </div>
                        </div>
                        {/* description */}
                        <div className="flex flex-col border-t lg:py-10 lg:mt-10 mb:py-[34px] mb:mt-8">
                            {/* menu description */}
                            <MenuDescription />
                            {/* text description */}
                            <TextDescription />
                            {/* detail comment */}
                            <DeatilComment />
                            {/* detail refer a friend */}
                            <DetailRefer />
                        </div>
                    </div>
                </div>
            </div>
            <FeaturedProduct />
        </div>
    );
};

export default DetailPage;
