'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Eye,
    BarChart2,
    FileText,
    Settings,
    LifeBuoy,
    LogOut
} from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
    { name: 'Market', href: '/', icon: LayoutDashboard },
    { name: 'Watchlist', href: '/watchlist', icon: Eye },
    { name: 'Screener', href: '/screener', icon: BarChart2 },
    { name: 'News', href: '/news', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex h-screen w-64 bg-slate-900 text-white flex-col fixed left-0 top-0 shadow-xl z-20">
            <div className="p-6 border-b border-slate-800 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">S</div>
                <span className="text-xl font-bold tracking-tight">Stock.io</span>
            </div>

            <nav className="flex-1 overflow-y-auto py-6">
                <div className="px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <Icon className={clsx(
                                    "w-5 h-5",
                                    isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                )} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8 px-6">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Support</p>
                    <button
                        className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
                        <LifeBuoy className="w-5 h-5" />
                        <span>Help Center</span>
                    </button>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-all">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}
