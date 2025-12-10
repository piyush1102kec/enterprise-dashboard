import { MoreHorizontal } from 'lucide-react';
import { inventoryData } from '../../lib/mockData';
import { cn } from '../../lib/utils';

export function InventoryTable() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Inventory Status</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-900">Item</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Category</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Stock</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {inventoryData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.item}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.stock}</td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-semibold border",
                                        item.status === 'Optimal' ? "bg-green-50 text-green-700 border-green-200" :
                                            item.status === 'Low' ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                item.status === 'Warning' ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                    "bg-red-50 text-red-700 border-red-200"
                                    )}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
