export default function NewsPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Market News</h1>
                <p className="text-gray-500">Latest financial headlines and market moving stories.</p>
            </div>

            <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Technology</span>
                    <h3 className="text-lg font-bold mt-2 text-gray-900">Tech Stocks Rally Ahead of Earnings</h3>
                    <p className="text-gray-500 mt-1 text-sm">Major tech giants are expected to report strong Q4 earnings...</p>
                    <div className="mt-4 text-xs text-gray-400">2 hours ago • Wall St Journal</div>
                </div>
                {/* More news items could be added here */}
            </div>
        </div>
    );
}
