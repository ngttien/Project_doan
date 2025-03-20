import React, { useState } from "react";
import Styles from "./revenue.module.scss";
import classNames from "classnames/bind";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const cx = classNames.bind(Styles);

const data = {
    "2023": [
        { month: "Tháng 1", revenue: 120 },
        { month: "Tháng 2", revenue: 180 },
        { month: "Tháng 3", revenue: 90 },
        { month: "Tháng 4", revenue: 130 },
        { month: "Tháng 5", revenue: 200 },
        { month: "Tháng 6", revenue: 320 },
        { month: "Tháng 7", revenue: 500 },
        { month: "Tháng 8", revenue: 600 },
        { month: "Tháng 9", revenue: 650 },
        { month: "Tháng 10", revenue: 300 },
        { month: "Tháng 11", revenue: 120 },
        { month: "Tháng 12", revenue: 100 }
    ],
    "2024": [
        { month: "Tháng 1", revenue: 150 },
        { month: "Tháng 2", revenue: 200 },
        { month: "Tháng 3", revenue: 100 },
        { month: "Tháng 4", revenue: 180 },
        { month: "Tháng 5", revenue: 250 },
        { month: "Tháng 6", revenue: 350 },
        { month: "Tháng 7", revenue: 550 },
        { month: "Tháng 8", revenue: 700 },
        { month: "Tháng 9", revenue: 750 },
        { month: "Tháng 10", revenue: 400 },
        { month: "Tháng 11", revenue: 180 },
        { month: "Tháng 12", revenue: 150 }
    ]
};

const RevenueChart = () => {
    const [selectedYear, setSelectedYear] = useState("2023");

    return (
        <div className={cx("chart_container")}>
            <h2>📊 Doanh thu theo tháng</h2>
            <label>Thời gian: </label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="2023">Năm 2023</option>
                <option value="2024">Năm 2024</option>
            </select>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data[selectedYear]} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
