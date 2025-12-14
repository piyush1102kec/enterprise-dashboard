'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TooltipItem,
    Scale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { stockHistory } from '@/lib/data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function TrendChart() {
    const labels = stockHistory.map(d => d.name);
    const stockData = stockHistory.map(d => d.value);
    const predictionData = stockHistory.map(d => d.prediction);

    const data = {
        labels,
        datasets: [
            {
                label: 'AAPL Price',
                data: stockData,
                borderColor: '#2563EB', // Blue-600
                backgroundColor: '#2563EB',
                borderWidth: 3,
                tension: 0.1,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#2563EB',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                spanGaps: false
            },
            {
                label: 'AI Forecast',
                data: predictionData,
                borderColor: '#10B981', // Green for prediction
                backgroundColor: '#10B981',
                borderWidth: 3,
                borderDash: [5, 5],
                tension: 0.1,
                pointRadius: 0,
                pointHoverRadius: 4,
                zIndex: -1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 8
                }
            },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#111827',
                bodyColor: '#374151',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 10,
                boxPadding: 3,
                usePointStyle: true,
                callbacks: {
                    label: function (context: TooltipItem<'line'>) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 5 }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#9CA3AF'
                }
            },
            y: {
                grid: {
                    color: '#F3F4F6'
                },
                ticks: {
                    color: '#9CA3AF',
                    callback: function (value: string | number) {
                        return '$' + value;
                    }
                },
                border: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Price Forecast (AAPL)</h3>
                    <p className="text-sm text-gray-500">AI-powered predictive analytics for next hours</p>
                </div>
                <select
                    className="bg-gray-50 border-none text-sm text-gray-600 font-medium rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
                    <option>1 Day</option>
                    <option>1 Week</option>
                    <option>1 Month</option>
                </select>
            </div>
            <div className="flex-1 w-full min-h-0 relative">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
