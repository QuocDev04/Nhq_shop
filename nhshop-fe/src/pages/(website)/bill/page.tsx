import { useEffect } from "react";
import Bill from "./_component/Bill";

const Billpages = () => {
        useEffect(() => {
            window.scrollTo(0, 200);
        }, []);
    return ( 
        <>
        
            <Bill/>
        </>
     );
}
 
export default Billpages;