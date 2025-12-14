import WatchlistTable from '@/components/WatchlistTable';

export default function WatchlistPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Watchlist</h1>
                <p className="text-gray-500">Track your favorite stocks and get real-time price alerts.</p>
            </div>

            {/* Watchlist Table */}
            <WatchlistTable />
        </div>
    );
}
