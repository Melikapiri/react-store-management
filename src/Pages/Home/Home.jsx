import React, {useEffect, useState} from "react";
import Statistics from "../../Components/Statistics/Statistics";
import MonthlySalesChart from "../../Components/MonthlySalesChart/MonthlySalesChart";
import RecentOrderList from "../../Components/RecentOrderList/RecentOrderList";
import RecommendedProducts from "../../Components/RecommendedProducts/RecommendedProducts";
import AlertModal from "../../Components/AlertModal/AlertModal";

const Home = () => {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const hasSeenModal = localStorage.getItem("hasSeenFirebaseModal");

        if (!hasSeenModal) {
            setShowModal(true);
            localStorage.setItem("hasSeenFirebaseModal", "true");

            setTimeout(() => {
                setShowModal(false);
            }, 5000);
        }
    }, []);
    return (
        <div className="p-3 ">
            <Statistics/>
            <MonthlySalesChart/>
            <div className="flex flex-col lg:flex-row gap-3 my-6 ">
                <RecentOrderList/>
                <RecommendedProducts/>
            </div>


            {
                showModal && <AlertModal text="این سایت برای بارگذاری داده‌ها از Firebase استفاده می‌کند. لطفاً VPN خود را فعال کنید.
"/>
            }
        </div>


    );
};

export default Home;