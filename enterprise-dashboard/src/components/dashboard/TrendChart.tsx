import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { salesData } from '../../lib/mockData';

export function TrendChart() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Revenue & Forecast</h3>
                    <p className="text-sm text-gray-500">AI-powered predictive analytics for upcoming week</p>
                </div>
                <select className="bg-gray-50 border-none text-sm text-gray-600 font-medium rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                </select>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }}
                            formatter={(value: any) => [`$${value}`, '']}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />

                        {/* Historical Data */}
                        <Line
                            name="Revenue"
                            type="monotone"
                            dataKey="value"
                            stroke="#2563EB"
                            strokeWidth={3}
                            dot={{ fill: '#2563EB', strokeWidth: 2, r: 4, stroke: '#fff' }}
                            activeDot={{ r: 6, stroke: '#BFDBFE', strokeWidth: 6 }}
                        />

                        {/* Predictive Data - Dashed Line */}
                        <Line
                            name="AI Prediction"
                            type="monotone"
                            dataKey="prediction"
                            stroke="#93C5FD"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            dot={false}
                            activeDot={{ r: 6, fill: '#93C5FD' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
