import { Tabs, TabsProps } from "antd";
import TextDescription from "./TextDescription";
import DeatilComment from "./DetailComment";

const MenuDescription = () => {
const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Mô tả sản phẩm",
        children: (
            <TextDescription/>
        ),
    },
    {
        key: "2",
        label: "Đánh giá về sản phẩm",
        children: (
            <DeatilComment/>
        ),
    },
    {
        key: "3",
        label: "Tab 3",
        children: "Content of Tab Pane 3",
    },
];
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items}/>
        </div>
    );
}
 
export default MenuDescription;