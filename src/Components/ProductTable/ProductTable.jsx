import React, {useState} from 'react';
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailProductModal from "../DetailProductModal/DetailProductModal";
import EditeModal from "../EditModal/EditeModal";
import Pencil from "../../Icons/Pencil";
import Chart from "../../Icons/Chart";
import Heart from "../../Icons/Heart";
import Photo from "../../Icons/Photo";
import ArchiveBox from "../../Icons/ArchiveBox";
import Dollar from "../../Icons/Dollar";
import Swatch from "../../Icons/Swatch";
import ErrorBox from "../ErrorBox/ErrorBox";
import AlertModal from "../AlertModal/AlertModal";
import Pagination from "../Pagination/Pagination";

const ProductTable = ({allProduct, getAllProduct, fetchAllProducts}) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openDetailModal, setDetailModal] = useState(false);
    const [openEditeModal, setEditeModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const [popularityProduct, setPopularityProduct] = useState("");
    const [countProduct, setCountProduct] = useState("");
    const [colorsProduct, setColorsProduct] = useState("");
    const [imgProduct, setImgProduct] = useState("");

    const [newpPopularityProduct, setNewPopularityProduct] = useState("");
    const [newCountProduct, setNewCountProduct] = useState("");
    const [newColorsProduct, setNewColorsProduct] = useState("");
    const [newImgProduct, setNewImgProduct] = useState("");
    const [newTitleProduct, setNewtTitleProduct] = useState("");
    const [newPriceProduct, setNewPriceProduct] = useState("");
    const [newSaleProduct, setNewSaleProduct] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showModalDelSuccess, setShowModalDelSuccess] = useState(false);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(allProduct.length / itemsPerPage);
    const paginatedProducts = allProduct.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const cancelDeleteModal = () => {
        setOpenDeleteModal(false)
    }
    const cancelDetailModal = () => {
        setDetailModal(false)
    }
    const submitDeleteModal = (selectedProductId) => {
        console.log(selectedProductId)
        fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/products/${selectedProductId}.json`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) throw new Error("خطا در حذف محصول");
            })
            .then(() => {
                setOpenDeleteModal(false);
                fetchAllProducts();
                console.log("محصول حذف شد");
                setShowModalDelSuccess(true)
                setTimeout(() => {
                    setShowModalDelSuccess(false);
                }, 3000)

            })
            .catch(err => {
                console.error("خطا:", err);
            });
    };

    const cancelEdit = () => {
        setEditeModal(false)
    }
    const submitEditData = (id) => {
        let updateProductData = {
            title: newTitleProduct,
            price: newPriceProduct,
            count: newCountProduct,
            img: newImgProduct,
            popularity: newpPopularityProduct,
            sale: newSaleProduct,
            colors: newColorsProduct,
        };
        fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/products/${id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateProductData)
        }).then(res => {

            return res.json()
        }).then(data => {
            fetchAllProducts();
            cancelEdit()
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false);
            }, 3000);

        })
    }


    return allProduct.length ? (
        <>
            <div className="custom-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr className="font-Modam-SemiBold child:text-center">
                        <th scope="col" className="px-4 sm:px-6 py-3">عکس محصول</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">نام محصول</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">قیمت</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">موجودی</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paginatedProducts.map(product => (
                            <tr key={product.id}
                                className="odd:bg-white even:bg-gray-50 border-b border-gray-200 child:h-20 child:min-w-32">

                                <td scope="row" className=" text-centerpx-4 py-3 sm:px-6 sm:py-4  ">
                                    <div className="flex justify-center  items-center">
                                        <img
                                            className="h-10 w-10 xs:w-[50px] xs:h-[50px] shadow object-cover rounded-full"
                                            src={product.img}
                                            alt="product"
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{product.title}</td>
                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4"> {Number(product.price).toLocaleString()} تومان</td>
                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{product.count}</td>
                                <td className="px-4 py-3 text-center sm:px-6 sm:py-4">
                                    <div className="flex items-center justify-center gap-4 ">
                                        <button
                                            onClick={() => {
                                                setDetailModal(true)
                                                setPopularityProduct(product.popularity)
                                                setCountProduct(product.count)
                                                setColorsProduct(product.colors)
                                                setImgProduct(product.img)
                                            }}

                                            type="button"
                                            className="p-2 bg-skyBlue text-primaryColor font-Modam-Regular rounded-xl "
                                        >
                                            جزییات
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedProductId(product.id);
                                                setOpenDeleteModal(true);
                                            }}
                                            type="button"
                                            className="p-2 text-red-500 bg-red-100 font-Modam-Regular rounded-xl "
                                        >
                                            حذف
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditeModal(true)
                                                setSelectedProductId(product.id)
                                                setNewPopularityProduct(product.popularity)
                                                setNewCountProduct(product.count)
                                                setNewColorsProduct(product.colors)
                                                setNewImgProduct(product.img)
                                                setNewtTitleProduct(product.title)
                                                setNewPriceProduct(product.price)
                                                setNewSaleProduct(product.sale)

                                            }}
                                            type="button"
                                            className="p-2  text-lime-500 bg-lime-100 font-Modam-Regular rounded-xl "
                                        >
                                            ویرایش
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
                {
                    openDeleteModal &&
                    <DeleteModal cancelBtn={cancelDeleteModal} id={selectedProductId} submitBtn={submitDeleteModal}
                                 title="آیا از حذف این محصول اطمینان دارید ؟"/>
                }
                {
                    openDetailModal && (
                        <DetailProductModal cancelBtn={cancelDetailModal}>
                            <div className="custom-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg border">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr className="font-Modam-SemiBold child:text-center">
                                        <th scope="col" className="px-4 sm:px-6 py-3">عکس</th>
                                        <th scope="col" className="px-4 sm:px-6 py-3">محبوبیت</th>
                                        <th scope="col" className="px-4 sm:px-6 py-3">تعداد</th>
                                        <th scope="col" className="px-4 sm:px-6 py-3">رنگبندی</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200 child:min-w-28">
                                        <th scope="row" className=" text-centerpx-4 py-3 sm:px-6 sm:py-4  ">
                                            <div className="flex justify-center items-center">
                                                <img
                                                    className="max-h-10 max-w-10 xs:w-[50px] xs:h-[50px] rounded-full"
                                                    src={imgProduct}
                                                    alt="product"
                                                />
                                            </div>
                                        </th>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4">100/{popularityProduct}</td>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{countProduct}</td>
                                        <td className="px-4 py-3 text-center sm:px-6 sm:py-4">{colorsProduct}</td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </DetailProductModal>
                    )
                }

                {
                    openEditeModal && (
                        <EditeModal closeEditeModal={cancelEdit} id={selectedProductId} saveEditeModal={submitEditData}>
                            <form action="#" className="p-4 bg-skyBlue/50 flex flex-col gap-4 rounded-xl">
                                <div
                                    className="flex gap-3 p-3 rounded-2xl bg-white overflow-hidden text-sm font-Modam-SemiBold">
                                    <Pencil className="sm:w-6 sm:h-6 w-5 h-5 text-primaryColor"/>
                                    <input
                                        value={newTitleProduct}
                                        onChange={(e) => setNewtTitleProduct(e.target.value)}
                                        className="w-full text-xs sm:text-sm border-0 outline-0"
                                        type="text"
                                        placeholder="عنوان جدید محصول را وارد کنید "
                                    />
                                </div>
                                <div
                                    className="flex gap-3 p-3 rounded-2xl bg-white overflow-hidden text-sm font-Modam-SemiBold">
                                    <Dollar className="sm:w-6 sm:h-6 w-5 h-5 text-primaryColor"/>
                                    <input
                                        value={newPriceProduct.toLocaleString()}
                                        onChange={(e) => setNewPriceProduct(e.target.value)}
                                        className="w-full text-xs sm:text-sm border-0 outline-0"
                                        type="text"
                                        placeholder="مبلغ جدید محصول را وارد کنید "
                                    />
                                </div>
                                <div
                                    className="flex gap-3 p-3 rounded-2xl bg-white overflow-hidden text-sm font-Modam-SemiBold">
                                    <ArchiveBox className="sm:w-6 sm:h-6 w-5 h-5 text-primaryColor"/>
                                    <input
                                        value={newCountProduct}
                                        onChange={(e) => setNewCountProduct(e.target.value)}
                                        className="w-full text-xs sm:text-sm border-0 outline-0"
                                        type="text"
                                        placeholder="تعداد محصول را وارد کنید "
                                    />
                                </div>
                                <div
                                    className="flex gap-3 p-3 rounded-2xl bg-white overflow-hidden text-sm font-Modam-SemiBold">
                                    <Photo className="sm:w-6 sm:h-6 w-5 h-5 text-primaryColor"/>
                                    <input
                                        value={newImgProduct}
                                        onChange={(e) => setNewImgProduct(e.target.value)}
                                        className="w-full text-xs sm:text-sm border-0 outline-0"
                                        type="text"
                                        placeholder="عکس جدید محصول را وارد کنید "
                                    />
                                </div>
                                <div
                                    className="flex gap-3 p-3 rounded-2xl bg-white overflow-hidden text-sm font-Modam-SemiBold">
                                    <Heart className="sm:w-6 sm:h-6 w-5 h-5 text-primaryColor"/>
                                    <input
                                        value={newpPopularityProduct}
                                        onChange={(e) => setNewPopularityProduct(e.target.value)}
                                        className="w-full text-xs sm:text-sm border-0 outline-0"
                                        type="text"
                                        placeholder="میزان محبوبیت محصول را وارد کنید "
                                    />
                                </div>
                                <div
                                    className="flex gap-3 p-3 rounded-2xl bg-white overflow-hidden text-sm font-Modam-SemiBold">
                                    <Chart className="sm:w-6 sm:h-6 w-5 h-5 text-primaryColor"/>
                                    <input
                                        value={newSaleProduct.toLocaleString()}
                                        onChange={(e) => setNewSaleProduct(e.target.value)}
                                        className="w-full text-xs sm:text-sm border-0 outline-0"
                                        type="text"
                                        placeholder="میزان فروش جدید محصول را وارد کنید "
                                    />
                                </div>
                                <div
                                    className="flex gap-3 p-3 rounded-2xl bg-white overflow-hidden text-sm font-Modam-SemiBold">
                                    <Swatch className="sm:w-6 sm:h-6 w-5 h-5 text-primaryColor"/>
                                    <input
                                        value={newColorsProduct}
                                        onChange={(e) => setNewColorsProduct(e.target.value)}
                                        className="w-full text-xs sm:text-sm border-0 outline-0"
                                        type="text"
                                        placeholder=" تعداد رنگ جدید محصول را وارد کنید "
                                    />
                                </div>

                            </form>
                        </EditeModal>
                    )
                }
                {
                    showModal && <AlertModal text="محصول با موفقیت ویرایش شد"/>
                }
                {
                    showModalDelSuccess && <AlertModal text="محصول با موفقیت حذف شد"/>
                }


            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    ) : (
        <ErrorBox message="محصولی یافت نشد "/>
    )
};

export default ProductTable;


