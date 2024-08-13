// import instance from "@/configs/axios";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";

// const Row3 = () => {
//     const {id} = useParams()
//     const {data:product} = useQuery({
//         queryKey:['product',id],
//         queryFn:()=> instance.get(`/product/${id}`)
//     })
//     return (
//         <div>
//             <div className="flex flex-col lg:gap-y-3 mb:gap-y-2 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px]">
//                 <span className="text-xs tracking-[1px] text-[#717378]">
//                     DESCRIPTION
//                 </span>
//                 <p className="text-[14px] text-[#46494F]">
//                    {product?.data.description}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Row3;
