import React, { useState, useEffect } from "react";
import Loader2 from "../Loader2/Loader2";
import AlertModal from "../AlertModal/AlertModal";
const RecentOrderList = () => {
    const [userConnection, setUserConnection] = useState(false);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllOrders = async () => {
        try {
            const res = await fetch(
                `https://dashboard-admin-react1-default-rtdb.firebaseio.com/productOrder.json`
            );
            if (!res.ok) {
                setUserConnection(true);
                throw new Error("خطا در گرفتن داده‌ها");
            }
            const data = await res.json();
            if (!data) return [];

            return Object.entries(data).map(([id, item]) => ({ id, ...item }));
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
            setTimeout(() => setUserConnection(false), 3000);
            return [];
        }
    };

    const fetchAllProducts = async () => {
        const orders = await getAllOrders();
        setAllOrders(orders);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <div
            className="flex-[2] xl:flex-[1] lg:p-3 lg:max-h-20 lg:min-h-18 mb-10
    "
        >
            <h3 className="text-lg font-Modam-SemiBold mb-1 text-center">
                سفارشات اخیر
            </h3>

            {loading ? (
              <Loader2 title="درحال بارگذاری سفارشتات اخیر ..."/>
            ) : userConnection || allOrders.length === 0 ? (
                 <AlertModal text="لطفا از اتصال اینترنت و  Vpn اطمینان حاصل کنید"/>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                    {allOrders.slice(0, 6).map((item) => (
                        <li
                            key={item.id}
                            className="flex justify-between items-center border border-primaryColor/20 text-sm gap-2 shadow-sm rounded-lg p-2"
                        >
                            <div className="flex items-center gap-1.5 xs:gap-3">
                                <img
                                    className="w-8 h-8 object-cover shadow-xl border border-lightGray/40 rounded-full"
                                    src={item.productImage}
                                    alt={item.productName}
                                />
                                <p className="tracking-tight max-w-24 text-xs font-Modam-Regular line-clamp-1">
                                    {item.productName}
                                </p>
                            </div>
                            <div className="text-gray-500 font-Modam-light xs:font-Modam-Regular flex justify-between items-center gap-2">
                                <p className="tracking-tight flex gap-1 text-xs font-Modam-Regular border border-primaryColor/20 bg-primaryColor text-secondPrimaryColor rounded-lg p-1 xs:p-1.5">
                                    {Number(item.price).toLocaleString()}
                                    <span> تومان</span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecentOrderList;
