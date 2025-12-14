'use client';

import { useState } from 'react';
import { AlertTriangle, TrendingDown, Info, X } from 'lucide-react';
import { marketAlerts as initialAlerts } from '@/lib/data';

export default function SmartAlerts() {
    const [alerts, setAlerts] = useState(initialAlerts);

    const dismissAlert = (id: number) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    if (alerts.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                Market Insights
            </h3>
            <div className="space-y-0">
                {alerts.map((alert) => {
                    const isCritical = alert.type === 'critical';
                    const isWarning = alert.type === 'warning';
                    // const isInfo = alert.type === 'info';

                    const styles = isCritical ? "bg-red-50 border-left-red-500 text-red-900" :
                        isWarning ? "bg-amber-50 border-amber-500 text-amber-900" :
                            "bg-blue-50 border-blue-500 text-blue-900";

                    const title = isCritical ? 'Action Required' : isWarning ? 'Warning' : 'Info';

                    return (
                        <div key={alert.id} className={`relative p-4 rounded-xl border-l-4 pr-10 transition-all duration-300 ${styles} mb-4 animate-fade-in-up`}>
                            <div className="flex gap-3">
                                <div className="mt-0.5 shrink-0">
                                    {isCritical && <AlertTriangle className="w-5 h-5 text-red-600" />}
                                    {isWarning && <TrendingDown className="w-5 h-5 text-amber-600" />}
                                    {!isCritical && !isWarning && <Info className="w-5 h-5 text-blue-600" />}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{title}</p>
                                    <p className="text-sm opacity-90 leading-relaxed mt-1">{alert.message}</p>
                                    {isCritical && (
                                        <button className="mt-3 text-xs font-bold bg-white/50 hover:bg-white px-3 py-1.5 rounded-lg transition-colors border border-red-200">
                                            Review Stock
                                        </button>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => dismissAlert(alert.id)}
                                className="absolute top-3 right-3 opacity-40 hover:opacity-100 transition-opacity">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
