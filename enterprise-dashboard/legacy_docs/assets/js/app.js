/* ==================== MAIN APPLICATION ORCHESTRATOR ==================== */

/**
 * Main application entry point
 * Bootstraps the application, initializes modules, and coordinates view rendering
 */

// ==================== APPLICATION INITIALIZATION ====================

/**
 * Initialize and start the application
 */
function initializeApp() {
    console.log('🚀 Enterprise Dashboard initializing...');
    console.log('='.repeat(50));
    
    // Step 1: Initialize application state
    initializeAppState();
    
    // Step 2: Initialize UI layout system
    initializeUILayout();
    
    // Step 3: Setup responsive behavior
    setupResponsiveListeners();
    
    // Step 4: Render initial content based on auth status
    renderInitialContent();
    
    console.log('='.repeat(50));
    console.log('✓ Application initialized successfully');
}

/**
 * Render initial content based on authentication status
 */
function renderInitialContent() {
    if (isAuthenticated()) {
        const user = getCurrentUser();
        console.log(`✓ User session found: ${user.name} (${user.role})`);
        
        // Render main layout and views
        renderMainLayout();
        renderViewContainers();
        renderDashboard();
    } else {
        console.log('✓ No session found, showing login view');
        renderLoginView();
    }
}

// ==================== VIEW RENDERING ORCHESTRATION ====================

/**
 * Render view containers based on current navigation
 */
function handleViewNavigation(viewName) {
    console.log(`📄 Navigating to: ${viewName}`);
    
    // Clear any open modals
    closeTaskModal();
    
    // Hide all views
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.remove('active');
    });
    
    // Render requested view
    switch (viewName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'kanban':
            renderKanbanBoard();
            break;
        case 'settings':
            renderSettings();
            break;
        case 'users':
            if (canAccessFeature('users')) {
                renderUserManagement();
            }
            break;
        case 'reports':
            if (canAccessFeature('reports')) {
                renderReports();
            }
            break;
        default:
            console.warn(`⚠ Unknown view: ${viewName}`);
            renderDashboard();
    }
    
    // Show the view container
    const viewElement = document.getElementById(`${viewName}-view`);
    if (viewElement) {
        viewElement.classList.add('active');
    }
    
    // Update navigation state
    setActiveView(viewName);
    updateActiveNavItem();
    
    // Scroll to top
    const contentArea = document.getElementById('content-area');
    if (contentArea) {
        contentArea.scrollTop = 0;
    }
}

// ==================== RESPONSIVE SETUP ====================

/**
 * Setup responsive behavior listeners
 */
function setupResponsiveListeners() {
    // Handle window resize
    window.addEventListener('resize', () => {
        const sidebar = document.getElementById('sidebar');
        
        if (window.innerWidth > 768) {
            // Desktop: keep sidebar visible
            appState.ui.sidebarOpen = true;
            if (sidebar) {
                sidebar.classList.remove('open');
            }
        } else {
            // Mobile: hide sidebar by default
            if (!appState.ui.sidebarOpen && sidebar) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    // Handle escape key for closing modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && appState.ui.modalOpen) {
            closeTaskModal();
        }
    });
}

// ==================== VIEW RENDER FUNCTIONS ====================

/**
 * Override navigateToView to use our orchestration
 */
function navigateToView(viewName) {
    // Check permission
    if (!canAccessFeature(viewName)) {
        showToast('You do not have permission to access this view', 'warning');
        return;
    }
    
    handleViewNavigation(viewName);
}

/**
 * Render user management view (stub for future implementation)
 */
function renderUserManagement() {
    const usersView = document.getElementById('users-view');
    
    if (!usersView) return;
    
    const usersHTML = `
        <div class="section-header">
            <h1 class="section-title">
                <i class="fas fa-users"></i>
                User Management
            </h1>
            <p class="section-subtitle">Manage system users and permissions</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <div class="card-title">Active Users</div>
            </div>
            <div style="padding: 1.5rem;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--color-border);">
                            <th style="text-align: left; padding: 0.75rem; font-weight: 600; color: var(--color-text-muted);">Name</th>
                            <th style="text-align: left; padding: 0.75rem; font-weight: 600; color: var(--color-text-muted);">Email</th>
                            <th style="text-align: left; padding: 0.75rem; font-weight: 600; color: var(--color-text-muted);">Role</th>
                            <th style="text-align: left; padding: 0.75rem; font-weight: 600; color: var(--color-text-muted);">Last Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appState.users.map(user => `
                            <tr style="border-bottom: 1px solid var(--color-border);">
                                <td style="padding: 0.75rem;">
                                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px;">
                                            ${user.avatar}
                                        </div>
                                        ${user.name}
                                    </div>
                                </td>
                                <td style="padding: 0.75rem;">${user.email}</td>
                                <td style="padding: 0.75rem;">
                                    <span style="background-color: ${user.role === 'Admin' ? 'rgba(239, 68, 68, 0.2); color: var(--color-danger)' : 'rgba(59, 130, 246, 0.2); color: var(--color-primary)'}; padding: 0.25rem 0.75rem; border-radius: var(--radius-sm); font-size: 12px; font-weight: 600;">
                                        ${user.role}
                                    </span>
                                </td>
                                <td style="padding: 0.75rem; color: var(--color-text-muted); font-size: 13px;">
                                    ${new Date(user.lastLogin).toLocaleDateString()}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    usersView.innerHTML = usersHTML;
}

