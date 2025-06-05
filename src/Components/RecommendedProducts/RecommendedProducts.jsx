import React, { useEffect, useState } from "react";
import Loader2 from "../Loader2/Loader2";

const RecommendedProducts = () => {
    const [productDetail, setProductDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const res = await fetch(
                    `https://dashboard-admin-react1-default-rtdb.firebaseio.com/products.json`
                );
                const data = await res.json();
                if (!data) return [];
                const arrayProduct = Object.entries(data).map(([id, product]) => ({
                    id,
                    ...product,
                }));
                setProductDetail(arrayProduct);
                setLoading(false);
            } catch (error) {
                console.error("خطا در دریافت محصولات:", error);
                setLoading(false);
            }
        };
        getAllProduct();
    }, []);



    return (
        <div className="flex-[3]">
            <h3 className="font-Modam-SemiBold text-xl text-primaryColor text-center mb-2">
                جدید ترین محصولات
            </h3>
            {loading?  (<Loader2 title="در حال بارگذاری محصولات ..."/>
                ) : (
                <div
                    className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 xs:gap-5  xl:gap-8 child:shadow-xl child:rounded-xl child:border child:border-primaryColor/20">
                    {productDetail.slice(0, 3).map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col justify-between items-start bg-gray-50"
                        >
                            <div className="w-full p-3">
                                <img
                                    className="shadow-lg rounded-xl border border-lightGray/30 object-cover w-full h-44 xs:h-36 md:h-44 xl:h-36"
                                    src={item.img}
                                    alt={item.title}
                                />
                            </div>
                            <div className="flex flex-col justify-between w-full h-full text-sm py-2 px-3.5">
                                <h4 className="text-base font-Modam-SemiBold line-clamp-1 text-center pb-2 border-b border-b-primaryColor">
                                    {item.title}
                                </h4>
                                <div className="flex items-center justify-between gap-12 my-2">
                                    <p className="font-Modam-SemiBold tracking-tight text-sm">
                                        موجودی :
                                    </p>
                                    <p className="font-Modam-Regular text-xs tracking-tight p-1 bg-primaryColor/30 rounded-lg text-white">
                                        {item.count}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between gap-12 mb-2">
                                    <p className="font-Modam-SemiBold tracking-tight text-sm">قیمت :</p>
                                    <p className="font-Modam-Regular p-1 text-xs tracking-tight bg-primaryColor/30 rounded-lg text-white">
                                        {Number(item.price).toLocaleString()} ت
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>


    );
};

export default RecommendedProducts;
