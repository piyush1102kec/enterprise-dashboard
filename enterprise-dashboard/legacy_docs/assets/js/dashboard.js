/* ==================== DASHBOARD MODULE ==================== */

/**
 * Dashboard home view with KPI cards, greeting, and recent tasks
 */

// ==================== DASHBOARD RENDERING ====================

/**
 * Render the dashboard view
 */
function renderDashboard() {
    const dashboardView = document.getElementById('dashboard-view');
    
    if (!dashboardView) return;
    
    const user = getCurrentUser();
    const counts = getTaskCounts();
    
    let dashboardHTML = `
        <div class="section-header">
            <h1 class="section-title">
                <i class="fas fa-chart-line"></i>
                Welcome back, ${user.name}
            </h1>
            <p class="section-subtitle">${getGreeting()}</p>
        </div>
    `;
    
    // KPI Cards section
    dashboardHTML += renderKPICards(counts);
    
    // Charts section
    dashboardHTML += renderChartsSection();
    
    // Recent tasks section
    dashboardHTML += renderRecentTasksSection();
    
    dashboardView.innerHTML = dashboardHTML;
    
    // Attach event listeners
    attachDashboardEventListeners();
}

// ==================== KPI CARDS ====================

/**
 * Render KPI (Key Performance Indicator) cards
 */
function renderKPICards(counts) {
    const user = getCurrentUser();
    const role = user.role;
    
    let kpiHTML = '<div class="kpi-grid">';
    
    // Total Tasks
    kpiHTML += `
        <div class="kpi-card">
            <div class="kpi-icon">
                <i class="fas fa-tasks"></i>
            </div>
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-value">${counts.total}</div>
            <div class="kpi-change">
                <i class="fas fa-arrow-up"></i> 12% from last month
            </div>
        </div>
    `;
    
    // In Progress
    kpiHTML += `
        <div class="kpi-card">
            <div class="kpi-icon">
                <i class="fas fa-spinner" style="color: var(--color-warning);"></i>
            </div>
            <div class="kpi-label">In Progress</div>
            <div class="kpi-value">${counts.inProgress}</div>
            <div class="kpi-change">
                <i class="fas fa-arrow-right"></i> Active tasks
            </div>
        </div>
    `;
    
    // Completed
    kpiHTML += `
        <div class="kpi-card">
            <div class="kpi-icon">
                <i class="fas fa-check-circle" style="color: var(--color-success);"></i>
            </div>
            <div class="kpi-label">Completed</div>
            <div class="kpi-value">${counts.done}</div>
            <div class="kpi-change">
                <i class="fas fa-arrow-up"></i> 8% from last month
            </div>
        </div>
    `;
    
    // Role-specific KPI
    if (role === 'Admin') {
        kpiHTML += `
            <div class="kpi-card">
                <div class="kpi-icon">
                    <i class="fas fa-users" style="color: var(--color-secondary);"></i>
                </div>
                <div class="kpi-label">Active Users</div>
                <div class="kpi-value">${appState.users.length}</div>
                <div class="kpi-change">
                    <i class="fas fa-arrow-up"></i> All active
                </div>
            </div>
        `;
    } else if (role === 'Sales') {
        const salesTotals = calculateSalesPipeline();
        kpiHTML += `
            <div class="kpi-card">
                <div class="kpi-icon">
                    <i class="fas fa-chart-pie" style="color: var(--color-primary);"></i>
                </div>
                <div class="kpi-label">Sales Pipeline</div>
                <div class="kpi-value">${salesTotals.count}</div>
                <div class="kpi-change">
                    <i class="fas fa-arrow-up"></i> 5% conversion
                </div>
            </div>
        `;
    } else {
        kpiHTML += `
            <div class="kpi-card">
                <div class="kpi-icon">
                    <i class="fas fa-fire" style="color: var(--color-danger);"></i>
                </div>
                <div class="kpi-label">Backlog</div>
                <div class="kpi-value">${counts.backlog}</div>
                <div class="kpi-change">
                    <i class="fas fa-arrow-down"></i> 3% less than last week
                </div>
            </div>
        `;
    }
    
    kpiHTML += '</div>';
    
    return kpiHTML;
}

// ==================== CHARTS SECTION ====================

/**
 * Render charts and analytics section
 */
