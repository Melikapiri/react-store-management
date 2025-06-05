import React, {useEffect, useState} from "react";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import DetailProductModal from "../../Components/DetailProductModal/DetailProductModal";
import EditeModal from "../../Components/EditModal/EditeModal";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import PageTitle from "../../Components/PageTitle/PageTitle";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Components/Pagination/Pagination";
import AlertModal from "../../Components/AlertModal/AlertModal";
import Change from "../../Icons/Change";
import Delete from "../../Icons/Delete";
import User from "../../Icons/User"

const Orders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [allOrdersCopy, setAllOrdersCopy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userOrder, setUserOrder] = useState("");

    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectEditProductId, setSelectEditProductId] = useState(null);

    const [customerEmail, setCustomerEmail] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState("");
    const [productId, setProductId] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [editStatusValue, setEditStatusValue] = useState("");

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [id, setId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userConnection, setUserConnection] = useState(false);

    const itemsPerPage = 6;

    const getAllOrders = async () => {
        try {
            const res = await fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/productOrder.json`);
            if (!res.ok) {
                setUserConnection(true);
                throw new Error("خطا در گرفتن داده‌ها");
            }
            const data = await res.json();
            if (!data) return [];

            return Object.entries(data).map(([id, item]) => ({id, ...item}));
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

    useEffect(() => {
        setCurrentPage(1);
        let filteredOrders = allOrders;
        if (filter === "processing") {
            filteredOrders = allOrders.filter(o => o.status === "در حال پردازش");
        } else if (filter === "delivered") {
            filteredOrders = allOrders.filter(o => o.status === "تحویل داده شده");
        } else if (filter === "cancelled") {
            filteredOrders = allOrders.filter(o => o.status === "لغو شده");
        }
        setAllOrdersCopy(filteredOrders);
    }, [filter, allOrders]);

    const totalPages = Math.ceil(allOrdersCopy.length / itemsPerPage);
    const paginatedProducts = allOrdersCopy.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const editStatusOrder = (id) => {
        const updateOrderStatus = {
            customerEmail,
            customerName,
            orderDate,
            phone,
            price,
            productId,
            productImage,
            productName,
            quantity,
            status: editStatusValue
        };

        fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/productOrder/${id}.json`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updateOrderStatus)
        }).then(() => {
            fetchAllProducts();
            setOpenEditModal(false);
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
        });
    };

    const deleteOrder = (id) => {
        fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/productOrder/${id}.json`, {
            method: "DELETE"
        }).then(() => {
            fetchAllProducts();
            setOpenDeleteModal(false);
            setDeleteModal(true);
            setTimeout(() => setDeleteModal(false), 3000);
        });
    };

    return (
        <div className="flex flex-col gap-5 p-2 lg:p-4 ">
            <PageTitle title="User Orders"/>

            <div className="flex items-center justify-center ">
                <div className="relative max-w-72 min-w-48">
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        className="block w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-md focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-gray-400"
                    >
                        <option value="all">🗂 همه سفارش‌ها</option>
                        <option value="processing">⏳ در حال پردازش</option>
                        <option value="delivered">📦 تحویل داده شده</option>
                        <option value="cancelled">❌ لغو شده</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <Loader/>
            ) : (
                <>
                    <div className="relative custom-scrollbar overflow-x-auto shadow-md sm:rounded-lg border">
                        {paginatedProducts.length === 0 ? (
                            <ErrorBox message="محصولی یافت نشد"/>
                        ) : (
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr className="font-Modam-SemiBold child:text-center">
                                    <th className="px-4 py-3">عکس محصول</th>
                                    <th className="px-4 py-3">نام محصول</th>
                                    <th className="px-4 py-3">تاریخ سفارش</th>
                                    <th className="px-4 py-3">تعداد سفارش</th>
                                    <th className="px-4 py-3">وضعیت</th>
                                    <th className="px-4 py-3">قیمت</th>
                                    <th className="px-4 py-3">قیمت کل</th>
                                    <th className="px-4 py-3">عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedProducts.map((order) => (
                                    <tr key={order.id}
                                        className="odd:bg-white even:bg-gray-50 border-b border-gray-200 ">
                                        <td className="px-4 py-3  text-center sm:px-6 sm:py-4 flex items-center justify-center">
                                            <img
                                                className="max-h-10 max-w-10 xs:w-[60px] xs:h-[60px] rounded-full shadow-md border border-primaryColor/50 object-cover "
                                                src={order.productImage} alt=""/>
                                        </td>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4 max-w-60 min-w-56 ">{order.productName}</td>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4 overflow-hidden whitespace-nowrap text-ellipsis">
                                            {order.orderDate}
                                        </td>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4 overflow-hidden whitespace-nowrap text-ellipsis">
                                            {order.quantity}
                                        </td>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4 max-w-40 min-w-36">{order.status}</td>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4 max-w-40 min-w-36  ">{Number(order.price).toLocaleString()} تومان</td>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4 max-w-40 min-w-36  "> {Number(order.price * order.quantity).toLocaleString()} تومان</td>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4 ">
                                            <div className="flex items-center justify-center gap-4 ">
                                                <button
                                                    onClick={() => {
                                                        setOpenDetailModal(true)
                                                        setUserName(order.customerName)
                                                        setUserEmail(order.customerEmail)
                                                        setUserPhone(order.phone)
                                                        setUserOrder(order.productName)
                                                    }}
                                                    className="p-2 bg-skyBlue text-primaryColor text-xs font-Modam-Regular rounded-xl">
                                                    <User className="w-6 h-6"/>

                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setOpenDeleteModal(true)
                                                        setId(order.id)

                                                    }}
                                                    className="p-2 text-red-500 bg-red-100 text-xs font-Modam-Regular rounded-xl">
                                                    <Delete classList="w-6 h-6"/>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setOpenEditModal(true)
                                                        setSelectEditProductId(order.id)
                                                        setCustomerEmail(order.customerEmail)
                                                        setCustomerName(order.customerName)
                                                        setOrderDate(order.orderDate)
                                                        setPhone(order.phone)
                                                        setPrice(order.price)
                                                        setProductId(order.productId)
                                                        setProductImage(order.productImage)
                                                        setProductName(order.productName)
                                                        setQuantity(order.quantity)
                                                    }}
                                                    className="p-2 text-violet-500 bg-violet-100 text-xs font-Modam-Regular rounded-xl">
                                                    <Change classList="w-6 h-6"/>
                                                </button>


                                            </div>
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                        )}

                        {openDetailModal && (
                            <DetailProductModal cancelBtn={() => setOpenDetailModal(false)}>
                                <div
                                    className="custom-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg border">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <thead>
                                        <tr className="child:min-w-32 child:text-center">
                                            <th className="px-4 py-3">نام کاربر</th>
                                            <th className="px-4 py-3">محصول</th>
                                            <th className="px-4 py-3">ایمیل</th>
                                            <th className="px-4 py-3">تلفن</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="border-b  ">
                                            <td className="px-2 py-3 text-center">{userName}</td>
                                            <td className="px-2 py-3 text-center">{userOrder}</td>
                                            <td className="px-2 py-3 text-center">{userEmail}</td>
                                            <td className="px-2 py-3 text-center">{userPhone}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </DetailProductModal>
                        )}


                        {openDeleteModal && (
                            <DeleteModal cancelBtn={() => setOpenDeleteModal(false)} id={id} submitBtn={deleteOrder}
                                         title="آیا از حذف این محصول اطمینان دارید ؟"/>
                        )}

                        {openEditModal && (
                            <EditeModal closeEditeModal={() => setOpenEditModal(false)} saveEditeModal={editStatusOrder}
                                        id={selectEditProductId}>
                                <div className="p-4 bg-skyBlue/50 rounded-xl">
                                    <select
                                        defaultValue={editStatusValue}
                                        onChange={(e) => setEditStatusValue(e.target.value)}
                                        className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-md focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-gray-400"
                                    >
                                        <option value="در حال پردازش">⏳ در حال پردازش</option>
                                        <option value="تحویل داده شده">📦 تحویل داده شده</option>
                                        <option value="لغو شده">❌ لغو شده</option>
                                    </select>
                                </div>
                            </EditeModal>
                        )}

                        {showModal && <AlertModal text="محصول با موفقیت ویرایش شد"/>}
                        {userConnection && <AlertModal text="لطفا اینترنت و VPN خود را فعال کنید"/>}
                        {deleteModal && <AlertModal text="سفارش با موفقیت حذف شد"/>}
                    </div>

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
                </>
            )}
        </div>
    );
};

export default Orders;
