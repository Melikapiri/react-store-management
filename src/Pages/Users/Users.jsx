import React, {useEffect, useState} from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import Loader from "../../Components/Loader/Loader";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import Xmark from "../../Icons/Xmark";
import User from "../../Icons/User";
import CommentIcon from "../../Icons/CommentIcon";
import Check from "../../Icons/Check";
import DetailProductModal from "../../Components/DetailProductModal/DetailProductModal";
import EditeModal from "../../Components/EditModal/EditeModal";
import AlertModal from "../../Components/AlertModal/AlertModal";
import Pagination from "../../Components/Pagination/Pagination";
import {Link} from "react-router-dom";

const Users = () => {
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(true)


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(allUsers.length / itemsPerPage);
    const paginatedProducts = allUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        fetchAllProductsComments()
    }, [])



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
            return arrayUsers;
        } catch (error) {
            console.error("خطا در دریافت کاربران:", error);
            return [];
        }
    };


    const fetchAllProductsComments = async () => {
        try {
            const users = await getAllUsers();
            setAllUsers(users);
            setLoading(false)
        } catch (error) {
            console.error("خطا در دریافت کاربران:", error);
        }
    };
    return (
        <div className="flex flex-col gap-5 p-2 lg:p-4 ">
            <PageTitle title="Users"/>
            {loading ? (
                <Loader/>
            ) : allUsers.length === 0 ? (
                <ErrorBox message="کاربری یافت نشد"/>
            ) : (
                <>
                    <div className="custom-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg border">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr className="font-Modam-SemiBold child:text-center">
                                <th scope="col" className="px-4 sm:px-6 py-3"> کاربر</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">شناسه کاربر</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">نام کاربر</th>
                                <th scope="col" className="px-4 sm:px-6 py-3"> ایمیل کاربر</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">زمان ثبت نام</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">تعداد سفارشها</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">شهر</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedProducts.map((user) => (
                                <tr key={user.id}
                                    className={` odd:bg-white even:bg-gray-50 border-b border-gray-200 child:min-w-32 `}>
                                    <td className="flex justify-center px-4 py-3 text-center sm:px-6 sm:py-4">
                                        <User className="w-5 h-5"/>
                                    </td>

                                    <td className="  gap-3 px-4 py-3 text-center sm:px-6 sm:py-4">
                                        {user.userId}</td>
                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{user.name}</td>
                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{user.email}</td>


                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{user.registeredAt}</td>
                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">  {user.purchases && user.purchases.length ? user.purchases.length : "0"}
                                    </td>
                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{user.city}</td>

                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">
                                        <div className="flex items-center justify-center gap-4">
                                            <Link to={`/users/${user.id}`}

                                                  className="p-2 border border-violet-500 text-violet-500 bg-violet-50 text-xs font-Modam-Regular rounded-xl">
                                                پروفایل کاربر
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>


                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            )}
        </div>
    );
};

export default Users;