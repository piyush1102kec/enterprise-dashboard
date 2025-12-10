/**
 * Charts Configuration using Chart.js
 */

document.addEventListener('DOMContentLoaded', () => {
    initTrendChart();
});

function initTrendChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const data = window.MockData.salesData;

    // Prepare datasets
    const labels = data.map(d => d.name);
    const revenueData = data.map(d => d.value); // Will be null for future
    const predictionData = data.map(d => d.prediction); // Covers all

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenueData,
                    borderColor: '#2563EB', // Blue-600
                    backgroundColor: '#2563EB',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderColor: '#2563EB',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    spanGaps: false // Don't bridge gaps for null values
                },
                {
                    label: 'AI Prediction',
                    data: predictionData,
                    borderColor: '#93C5FD', // Blue-300
                    backgroundColor: '#93C5FD',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.4,
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
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(context.parsed.y);
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
