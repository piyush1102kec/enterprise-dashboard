import { Bell, Search } from 'lucide-react';

export function Header() {
    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 right-0 left-64 z-10 px-8 flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-4 w-full max-w-xl">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Ask anything... e.g., 'Show low-stock items in Delhi'"
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all outline-none text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200"></div>

                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-gray-900">Alex Morgan</p>
                        <p className="text-xs text-gray-500">Ops Manager</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        AM
                    </div>
                </div>
            </div>
        </header>
    );
}