/**
 * Render reports view (stub for future implementation)
 */
function renderReports() {
    const reportsView = document.getElementById('reports-view');
    
    if (!reportsView) return;
    
    const reportsHTML = `
        <div class="section-header">
            <h1 class="section-title">
                <i class="fas fa-chart-bar"></i>
                Reports & Analytics
            </h1>
            <p class="section-subtitle">System-wide analytics and performance metrics</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div class="kpi-card">
                <div class="kpi-icon"><i class="fas fa-users"></i></div>
                <div class="kpi-label">Total Users</div>
                <div class="kpi-value">${appState.users.length}</div>
                <div class="kpi-change"><i class="fas fa-arrow-up"></i> Active</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-icon"><i class="fas fa-tasks"></i></div>
                <div class="kpi-label">Total Tasks</div>
                <div class="kpi-value">${appState.tasks.length}</div>
                <div class="kpi-change"><i class="fas fa-arrow-up"></i> All tasks</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-icon"><i class="fas fa-check-circle"></i></div>
                <div class="kpi-label">Completed Tasks</div>
                <div class="kpi-value">${appState.tasks.filter(t => t.status === 'Done').length}</div>
                <div class="kpi-change"><i class="fas fa-arrow-up"></i> Completion rate</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <div class="card-title">Task Distribution by Role</div>
            </div>
            <div style="padding: 1.5rem;">
                ${['Admin', 'User', 'Sales'].map(role => {
                    const roleTaskCount = appState.tasks.filter(t => t.ownerRole === role).length;
                    const percent = ((roleTaskCount / appState.tasks.length) * 100).toFixed(0);
                    return `
                        <div style="margin-bottom: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="font-weight: 600; color: var(--color-text);">${role}</span>
                                <span style="color: var(--color-text-muted);">${roleTaskCount} tasks (${percent}%)</span>
                            </div>
                            <div style="background-color: var(--color-surface-alt); height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="background: linear-gradient(90deg, var(--color-primary), var(--color-secondary)); height: 100%; width: ${percent}%;"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    reportsView.innerHTML = reportsHTML;
}

// ==================== PAGE LOAD EVENT ====================

/**
 * Run application when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('📦 DOM Content Loaded');
    
    // Initialize application
    initializeApp();
    
    // Setup global navigation
    setupGlobalNavigation();
});

/**
 * Setup global navigation event delegation
 */
function setupGlobalNavigation() {
    // Delegate navigation click events
    document.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item');
        if (navItem) {
            const view = navItem.dataset.view;
            if (view) {
                e.preventDefault();
                handleViewNavigation(view);
            }
        }
    });
}

// ==================== WINDOW EVENTS ====================

/**
 * Handle window visibility changes to save state
 */
window.addEventListener('beforeunload', () => {
    saveStateToLocalStorage();
});

/**
 * Handle page focus/blur
 */
window.addEventListener('focus', () => {
    // Optional: Refresh data when returning to window
    console.log('✓ Window focused');
});

window.addEventListener('blur', () => {
    // Save state when leaving window
    saveStateToLocalStorage();
    console.log('✓ Application state saved');
});

// ==================== ERROR HANDLING ====================

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('❌ Application error:', event.error);
    showToast('An unexpected error occurred', 'error');
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled promise rejection:', event.reason);
    showToast('An unexpected error occurred', 'error');
});

// ==================== CONSOLE HELPERS (Development) ====================

/**
 * Helper functions for testing in console
 */
window.AppDebug = {
    // Get current state
    getState: () => appState,
    
    // Get current user
    getCurrentUser: () => getCurrentUser(),
    
    // Get all users
    getUsers: () => appState.users,
    
    // Get all tasks
    getTasks: () => appState.tasks,
    
    // Get permission summary
    getPermissions: () => getPermissionSummary(),
    
    // Quick login
    login: (username, password) => {
        const user = authenticateUser(username, password);
        if (user) {
            window.location.reload();
        }
        return user;
    },
    
    // Quick logout
    logout: () => {
        logoutUser();
        window.location.reload();
    },
    
    // Clear all data
    clearAll: () => {
        clearLocalStorage();
        window.location.reload();
    },
    
    // Export data
    exportData: () => {
        const data = {
            state: appState,
            timestamp: new Date().toISOString()
        };
        console.log(JSON.stringify(data, null, 2));
        return data;
    },
    
    // Show available commands
    help: () => {
        console.log('='.repeat(50));
        console.log('📊 Enterprise Dashboard - Debug Commands');
        console.log('='.repeat(50));
        console.log('AppDebug.getState()           - Get full app state');
        console.log('AppDebug.getCurrentUser()    - Get current user');
        console.log('AppDebug.getUsers()          - Get all users');
        console.log('AppDebug.getTasks()          - Get all tasks');
        console.log('AppDebug.getPermissions()    - Get permission summary');
        console.log('AppDebug.login(u, p)         - Login with username/password');
        console.log('AppDebug.logout()            - Logout current user');
        console.log('AppDebug.clearAll()          - Clear all data');
        console.log('AppDebug.exportData()        - Export current data');
        console.log('='.repeat(50));
    }
};

// Show welcome message
console.log('%c🚀 Enterprise Dashboard v1.0', 'font-size: 16px; font-weight: bold; color: #3b82f6;');
console.log('%cType AppDebug.help() for available commands', 'font-size: 12px; color: #9ca3af;');
