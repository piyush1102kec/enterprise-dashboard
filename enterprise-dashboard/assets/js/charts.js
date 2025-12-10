/**
 * Charts Configuration using Chart.js
 */

document.addEventListener('DOMContentLoaded', () => {
    initStockChart();
});

function initStockChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return; // Exit if chart on this page
    const ctx = canvas.getContext('2d');
    const data = window.MockData.stockHistory;

    // Prepare datasets
    const labels = data.map(d => d.name);
    const stockData = data.map(d => d.value); // Will be null for future
    const predictionData = data.map(d => d.prediction); // Covers all

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'AAPL Price',
                    data: stockData,
                    borderColor: '#2563EB', // Blue-600
                    backgroundColor: '#2563EB',
                    borderWidth: 3,
                    tension: 0.1, // Less tension for stock charts
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderColor: '#2563EB',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    spanGaps: false
                },
                {
                    label: 'AI Forecast',
                    data: predictionData,
                    borderColor: '#10B981', // Green for prediction
                    backgroundColor: '#10B981',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.1,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    zIndex: -1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#111827',
                    bodyColor: '#374151',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 3,
                    usePointStyle: true,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 5 }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9CA3AF'
                    }
                },
                y: {
                    grid: {
                        color: '#F3F4F6'
                    },
                    ticks: {
                        color: '#9CA3AF',
                        callback: function (value) {
                            return '$' + value;
                        }
                    },
                    border: {
                        display: false
                    }
                }
            }
        }
    });
}
