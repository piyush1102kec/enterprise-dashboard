import { LayoutDashboard, ShoppingCart, Package, BarChart2, Settings, LifeBuoy, LogOut } from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: ShoppingCart, label: 'Orders', active: false },
    { icon: Package, label: 'Inventory', active: false },
    { icon: BarChart2, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
];

export function Sidebar() {
    return (
        <div className="hidden md:flex h-screen w-64 bg-slate-900 text-white flex-col fixed left-0 top-0 shadow-xl z-20">
            <div className="p-6 border-b border-slate-800 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">E</div>
                <span className="text-xl font-bold tracking-tight">Enterprise.io</span>
            </div>

            <nav className="flex-1 overflow-y-auto py-6">
                <div className="px-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${item.active
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 px-6">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Support</p>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
                        <LifeBuoy className="w-5 h-5" />
                        <span>Help Center</span>
                    </button>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-all">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}
