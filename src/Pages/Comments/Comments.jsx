import React, {useEffect, useState} from "react";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import DetailProductModal from "../../Components/DetailProductModal/DetailProductModal";
import EditeModal from "../../Components/EditModal/EditeModal";
import Pencil from "../../Icons/Pencil";
import Dollar from "../../Icons/Dollar";
import ArchiveBox from "../../Icons/ArchiveBox";
import Photo from "../../Icons/Photo";
import Heart from "../../Icons/Heart";
import Chart from "../../Icons/Chart";
import Swatch from "../../Icons/Swatch";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import PageTitle from "../../Components/PageTitle/PageTitle";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Components/Pagination/Pagination";
import CommentIcon from "../../Icons/CommentIcon";
import Check from "../../Icons/Check";
import Xmark from "../../Icons/Xmark";
import AlertModal from "../../Components/AlertModal/AlertModal";

const Comments = () => {


    const [allComments, setAllComments] = useState([])
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(null);
    const [commentId, setCommentId] = useState(null);


    const [openDetailModal, setOpenDetailModal] = useState(false)
    const [commentBody, setCommentBody] = useState("")

    const [acceptComments, setAcceptComment] = useState(false)
    const [rejectComment, setRejectComment] = useState(false)

    const [showModalAccept, setShowModalAccept] = useState(false)
    const [showModalReject, setShowModalReject] = useState(false)


    //comment data
    const [id, setId] = useState("");
    const [body, setBody] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [isAccept, setIsAccept] = useState("0");
    const [productID, setProductID] = useState("");
    const [userID, setUserID] = useState("");


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(allComments.length / itemsPerPage);
    const paginatedProducts = allComments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    useEffect(() => {
        fetchAllProductsComments()
    }, [])


    const getAllComments = async () => {
        try {
            const res = await fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/comments.json`);

            if (!res.ok) {
                throw new Error("خطا در گرفتن داده‌ها");
            }

            const data = await res.json();
            if (!data) return [];

            const arrayComments = Object.entries(data).map(([id, comments]) => ({
                id,
                ...comments
            }));
            return arrayComments;
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
            return [];
        }
    };


    const fetchAllProductsComments = async () => {
        try {
            const comments = await getAllComments();
            setAllComments(comments);
            setLoading(false)
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };

    const closeCommentBodyModal = () => {
        setOpenDetailModal(false)
    }


    const closeChangeStatusModal = () => {
        setAcceptComment(false)
        setRejectComment(false)
    }
    const submitChangeStatusComment = (id) => {
        let updateStatusComments = {
            id,
            body,
            date,
            hour,
            isAccept,
            productID,
            userID,
        };
        fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/comments/${id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateStatusComments)
        }).then(res => {
            return res.json()
        }).then(data => {
            closeChangeStatusModal()
            fetchAllProductsComments()
            setShowModalAccept(true)
            setTimeout(() => {
                setShowModalAccept(false);
            }, 3000);

        })
    }


    const submitRejectComment = (id) => {

        let rejectCommentData = {
            id,
            body,
            date,
            hour,
            isAccept,
            productID,
            userID,
        };
        fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/comments/${id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rejectCommentData)
        }).then(res => {
            return res.json()
        }).then(data => {
            closeChangeStatusModal()
            fetchAllProductsComments()
            setShowModalReject(true)
            setTimeout(() => {
                setShowModalReject(false);
            }, 3000);

        })
    }


    return (
        <div className="flex flex-col gap-5 p-2 lg:p-4 "><PageTitle title="Comments"/>
            {loading ? (
                <Loader/>
            ) : allComments.length === 0 ? (
                <ErrorBox message="کامنتی یافت نشد"/>
            ) : (

                <>

                    <div className="custom-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg border">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr className="font-Modam-SemiBold child:text-center">
                                <th scope="col" className="px-4 sm:px-6 py-3">نام کاربر</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">نام محصول</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">وضعیت کامنت</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">تاریخ</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">ساعت</th>
                                <th scope="col" className="px-4 sm:px-6 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedProducts.map((comment, index) => (

                                <tr key={comment.id}
                                    className={`border-r-2  ${comment.isAccept == "1" && `border-r-lime-300`} ${comment.isAccept == "2" && `border-r-stone-300`} ${comment.isAccept == "0" && `border-r-pink-300`} odd:bg-white even:bg-gray-50 border-b border-gray-200 child:min-w-32 `}>
                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{comment.userID}</td>
                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{comment.productID}</td>
                                    <td className=" px-4 py-3 child:tracking-tight child:inline-block text-center sm:px-6 sm:py-4">{comment.isAccept == "1" && (
                                        <p className="text-lime-600 bg-lime-50 text-xs  border border-lime-600 px-2 py-1.5 rounded-lg">تایید
                                            شده</p>)}
                                        {comment.isAccept == '0' && (
                                            <p className="text-pink-600 bg-pink-50 text-xs border border-pink-600 px-2 py-1.5 rounded-lg">تایید
                                                نشده</p>)}
                                        {comment.isAccept == '2' && (
                                            <p className="text-stone-600 bg-stone-100 text-xs border border-stone-600 px-2 py-1.5 rounded-lg">رد
                                                شده</p>)}

                                    </td>

                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{comment.date}</td>
                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{comment.hour}</td>
                                    <td className="px-4 py-3 text-center sm:px-6 sm:py-4">
                                        <div className="flex items-center justify-center gap-4">


                                            <button
                                                onClick={() => {
                                                    setRejectComment(true)
                                                    setCommentId(comment.id)

                                                    setId(comment.id)
                                                    setBody(comment.body)
                                                    setDate(comment.date)
                                                    setHour(comment.hour)
                                                    setIsAccept("2")
                                                    setProductID(comment.productID)
                                                    setUserID(comment.userID)
                                                }}
                                                className="p-2 text-pink-500 bg-pink-100 font-Modam-Regular rounded-xl">
                                                <Xmark className="w-7 h-7"/>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setOpenDetailModal(true)
                                                    setCommentBody(comment.body)
                                                }}
                                                className="p-2 text-stone-500 bg-stone-200 font-Modam-Regular rounded-xl">
                                                <CommentIcon className="w-7 h-7"/>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setAcceptComment(true)
                                                    setCommentId(comment.id)

                                                    setId(comment.id)
                                                    setBody(comment.body)
                                                    setDate(comment.date)
                                                    setHour(comment.hour)
                                                    setIsAccept("1")
                                                    setProductID(comment.productID)
                                                    setUserID(comment.userID)
                                                }}
                                                className="p-2 text-violet-500 bg-violet-100 font-Modam-Regular rounded-xl">
                                                <Check className="w-7 h-7"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {
                            openDetailModal && <DetailProductModal cancelBtn={closeCommentBodyModal}>
                                <h3 className=" font-Modam-bold text-center pb-2 border-b border-b-primaryColor text-primaryColor">
                                    کامنت کاربر :
                                </h3>
                                <p className="text-center bg-stone-200  py-4">{commentBody}</p>
                            </DetailProductModal>
                        }
                        {
                            acceptComments && <EditeModal id={commentId} closeEditeModal={closeChangeStatusModal}
                                                          saveEditeModal={submitChangeStatusComment}>
                                <p className="text-center my-3 ">آیا از تایید این کامنت اطمینان دارید ؟ </p>
                            </EditeModal>
                        }
                        {
                            rejectComment && <EditeModal id={commentId} closeEditeModal={closeChangeStatusModal}
                                                         saveEditeModal={submitRejectComment}>
                                <p className="text-center my-3">آیا از رد این کامنت اطمینان دارید ؟ </p>
                            </EditeModal>
                        }
                        {
                            showModalAccept && <AlertModal text="کامنت با موفقیت تایید شد"/>
                        }
                        {
                            showModalReject && <AlertModal text="کامنت با موفقیت رد شد"/>
                        }

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
}

export default Comments;