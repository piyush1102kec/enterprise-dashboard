'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { kpiData } from '@/lib/data';
import clsx from 'clsx';

// Register necessary elements (duplication is safe)
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler
);

export default function KPIGrid() {
    return (
        <div id="kpi-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi) => {
                const isPositive = kpi.status === 'positive';
                const isNegative = kpi.status === 'negative';
                const isNeutral = kpi.status === 'neutral'; // Assuming neutral is a status

                const statusColors = clsx(
                    "px-2.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold",
                    {
                        "bg-green-50 text-green-700": isPositive,
                        "bg-red-50 text-red-700": isNegative,
                        "bg-gray-50 text-gray-700": !isPositive && !isNegative,
                    }
                );

                const chartColor = isPositive ? '#10B981' : isNegative ? '#EF4444' : '#6B7280';

                const chartData = {
                    labels: kpi.trend.map((_, i) => i),
                    datasets: [{
                        data: kpi.trend,
                        borderColor: chartColor,
                        backgroundColor: chartColor, // Area
                        borderWidth: 2,
                        fill: 'start',
                        tension: 0.4,
                        pointRadius: 0
                    }]
                };

                const chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                };

                return (
                    <div key={kpi.id} className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                        {/* Background Sparkline Wrapper */}
                        <div className="absolute inset-x-0 bottom-0 h-16 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                            <Line data={chartData} options={chartOptions} />
                        </div>

                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{kpi.label}</p>
                                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{kpi.value}</h3>
                            </div>

                            <div className={statusColors}>
                                {isPositive && <ArrowUpRight className="w-3.5 h-3.5" />}
                                {isNegative && <ArrowDownRight className="w-3.5 h-3.5" />}
                                {isNeutral && <Minus className="w-3.5 h-3.5" />}
                                <span>{Math.abs(kpi.change)}%</span>
                            </div>
                        </div>

                        <p className="relative z-10 mt-4 text-xs text-gray-400">
                            since yesterday
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
