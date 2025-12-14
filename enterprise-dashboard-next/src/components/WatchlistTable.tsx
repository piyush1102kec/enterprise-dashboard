import { watchlistData } from '@/lib/data';
import clsx from 'clsx';
import Link from 'next/link';

export default function WatchlistTable() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Market Movers & Watchlist</h3>
                <Link href="/watchlist" className="text-sm font-medium text-blue-600 hover:text-blue-700">View Full List</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-900">Ticker</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Company</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Price</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Change</th>
                            <th className="px-6 py-4 font-semibold text-gray-900 text-right">Signal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {watchlistData.map((item) => {
                            const isPositive = item.status.includes('+');
                            const badgeClass = clsx(
                                "px-2.5 py-1 rounded-full text-xs font-semibold border",
                                isPositive ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                            );

                            return (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-gray-900">{item.item}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                    <td className="px-6 py-4 font-mono">{item.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={badgeClass}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-xs text-gray-400 font-medium">{item.lastOrdered}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
