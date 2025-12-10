import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar />
            <Header />

            {/* Main Content Area */}
            <main className="md:pl-64 pt-16 min-h-screen transition-all duration-300">
                <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </div>
            </main>
        </div>
    );
}
