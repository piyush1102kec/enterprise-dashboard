import { DashboardLayout } from './components/layout/DashboardLayout';
import { KPIGrid } from './components/dashboard/KPIGrid';
import { TrendChart } from './components/dashboard/TrendChart';
import { SmartAlerts } from './components/dashboard/SmartAlerts';
import { InventoryTable } from './components/dashboard/InventoryTable';

function App() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Alex. Here's what's happening today.</p>
        </div>

        <KPIGrid />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <TrendChart />
          </div>
          <div className="space-y-6">
            <SmartAlerts />
          </div>
        </div>

        <div className="pt-2">
          <InventoryTable />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;
