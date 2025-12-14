import KPIGrid from '@/components/KPIGrid';
import TrendChart from '@/components/TrendChart';
import SmartAlerts from '@/components/SmartAlerts';
import WatchlistTable from '@/components/WatchlistTable';

export default function Home() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Stock Market & Predictions</h1>
        <p className="text-gray-500">Real-time market analysis and AI-driven forecasts.</p>
      </div>

      {/* KPI Grid */}
      <KPIGrid />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Trend Chart */}
          <TrendChart />
        </div>
        <div className="space-y-6">
          {/* Smart Alerts */}
          <SmartAlerts />
        </div>
      </div>

      <div className="pt-2">
        {/* Inventory (Watchlist) Table */}
        <WatchlistTable />
      </div>
    </div>
  );
}
