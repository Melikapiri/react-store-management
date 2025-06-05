import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const data = [
    { value: 100 }, { value: 130 }, { value: 115 },
    { value: 150 }, { value: 140 }, { value: 160 },
];

export default function FancyCard({ title, count, percent, positive }) {
    const color = positive ? "text-green-500" : "text-red-500";
    const ArrowIcon = positive ? ArrowUpRight : ArrowDownRight;

    return (
        <motion.div
            className="bg-white rounded-2xl p-4 shadow-xl  hover:scale-[1.02] transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">{title}</h3>
                <div className={`flex items-center gap-1 ${color} font-medium`}>
                    <ArrowIcon size={18} />
                    <span>{percent}%</span>
                </div>
            </div>

            <div className="text-xl sm:text-3xl font-extrabold mt-2 text-gray-800">{count}</div>

            <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={positive ? "#10b981" : "#ef4444"}
                            strokeWidth={2.5}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