function renderChartsSection() {
    const role = getCurrentUser().role;
    
    let chartsHTML = `
        <div style="margin-bottom: 2rem;">
            <div class="section-title" style="margin-bottom: 1.5rem;">
                <i class="fas fa-chart-bar"></i>
                Analytics
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem;">
    `;
    
    // Task Distribution Chart
    chartsHTML += renderTaskDistributionChart();
    
    // Workload Chart
    chartsHTML += renderWorkloadChart();
    
    if (role === 'Admin') {
        // System Health Chart
        chartsHTML += renderSystemHealthChart();
    }
    
    chartsHTML += '</div>';
    
    return chartsHTML;
}

/**
 * Render task distribution pie chart (HTML/CSS based)
 */
function renderTaskDistributionChart() {
    const counts = getTaskCounts();
    
    const total = counts.total || 1;
    const backlogPercent = ((counts.backlog / total) * 100).toFixed(0);
    const todoPercent = ((counts.todo / total) * 100).toFixed(0);
    const inProgressPercent = ((counts.inProgress / total) * 100).toFixed(0);
    const donePercent = ((counts.done / total) * 100).toFixed(0);
    
    return `
        <div class="card">
            <div class="card-header">
                <div>
                    <div class="card-title">Task Distribution</div>
                    <div class="card-subtitle">By Status</div>
                </div>
            </div>
            <div class="card-body" style="padding: 1.5rem;">
                <div style="display: flex; gap: 2rem; align-items: center;">
                    <div style="flex: 1;">
                        <canvas id="task-dist-chart" width="200" height="200"></canvas>
                    </div>
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="width: 12px; height: 12px; background-color: var(--color-warning); border-radius: 2px;"></div>
                            <span style="font-size: 12px; color: var(--color-text-muted);">Backlog: ${counts.backlog}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="width: 12px; height: 12px; background-color: var(--color-primary); border-radius: 2px;"></div>
                            <span style="font-size: 12px; color: var(--color-text-muted);">To Do: ${counts.todo}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="width: 12px; height: 12px; background-color: var(--color-secondary); border-radius: 2px;"></div>
                            <span style="font-size: 12px; color: var(--color-text-muted);">In Progress: ${counts.inProgress}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="width: 12px; height: 12px; background-color: var(--color-success); border-radius: 2px;"></div>
                            <span style="font-size: 12px; color: var(--color-text-muted);">Done: ${counts.done}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render workload chart
 */
function renderWorkloadChart() {
    const tasks = getCurrentUserTasks();
    const userCounts = {};
    
    tasks.forEach(task => {
        const user = getUserById(task.assignedUser);
        const name = user ? user.name : 'Unassigned';
        userCounts[name] = (userCounts[name] || 0) + 1;
    });
    
    const topUsers = Object.entries(userCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    let barsHTML = '';
    const maxCount = Math.max(...topUsers.map(u => u[1]));
    
    topUsers.forEach(([name, count]) => {
        const percent = (count / maxCount * 100).toFixed(0);
        barsHTML += `
            <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-size: 13px; color: var(--color-text);">${name}</span>
                    <span style="font-size: 13px; color: var(--color-text-muted);">${count} tasks</span>
                </div>
                <div style="background-color: var(--color-surface-alt); height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, var(--color-primary), var(--color-secondary)); height: 100%; width: ${percent}%;"></div>
                </div>
            </div>
        `;
    });
    
    return `
        <div class="card">
            <div class="card-header">
                <div>
                    <div class="card-title">Workload</div>
                    <div class="card-subtitle">Tasks per person</div>
                </div>
            </div>
            <div class="card-body" style="padding: 1.5rem;">
                ${barsHTML}
            </div>
        </div>
    `;
}

/**
 * Render system health chart (Admin only)
 */
function renderSystemHealthChart() {
    const healthMetrics = [
        { label: 'API Uptime', value: 99.9 },
        { label: 'Database Health', value: 98.5 },
        { label: 'Cache Hit Rate', value: 95.2 },
        { label: 'Error Rate', value: 0.1 }
    ];
    
    let metricsHTML = '';
    
    healthMetrics.forEach(metric => {
        let color = 'var(--color-success)';
        if (metric.value < 99) color = 'var(--color-warning)';
        if (metric.value < 95) color = 'var(--color-danger)';
        
        metricsHTML += `
            <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-size: 13px; color: var(--color-text);">${metric.label}</span>
                    <span style="font-size: 13px; font-weight: 600; color: ${color};">${metric.value}%</span>
                </div>
                <div style="background-color: var(--color-surface-alt); height: 6px; border-radius: 3px; overflow: hidden;">
                    <div style="background: ${color}; height: 100%; width: ${metric.value}%;"></div>
                </div>
            </div>
        `;
    });
    
    return `
        <div class="card">
            <div class="card-header">
                <div>
                    <div class="card-title">System Health</div>
                    <div class="card-subtitle">Enterprise metrics</div>
                </div>
            </div>
            <div class="card-body" style="padding: 1.5rem;">
                ${metricsHTML}
            </div>
        </div>
    `;
}

// ==================== RECENT TASKS ====================

/**
 * Render recent tasks section
 */
function renderRecentTasksSection() {
    const recentTasks = getRecentTasks(6);
    
    if (recentTasks.length === 0) {
        return `
            <div class="card" style="margin-top: 2rem;">
                <div class="card-header">
                    <div class="card-title">Recent Tasks</div>
                </div>
                <div style="padding: 2rem; text-align: center; color: var(--color-text-muted);">
                    <i class="fas fa-inbox" style="font-size: 32px; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
                    No tasks yet. Get started by creating your first task!
                </div>
            </div>
        `;
    }
    
    let tasksHTML = `
        <div class="card" style="margin-top: 2rem;">
            <div class="card-header">
                <div>
                    <div class="card-title">Recent Tasks</div>
                    <div class="card-subtitle">Your latest activities</div>
                </div>
            </div>
            <div style="padding: 0;">
    `;
    
    recentTasks.forEach((task, index) => {
        const priorityClass = `priority-${task.priority.toLowerCase()}`;
        const isLast = index === recentTasks.length - 1;
        
        tasksHTML += `
            <div style="padding: 1rem 1.5rem; border-bottom: ${isLast ? 'none' : '1px solid var(--color-border)'}; display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: var(--color-text); margin-bottom: 0.25rem;">
                        ${task.title}
                    </div>
                    <div style="font-size: 12px; color: var(--color-text-muted);">
                        Status: <strong>${task.status}</strong>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <span class="task-tag">${task.tag}</span>
                    <span class="task-priority ${priorityClass}">${task.priority}</span>
                </div>
            </div>
        `;
    });
    
    tasksHTML += `
            </div>
            <div style="padding: 1rem 1.5rem; background-color: var(--color-bg); border-top: 1px solid var(--color-border); text-align: center;">
                <button class="btn btn-secondary btn-small" id="view-all-tasks-btn">
                    <i class="fas fa-arrow-right"></i>
                    View All Tasks
                </button>
            </div>
        </div>
    `;
    
    return tasksHTML;
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get greeting based on time of day
 */
function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) {
        return 'Good morning! Here\'s what\'s happening today.';
    } else if (hour < 18) {
        return 'Good afternoon! Keep up the great work.';
    } else {
        return 'Good evening! Here\'s your end-of-day summary.';
    }
}

/**
 * Calculate sales pipeline data
 */
function calculateSalesPipeline() {
    const salesTotals = {
        count: 0,
        inProgress: 0,
        done: 0
    };
    
    const salesTasks = appState.tasks.filter(t => t.tag === 'Sales');
    
    salesTotals.count = salesTasks.length;
    salesTotals.inProgress = salesTasks.filter(t => t.status === 'In Progress').length;
    salesTotals.done = salesTasks.filter(t => t.status === 'Done').length;
    
    return salesTotals;
}

// ==================== EVENT LISTENERS ====================

/**
 * Attach event listeners to dashboard elements
 */
function attachDashboardEventListeners() {
    const viewAllBtn = document.getElementById('view-all-tasks-btn');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            navigateToView('kanban');
        });
    }
    
    // Draw pie chart
    drawTaskDistributionChart();
}

/**
 * Draw task distribution pie chart
 */
function drawTaskDistributionChart() {
    const canvas = document.getElementById('task-dist-chart');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const counts = getTaskCounts();
    const total = counts.total || 1;
    
    const slices = [
        { value: counts.backlog, color: '#f59e0b' },
        { value: counts.todo, color: '#3b82f6' },
        { value: counts.inProgress, color: '#8b5cf6' },
        { value: counts.done, color: '#22c55e' }
    ];
    
    let currentAngle = 0;
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    
    slices.forEach(slice => {
        const sliceAngle = (slice.value / total) * 2 * Math.PI;
        
        ctx.fillStyle = slice.color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
    
    // Draw center circle for donut effect
    ctx.fillStyle = 'var(--color-surface)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.fill();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderDashboard,
        renderKPICards,
        renderChartsSection,
        renderTaskDistributionChart,
        renderWorkloadChart,
        renderSystemHealthChart,
        renderRecentTasksSection,
        getGreeting,
        calculateSalesPipeline,
        attachDashboardEventListeners,
        drawTaskDistributionChart
    };
}
