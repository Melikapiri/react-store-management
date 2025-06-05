import React from "react";
import BagIcon from "../../Icons/BagIcon";
import UsersIcon from "../../Icons/UsersIcon";
import Chart from "../../Icons/Chart";
import ProductIcon from "../../Icons/ProductIcon";
import {LineChart, Line, ResponsiveContainer} from 'recharts';
import FancyCard from "../OverviewCard/OverviewCard";


const data = [
    {value: 100}, {value: 120}, {value: 110},
    {value: 130}, {value: 125}, {value: 140},
];

const Statistics = () => {
    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10 ">
            <FancyCard title="تعداد کاربران" count="1,566" percent={8} positive/>
            <FancyCard title="تعداد محصولات" count="3,256" percent={16} positive/>
            <FancyCard title="تعداد سفارشات" count="1,800" percent={5}/>
            <FancyCard title="جمع کل سفارش ها" count="4,766" percent={11} positive/>
        </div>
    );
};

export default Statistics;