import React, { useEffect, useState } from "react";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ProductTable from "../../Components/ProductTable/ProductTable";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import PageTitle from "../../Components/PageTitle/PageTitle";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import Loader from "../../Components/Loader/Loader";

const Products = () => {
    const [allProduct, setAllProduct] = useState([]);
    const [loading, setLoading] = useState(true);


    const getAllProduct = async () => {
        try {
            const res = await fetch(`https://dashboard-admin-react1-default-rtdb.firebaseio.com/products.json`);

            if (!res.ok) {
                throw new Error("خطا در گرفتن داده‌ها");
            }

            const data = await res.json();
            if (!data) return [];

            const arrayProduct = Object.entries(data).map(([id, product]) => ({
                id,
                ...product
            }));

            setLoading(false);
            return arrayProduct;
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
            return [];
        }
    };

    const fetchAllProducts = async () => {
        try {
            const products = await getAllProduct();
            setAllProduct(products);
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <div className="flex flex-col gap-5 p-2 lg:p-4 ">
            <AddProduct getAllProduct={getAllProduct} fetchAllProducts={fetchAllProducts}/>
            <PageTitle title="Products" />


            {loading ? (
               <Loader/>
            ) : allProduct.length === 0 ? (
                <ErrorBox message="محصولی یافت نشد" />
            ) : (
                <ProductTable
                    getAllProduct={getAllProduct}
                    fetchAllProducts={fetchAllProducts}
                    allProduct={allProduct}
                />
            )}


        </div>
    );
};

export default Products;
