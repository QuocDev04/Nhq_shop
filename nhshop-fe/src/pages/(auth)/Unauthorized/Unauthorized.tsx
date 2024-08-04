import { Button, Result } from "antd";
import {SmileOutlined} from "@ant-design/icons"
const Unauthorized = () => {
    return (
        <div>
            <Result
                icon={<SmileOutlined />}
                title="Xin lỗi, bạn không có quyền truy cập trang này. Vui lòng thử lại sau!"
                extra={<Button type="primary">Next</Button>}
            />
        </div>
    );
}
 
export default Unauthorized;