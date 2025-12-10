// Mock Data for the Dashboard

const kpiData = [
    {
        id: "sp500",
        label: "S&P 500",
        value: "4,604.37",
        change: 0.85,
        status: "positive",
        trend: [4500, 4520, 4510, 4550, 4580, 4604],
    },
    {
        id: "nasdaq",
        label: "Nasdaq 100",
        value: "16,085.11",
        change: 1.2,
        status: "positive",
        trend: [15800, 15900, 15850, 16000, 16050, 16085],
    },
    {
        id: "dow",
        label: "Dow Jones",
        value: "36,245.50",
        change: -0.15,
        status: "neutral",
        trend: [36100, 36200, 36300, 36150, 36200, 36245],
    },
    {
        id: "russell",
        label: "Russell 2000",
        value: "1,880.82",
        change: -0.45,
        status: "negative",
        trend: [1900, 1890, 1895, 1885, 1875, 1880],
    },
];

const stockHistory = [
    { name: '10:00', value: 180.50, prediction: 180.50 },
    { name: '11:00', value: 182.20, prediction: 182.20 },
    { name: '12:00', value: 181.80, prediction: 181.80 },
    { name: '13:00', value: 183.10, prediction: 183.10 },
    { name: '14:00', value: 184.50, prediction: 184.50 },
    { name: '15:00', value: 185.00, prediction: 185.00 },
    { name: '16:00', value: 185.90, prediction: 185.90 },
    { name: '17:00 (F)', value: null, prediction: 186.50 },
    { name: '18:00 (F)', value: null, prediction: 187.20 },
];

const watchlistData = [
    { id: 1, item: "AAPL", category: "Apple Inc.", stock: "185.90", status: "+1.5%", lastOrdered: "High Conf." },
    { id: 2, item: "TSLA", category: "Tesla, Inc.", stock: "240.30", status: "-0.8%", lastOrdered: "Med Conf." },
    { id: 3, item: "NVDA", category: "NVIDIA Corp", stock: "475.00", status: "+2.3%", lastOrdered: "High Conf." },
    { id: 4, item: "AMZN", category: "Amazon.com", stock: "145.20", status: "+0.5%", lastOrdered: "Med Conf." },
    { id: 5, item: "GOOGL", category: "Alphabet Inc", stock: "135.50", status: "-0.2%", lastOrdered: "Low Conf." },
];

const marketAlerts = [
    { id: 1, type: "critical", message: "AAPL crossing all-time high predicted in next 4 hours." },
    { id: 2, type: "warning", message: "Tech sector showing slight bearish divergence." },
    { id: 3, type: "info", message: "Fed meeting minutes released at 2:00 PM EST." },
];

// Exposure to global scope for simplicity in vanilla JS without bundlers
window.MockData = {
    kpiData,
    stockHistory,
    watchlistData,
    marketAlerts
};
