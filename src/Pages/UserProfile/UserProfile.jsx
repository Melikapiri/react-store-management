import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import usersIcon from "../../Icons/UsersIcon";
import PageTitle from "../../Components/PageTitle/PageTitle";
import Loader from "../../Components/Loader/Loader";
import User from "../../Icons/User";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";

const UserProfile = () => {
    let route = useParams().id
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})


    const getAllUsers = async () => {
        try {
            const res = await fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/users.json`);
            if (!res.ok) {
                throw new Error("خطا در گرفتن داده‌ها");
            }
            const data = await res.json();
            if (!data) return [];

            const arrayUsers = Object.entries(data).map(([id, users]) => ({
                id,
                ...users
            }));

            const findUserData = arrayUsers.find(user => user.id === route)
            return findUserData;
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
            return [];
        }
    };

    const fetchAllProductsComments = async () => {
        try {
            const users = await getAllUsers();
            setUserData(users);
            setLoading(false)
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };


    useEffect(() => {
        fetchAllProductsComments()
    }, [])


    return (
        <div className="flex flex-col gap-5 p-2 lg:p-4 ">
            <PageTitle title="Users Profile"/>
            {
                loading ? (
                    <Loader/>) : (
                    <div className="w-full p-1 xs:p-3 md:p-10 rounded-xl bg-sky-200/10">
                        <div className="w-full h-full p-4  border border-primaryColor/10 rounded-xl  ">
                            <div className="flex items-center gap-5 xs:gap-10 mb-10">
                                <div>
                                    {
                                        userData.gender === "women" ? <img
                                                className="w-24 h-24 sm:w-40 sm:h-40 shadow-md shadow-primaryColor/10 rounded-full border border-slate-500"
                                                src="/women.jpg" alt=""/> :
                                            <img
                                                className="w-24 h-24 sm:w-40 sm:h-40 shadow-md shadow-primaryColor/10 rounded-full border border-slate-500"
                                                src="/man.jpg"/>
                                    }
                                </div>

                                <div>
                                    <h3 className="font-Modam-bold text-base sm:text-2xl  sm:mb-3">{userData.name}</h3>
                                    <p className="font-Modam-bold text-base sm:text-xl  sm:mb-3"> سن
                                        : {userData.age}</p>
                                    <p className="font-Modam-SemiBold  text-base sm:text-lg"> شناسه
                                        : {userData.userId}</p>
                                </div>

                            </div>

                            <div className="flex items-center justify-between gap-3.5 xs:gap-5 mb-8 flex-wrap">
                                <div>
                                    <p className="font-Modam-SemiBold text-sm sm:text-base">
                                        آدرس ایمیل : <span className="font-Modam-Regular text-xs xs:text-sm mx-2">
{userData.email}
                                    </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="font-Modam-SemiBold text-sm sm:text-base">
                                        تاریخ ثبت نام :
                                        <span className="font-Modam-Regular text-xs sm:text-sm mx-2">
{userData.registeredAt}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="font-Modam-SemiBold text-sm sm:text-base">
                                        شماره تماس :
                                        <span className="font-Modam-Regular text-xs sm:text-sm mx-2">
{userData.phone}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="font-Modam-SemiBold text-sm  sm:text-base">
                                        شهر :
                                        <span className="font-Modam-Regular text-xs sm:text-sm mx-2">
{userData.city}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="font-Modam-SemiBold text-sm sm:text-base">
                                        تعداد سفارش ها :
                                        <span className="font-Modam-Regular text-xs sm:text-sm mx-2">
            {userData.purchases && userData.purchases.length ? userData.purchases.length : "سفارشی برای کاربر ثبت نشده "}
                                        </span>
                                    </p>
                                </div>
                            </div>


                            {userData.purchases && userData.purchases.length ?
                                <div
                                    className="custom-scrollbar relative overflow-x-auto  shadow-md sm:rounded-lg border">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr className="font-Modam-SemiBold child:text-center">
                                            <th scope="col" className="px-4 sm:px-6 py-3"> شناسه محصول</th>
                                            <th scope="col" className="px-4 sm:px-6 py-3"> عکس محصول</th>
                                            <th scope="col" className="px-4 sm:px-6 py-3">نام محصول</th>
                                            <th scope="col" className="px-4 sm:px-6 py-3">قیمت محصول</th>
                                            <th scope="col" className="px-4 sm:px-6 py-3">تاریخ خرید</th>
                                            <th scope="col" className="px-4 sm:px-6 py-3">وضعیت سفارش</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {userData.purchases && userData.purchases.length ? userData.purchases.map((purchase) => (
                                            <tr key={purchase.id}
                                                className={` odd:bg-white even:bg-gray-50 border-b border-gray-200 child:min-w-32 `}>
                                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{purchase.id}</td>
                                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4">
                                                    <img src={purchase.image} alt={purchase.product}
                                                         className="w-12 h-12 mx-auto object-cover rounded-full border-slate-500 shadow-md"/>
                                                </td>
                                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{purchase.product}</td>
                                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{purchase.amount.toLocaleString()} تومان</td>
                                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{purchase.date}</td>
                                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4"> {purchase.status}</td>
                                            </tr>
                                        )) : null
                                        }

                                        </tbody>
                                    </table>


                                </div> : <ErrorBox message="محصولی ثبت نشده است "/>}


                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default UserProfile;