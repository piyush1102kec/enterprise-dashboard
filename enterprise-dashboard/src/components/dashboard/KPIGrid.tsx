import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { kpiData } from '../../lib/mockData';
import { cn } from '../../lib/utils';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export function KPIGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi) => (
                <div
                    key={kpi.id}
                    className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                    {/* Background Sparkline - very subtle */}
                    <div className="absolute inset-x-0 bottom-0 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={kpi.trend.map((val, i) => ({ i, val }))}>
                                <Area
                                    type="monotone"
                                    dataKey="val"
                                    stroke={kpi.status === 'positive' ? '#10B981' : kpi.status === 'negative' ? '#EF4444' : '#6B7280'}
                                    fill={kpi.status === 'positive' ? '#10B981' : kpi.status === 'negative' ? '#EF4444' : '#6B7280'}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{kpi.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{kpi.value}</h3>
                        </div>

                        <div className={cn(
                            "px-2.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold",
                            kpi.status === 'positive' ? "bg-green-50 text-green-700" :
                                kpi.status === 'negative' ? "bg-red-50 text-red-700" :
                                    "bg-gray-50 text-gray-700"
                        )}>
                            {kpi.status === 'positive' ? <ArrowUpRight className="w-3.5 h-3.5" /> :
                                kpi.status === 'negative' ? <ArrowDownRight className="w-3.5 h-3.5" /> :
                                    <Minus className="w-3.5 h-3.5" />}
                            <span>{Math.abs(kpi.change)}%</span>
                        </div>
                    </div>

                    <p className="relative z-10 mt-4 text-xs text-gray-400">
                        vs last month
                    </p>
                </div>
            ))}
        </div>
    );
}
