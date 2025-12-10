/**
 * Main Application Script
 * Handles rendering of components and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    renderKPIGrid();
    renderSmartAlerts();
    renderInventoryTable();
    lucide.createIcons();
});

// --- KPIGrid Component ---
function renderKPIGrid() {
    const container = document.getElementById('kpi-grid');
    if (!container) return;

    container.innerHTML = window.MockData.kpiData.map((kpi, index) => {
        const trendIcon = kpi.status === 'positive' ? 'arrow-up-right' :
            kpi.status === 'negative' ? 'arrow-down-right' : 'minus';

        const statusColors = kpi.status === 'positive' ? "bg-green-50 text-green-700" :
            kpi.status === 'negative' ? "bg-red-50 text-red-700" :
                "bg-gray-50 text-gray-700";

        const trendColor = kpi.status === 'positive' ? '#10B981' :
            kpi.status === 'negative' ? '#EF4444' : '#6B7280';

        // We will render the sparkline separately after insertion
        const chartId = `sparkline-${kpi.id}`;

        return `
            <div class="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                <!-- Background Sparkline Wrapper -->
                <div class="absolute inset-x-0 bottom-0 h-16 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <canvas id="${chartId}"></canvas>
                </div>

                <div class="relative z-10 flex justify-between items-start">
                    <div>
                        <p class="text-sm font-medium text-gray-500 mb-1">${kpi.label}</p>
                        <h3 class="text-3xl font-bold text-gray-900 tracking-tight">${kpi.value}</h3>
                    </div>

                    <div class="${statusColors} px-2.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold">
                        <i data-lucide="${trendIcon}" class="w-3.5 h-3.5"></i>
                        <span>${Math.abs(kpi.change)}%</span>
                    </div>
                </div>

                <p class="relative z-10 mt-4 text-xs text-gray-400">
                    vs last month
                </p>
            </div>
        `;
    }).join('');

    // Initialize Sparklines
    window.MockData.kpiData.forEach(kpi => {
        const ctx = document.getElementById(`sparkline-${kpi.id}`).getContext('2d');
        const color = kpi.status === 'positive' ? '#10B981' : kpi.status === 'negative' ? '#EF4444' : '#6B7280';

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: kpi.trend.map((_, i) => i),
                datasets: [{
                    data: kpi.trend,
                    borderColor: color,
                    backgroundColor: color, // For area effect
                    borderWidth: 2,
                    fill: 'start',
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    });
}

// --- SmartAlerts Component ---
function renderSmartAlerts() {
    const container = document.getElementById('smart-alerts');
    if (!container) return;

    let alerts = [...window.MockData.alertsData];

    function render() {
        if (alerts.length === 0) {
            container.innerHTML = '';
            return;
        }

        const alertsHtml = alerts.map(alert => {
            const styles = alert.type === 'critical' ? "bg-red-50 border-left-red-500 text-red-900" :
                alert.type === 'warning' ? "bg-amber-50 border-amber-500 text-amber-900" :
                    "bg-blue-50 border-blue-500 text-blue-900";

            const icon = alert.type === 'critical' ? 'alert-triangle' :
                alert.type === 'warning' ? 'trending-down' : 'info';

            const iconColor = alert.type === 'critical' ? 'text-red-600' :
                alert.type === 'warning' ? 'text-amber-600' : 'text-blue-600';

            const title = alert.type === 'critical' ? 'Action Required' : alert.type === 'warning' ? 'Warning' : 'Info';

            return `
                <div class="relative p-4 rounded-xl border-l-4 pr-10 transition-all duration-300 ${styles} mb-4 animate-fade-in-up">
                    <div class="flex gap-3">
                        <div class="mt-0.5 shrink-0">
                            <i data-lucide="${icon}" class="w-5 h-5 ${iconColor}"></i>
                        </div>
                        <div>
                            <p class="text-sm font-semibold">${title}</p>
                            <p class="text-sm opacity-90 leading-relaxed mt-1">${alert.message}</p>
                            ${alert.type === 'critical' ? `
                                <button class="mt-3 text-xs font-bold bg-white/50 hover:bg-white px-3 py-1.5 rounded-lg transition-colors border border-red-200">
                                    Review Stock
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    <button class="dismiss-btn absolute top-3 right-3 opacity-40 hover:opacity-100 transition-opacity" data-id="${alert.id}">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span class="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    Smart Alerts
                </h3>
                <div class="space-y-0"> 
                    ${alertsHtml}
                </div>
            </div>
        `;

        lucide.createIcons();

        // Add Event Listeners for Dismiss
        document.querySelectorAll('.dismiss-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                alerts = alerts.filter(a => a.id !== id);
                render();
            });
        });
    }

    render();
}

// --- InventoryTable Component ---
function renderInventoryTable() {
    const container = document.getElementById('inventory-table-container');
    if (!container) return;

    const rows = window.MockData.inventoryData.map(item => {
        const badgeClass = item.status === 'Optimal' ? "bg-green-50 text-green-700 border-green-200" :
            item.status === 'Low' ? "bg-amber-50 text-amber-700 border-amber-200" :
                item.status === 'Warning' ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-red-50 text-red-700 border-red-200";

        return `
            <tr class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-6 py-4 font-medium text-gray-900">${item.item}</td>
                <td class="px-6 py-4">${item.category}</td>
                <td class="px-6 py-4">${item.stock}</td>
                <td class="px-6 py-4">
                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeClass}">
                        ${item.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button class="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100">
                        <i data-lucide="more-horizontal" class="w-5 h-5"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 class="text-lg font-bold text-gray-900">Inventory Status</h3>
                <button class="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-gray-600">
                    <thead class="bg-gray-50/50">
                        <tr>
                            <th class="px-6 py-4 font-semibold text-gray-900">Item</th>
                            <th class="px-6 py-4 font-semibold text-gray-900">Category</th>
                            <th class="px-6 py-4 font-semibold text-gray-900">Stock</th>
                            <th class="px-6 py-4 font-semibold text-gray-900">Status</th>
                            <th class="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${rows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
