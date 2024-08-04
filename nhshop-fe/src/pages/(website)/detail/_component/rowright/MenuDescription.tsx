const MenuDescription = () => {
    return (
        <div>
            <ul className="flex items-center justify-between border-b lg:pb-6 mb:pb-5 *:lg:w-[197.33px] *:mb:w-[106px] *:lg:py-2.5 *:mb:py-[7px] *:rounded-[100px] *:border *:place-items-center *:lg:text-base *:mb:text-xs">
                <button className="btn_show_description grid hover:border-[#05422C] border-[#05422C] text-[#05422C] hover:bg-[#F2F6F4] bg-[#F2F6F4]">
                    Description
                </button>
                <button className="btn_show_review flex items-center justify-center gap-x-1 hover:border-[#05422C] hover:text-[#05422C] hover:bg-[#F2F6F4]">
                    Reviews
                    <p>(350)</p>
                </button>
                <button className="btn_show_refer grid hover:border-[#05422C] hover:text-[#05422C] hover:bg-[#F2F6F4]">
                    Refer a Friend
                </button>
            </ul>
        </div>
    );
}
 
export default MenuDescription;