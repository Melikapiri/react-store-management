import React, { useState } from "react";
import Pencil from "../../Icons/Pencil";
import ArchiveBox from "../../Icons/ArchiveBox";
import Dollar from "../../Icons/Dollar";
import UploadImg from "../../Icons/UploadImg";
import Chart from "../../Icons/Chart";
import Heart from "../../Icons/Heart";
import Swatch from "../../Icons/Swatch";
import Photo from "../../Icons/Photo";
import AlertModal from "../AlertModal/AlertModal";

const AddProduct = ({ fetchAllProducts, getAllProduct }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [count, setCount] = useState("");
    const [img, setImg] = useState("");
    const [popularity, setPopularity] = useState("");
    const [sale, setSale] = useState("");
    const [colors, setColors] = useState("");
    const [category, setCategory] = useState("");
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [showAlertSuccessAdd, setShowAlertSuccessAdd] = useState(false);
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        let newErrors = {};

        if (!title.trim()) newErrors.title = "نام محصول الزامی است.";
        if (!price || isNaN(price) || Number(price) <= 0) newErrors.price = "قیمت معتبر وارد کنید.";
        if (!count || isNaN(count) || Number(count) < 0) newErrors.count = "موجودی معتبر وارد کنید.";
        if (!img.trim() || !/^(https?:\/\/.+|\s*data:.+)$/i.test(img)) {
            newErrors.img = "لینک معتبر تصویر وارد کنید.";
        }
        if (!popularity || isNaN(popularity) || popularity < 0 || popularity > 100) {
            newErrors.popularity = "محبوبیت باید بین ۰ تا ۱۰۰ باشد.";
        }
        if (!sale || isNaN(sale) || Number(sale) < 0) newErrors.sale = "میزان فروش معتبر وارد کنید.";
        if (!colors || isNaN(colors) || Number(colors) < 1) newErrors.colors = "تعداد رنگ معتبر وارد کنید.";
        if (!category || category === "-1") newErrors.category = "دسته‌بندی را انتخاب کنید.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addProduct = (event) => {
        event.preventDefault();

        if (!validateInputs()) {
            setShowAlertModal(true);
            setTimeout(() => setShowAlertModal(false), 4000);
            return;
        }

        const newProduct = {
            title,
            price,
            count,
            img,
            popularity,
            sale,
            colors,
            categoryID: category,
        };

        fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/products.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
            .then((res) => res.json())
            .then(() => {
                getAllProduct();
                fetchAllProducts();
                setTitle("");
                setPrice("");
                setCount("");
                setImg("");
                setPopularity("");
                setSale("");
                setColors("");
                setCategory("");
                setErrors({});
                setShowAlertSuccessAdd(true);
                setTimeout(() => {
                    setShowAlertSuccessAdd(false);
                }, 3000);
            });
    };

    return (
        <div className="w-full px-4 py-4 md:py-6 border-4 border-primaryColor rounded-xl bg-skyBlue">
            <h3 className="inline-block text-white pr-2 pb-2 border-r-2 border-b-2 rounded-br-[18px] border-r-primaryColor border-b-primaryColor font-Modam-bold text-lg lg:text-xl">
                افزودن محصول جدید
            </h3>

            <form className="lg:p-2 mt-4" onSubmit={addProduct}>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4">

                    {/* Title */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 p-3 rounded-2xl bg-white text-sm font-Modam-SemiBold">
                            <Pencil className="w-5 h-5 sm:w-6 sm:h-6 text-primaryColor" />
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-xs sm:text-sm border-0 outline-0"
                                type="text"
                                placeholder="نام محصول را وارد کنید"
                            />
                        </div>
                        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                    </div>

                    {/* Count */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 p-3 rounded-2xl bg-white text-sm font-Modam-SemiBold">
                            <ArchiveBox className="w-5 h-5 sm:w-6 sm:h-6 text-primaryColor" />
                            <input
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                                className="w-full text-xs sm:text-sm border-0 outline-0"
                                type="number"
                                placeholder="موجودی محصول را وارد کنید"
                            />
                        </div>
                        {errors.count && <p className="text-red-500 text-xs">{errors.count}</p>}
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 p-3 rounded-2xl bg-white text-sm font-Modam-SemiBold">
                            <Dollar className="w-5 h-5 sm:w-6 sm:h-6 text-primaryColor" />
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full text-xs sm:text-sm border-0 outline-0"
                                type="number"
                                placeholder="قیمت محصول را وارد کنید"
                            />
                        </div>
                        {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-1">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="p-3 rounded-2xl bg-white text-sm font-Modam-SemiBold text-gray-900"
                        >
                            <option value="-1">دسته‌بندی محصول را انتخاب کنید</option>
                            <option value="1">گوشی</option>
                            <option value="2">لپتاپ</option>
                            <option value="3">عمومی</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
                    </div>

                    {/* Sale */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 p-3 rounded-2xl bg-white text-sm font-Modam-SemiBold">
                            <Chart className="w-5 h-5 sm:w-6 sm:h-6 text-primaryColor" />
                            <input
                                value={sale}
                                onChange={(e) => setSale(e.target.value)}
                                className="w-full text-xs sm:text-sm border-0 outline-0"
                                type="number"
                                placeholder="میزان فروش محصول را وارد کنید"
                            />
                        </div>
                        {errors.sale && <p className="text-red-500 text-xs">{errors.sale}</p>}
                    </div>

                    {/* Popularity */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 p-3 rounded-2xl bg-white text-sm font-Modam-SemiBold">
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primaryColor" />
                            <input
                                value={popularity}
                                onChange={(e) => setPopularity(e.target.value)}
                                className="w-full text-xs sm:text-sm border-0 outline-0"
                                type="number"
                                placeholder="محبوبیت محصول (0 تا 100)"
                            />
                        </div>
                        {errors.popularity && <p className="text-red-500 text-xs">{errors.popularity}</p>}
                    </div>

                    {/* Colors */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 p-3 rounded-2xl bg-white text-sm font-Modam-SemiBold">
                            <Swatch className="w-5 h-5 sm:w-6 sm:h-6 text-primaryColor" />
                            <input
                                value={colors}
                                onChange={(e) => setColors(e.target.value)}
                                className="w-full text-xs sm:text-sm border-0 outline-0"
                                type="number"
                                placeholder="تعداد رنگبندی محصول"
                            />
                        </div>
                        {errors.colors && <p className="text-red-500 text-xs">{errors.colors}</p>}
                    </div>

                    {/* Image */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 p-3 rounded-2xl bg-white text-sm font-Modam-SemiBold">
                            <Photo className="w-5 h-5 sm:w-6 sm:h-6 text-primaryColor" />
                            <input
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                                className="w-full text-xs sm:text-sm border-0 outline-0"
                                type="text"
                                placeholder="آدرس URL عکس محصول"
                            />
                        </div>
                        {errors.img && <p className="text-red-500 text-xs">{errors.img}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 py-2 px-4 rounded-3xl bg-sky-950 text-white font-Modam-Regular text-sm tracking-tight"
                >
                    ثبت محصول
                </button>
            </form>

            {showAlertModal && <AlertModal text="مقادیر را به درستی وارد کنید!" />}
            {showAlertSuccessAdd && <AlertModal text="محصول با موفقیت اضافه شد" />}
        </div>
    );
};

export default AddProduct;
