import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const salesData = [
    { month: "فروردین", value: 1200 },
    { month: "اردیبهشت", value: 1900 },
    { month: "خرداد", value: 1700 },
    { month: "تیر", value: 2100 },
    { month: "مرداد", value: 2500 },
    { month: "شهریور", value: 2300 },

];

const MonthlySalesChart = () => {
    return (
        <div className="w-full bg-white  py-3 shadow-xl border border-primaryColor/20  mx-auto mt-6 rounded-xl mb-4 overflow-x-hidden" >
            <h2 className=" text-base  xs:text-lg sm:text-xl font-Modam-SemiBold  text-center text-gray-700 mb-2 sm:mb-4 ">
                نمودار فروش 6 ماه اخیر
            </h2>

            <div className="w-full h-[180px] xs:h-[300px] sm:h-[300px] relative xs:static right-[30px] xs:right-0 xs:pr-[30px]">
                <ResponsiveContainer   className="w-full " width="100%" height="100%">
                    <LineChart
                        data={salesData}
                        margin={{top: 10, right: 0, left: 0, bottom: 0}} // بدون فضای اضافه در اطراف
                    >
                        <CartesianGrid width="100%"  strokeDasharray="3 3"/>
                        <XAxis
                            dataKey="month"
                            tick={{fontSize: 12, fontFamily: "inherit"}}
                            stroke="#1F2732"
                            interval={0}
                        />
                        <YAxis
                            tick={{fontSize: 12, fontFamily: "inherit"}}
                            stroke="#1F2732"
                        />
                        <Tooltip
                            contentStyle={{fontFamily: "inherit", fontSize: "14px"}}
                            labelFormatter={(label) => `ماه: ${label}`}
                            formatter={(value) => [`${value.toLocaleString()} تومان`, "فروش"]}
                        />
                        <Line

                            type="monotone"
                            dataKey="value"
                            stroke="#1F2732"
                            strokeWidth={3}
                            dot={{ r: 4, stroke: "#3b82f6", strokeWidth: 2, fill: "white" }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>    );
};

export default MonthlySalesChart;