import { AlertTriangle, TrendingDown, Info, X } from 'lucide-react';
import { alerts } from '../../lib/mockData';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function SmartAlerts() {
    const [dismissed, setDismissed] = useState<number[]>([]);

    const activeAlerts = alerts.filter(a => !dismissed.includes(a.id));

    if (activeAlerts.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                Smart Alerts
            </h3>

            <div className="space-y-4">
                {activeAlerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={cn(
                            "relative p-4 rounded-xl border-l-4 pr-10 transition-all duration-300",
                            alert.type === 'critical' ? "bg-red-50 border-left-red-500 text-red-900" :
                                alert.type === 'warning' ? "bg-amber-50 border-amber-500 text-amber-900" :
                                    "bg-blue-50 border-blue-500 text-blue-900"
                        )}
                    >
                        <div className="flex gap-3">
                            <div className="mt-0.5 shrink-0">
                                {alert.type === 'critical' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                                    alert.type === 'warning' ? <TrendingDown className="w-5 h-5 text-amber-600" /> :
                                        <Info className="w-5 h-5 text-blue-600" />}
                            </div>
                            <div>
                                <p className="text-sm font-semibold">
                                    {alert.type === 'critical' ? 'Action Required' : alert.type === 'warning' ? 'Warning' : 'Info'}
                                </p>
                                <p className="text-sm opacity-90 leading-relaxed mt-1">
                                    {alert.message}
                                </p>

                                {alert.type === 'critical' && (
                                    <button className="mt-3 text-xs font-bold bg-white/50 hover:bg-white px-3 py-1.5 rounded-lg transition-colors border border-red-200">
                                        Review Stock
                                    </button>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => setDismissed([...dismissed, alert.id])}
                            className="absolute top-3 right-3 opacity-40 hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
