// Mock Data for the Dashboard

const kpiData = [
    {
        id: "total-revenue",
        label: "Total Revenue",
        value: "$124,500",
        change: 12.5,
        status: "positive",
        trend: [100, 110, 105, 115, 120, 124],
    },
    {
        id: "active-orders",
        label: "Active Orders",
        value: 45,
        change: -2.4,
        status: "neutral",
        trend: [40, 42, 45, 43, 44, 45],
    },
    {
        id: "low-stock",
        label: "Low Stock Items",
        value: 12,
        change: 5.0,
        status: "negative",
        trend: [8, 9, 10, 10, 11, 12],
    },
    {
        id: "fulfillment-rate",
        label: "Fulfillment Rate",
        value: "98.2%",
        change: 0.5,
        status: "positive",
        trend: [97, 97.5, 98, 98, 98.1, 98.2],
    },
];

const salesData = [
    { name: 'Mon', value: 4000, prediction: 4000 },
    { name: 'Tue', value: 3000, prediction: 3000 },
    { name: 'Wed', value: 2000, prediction: 2000 },
    { name: 'Thu', value: 2780, prediction: 2780 },
    { name: 'Fri', value: 1890, prediction: 1890 },
    { name: 'Sat', value: 2390, prediction: 2390 },
    { name: 'Sun', value: 3490, prediction: 3490 },
    { name: 'Next Mon', value: null, prediction: 3800 },
    { name: 'Next Tue', value: null, prediction: 3900 },
];

const inventoryData = [
    { id: 1, item: "Drill XR-200", category: "Tools", stock: 5, status: "Low", lastOrdered: "2023-11-20" },
    { id: 2, item: "Hammer Pro", category: "Tools", stock: 120, status: "Optimal", lastOrdered: "2023-11-22" },
    { id: 3, item: "Safety Vest M", category: "Safety", stock: 45, status: "Optimal", lastOrdered: "2023-11-21" },
    { id: 4, item: "Construction Helmet", category: "Safety", stock: 12, status: "Warning", lastOrdered: "2023-11-15" },
    { id: 5, item: "Work Boots L", category: "Apparel", stock: 0, status: "Out of Stock", lastOrdered: "2023-11-10" },
];

const alertsData = [
    { id: 1, type: "critical", message: "Stockout risk for 'Work Boots L' - Immediate reorder needed." },
    { id: 2, type: "warning", message: "Sales for 'Tools' category dropped 15% vs last week." },
    { id: 3, type: "info", message: "New shipment arrived at Warehouse B." },
];

// Exposure to global scope for simplicity in vanilla JS without bundlers
window.MockData = {
    kpiData,
    salesData,
    inventoryData,
    alertsData
};
