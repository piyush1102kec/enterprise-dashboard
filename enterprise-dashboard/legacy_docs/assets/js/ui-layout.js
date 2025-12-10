/* ==================== UI LAYOUT MODULE ==================== */

/**
 * Handles main application layout including header, sidebar, and navigation
 */

// ==================== DOM REFERENCES ====================

let appRoot = null;
let headerEl = null;
let sidebarEl = null;
let contentAreaEl = null;
let toastContainerEl = null;
let modalContainerEl = null;

/**
 * Initialize DOM references
 */
function initializeDOMReferences() {
    appRoot = document.getElementById('app-root');
    toastContainerEl = document.getElementById('toast-container');
    modalContainerEl = document.getElementById('modal-container');
}

// ==================== LAYOUT RENDERING ====================

/**
 * Render main application layout (header + sidebar + content area)
 */
function renderMainLayout() {
    if (!isAuthenticated()) return;
    
    const user = getCurrentUser();
    
    // Clear app root
    appRoot.innerHTML = '';
    
    // Add main layout HTML
    const layoutHTML = `
        <!-- Header -->
        <header class="app-header">
            <div class="app-header-left">
                <button class="menu-toggle" id="menu-toggle">
                    <i class="fas fa-bars"></i>
                </button>
                <a class="app-logo">
                    <i class="fas fa-rocket"></i>
                    <span>Dashboard</span>
                </a>
            </div>
            
            <div class="app-header-right">
                <div class="header-actions">
                    <button class="icon-btn" id="notifications-btn" title="Notifications">
                        <i class="fas fa-bell"></i>
                    </button>
                    <button class="icon-btn" id="theme-toggle-btn" title="Toggle Theme">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
                
                <div class="user-profile">
                    <div class="user-avatar" id="user-avatar" title="User Profile">
                        ${user.avatar}
                    </div>
                    <div class="user-info">
                        <div class="user-name" id="user-name">${user.name}</div>
                        <div class="user-role" id="user-role">${user.role}</div>
                    </div>
                    <button class="icon-btn" id="logout-btn" title="Logout">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </header>
        
        <!-- Main Content -->
        <div class="main-layout">
            <!-- Sidebar Navigation -->
            <aside class="sidebar" id="sidebar">
                <nav class="sidebar-nav" id="sidebar-nav">
                    <!-- Nav items populated by JavaScript -->
                </nav>
                
                <div class="sidebar-footer">
                    <!-- Footer content if needed -->
                </div>
            </aside>
            
            <!-- Content Area -->
            <main class="content-area" id="content-area">
                <!-- Views populated by JavaScript -->
            </main>
        </div>
    `;
    
    appRoot.innerHTML = layoutHTML;
    
    // Update DOM references
    headerEl = document.querySelector('.app-header');
    sidebarEl = document.getElementById('sidebar');
    contentAreaEl = document.getElementById('content-area');
    
    // Populate navigation
    renderSidebarNavigation();
    
    // Attach event listeners
    attachLayoutEventListeners();
    
    // Apply theme
    applyTheme();
}

/**
 * Render login view
 */
function renderLoginView() {
    appRoot.innerHTML = '';
    
    const demoCredentials = getDemoCredentials();
    
    const loginHTML = `
        <div class="login-view">
            <div class="login-box">
                <div class="login-header">
                    <div style="font-size: 40px; margin-bottom: 16px;">
                        <i class="fas fa-rocket" style="color: var(--color-primary);"></i>
                    </div>
                    <h1 class="login-title">Enterprise Dashboard</h1>
                    <p class="login-subtitle">Sign in to your account</p>
                </div>
                
                <form id="login-form">
                    <div class="form-group">
                        <label class="form-label">Email / Username</label>
                        <input 
                            type="text" 
                            id="login-username" 
                            class="form-input" 
                            placeholder="admin@example.com"
                            required
                        />
                        <div class="form-error" id="username-error"></div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input 
                            type="password" 
                            id="login-password" 
                            class="form-input" 
                            placeholder="••••••••"
                            required
                        />
                        <div class="form-error" id="password-error"></div>
                    </div>
                    
                    <div class="form-error" id="login-error" style="margin-bottom: 16px;"></div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 16px;">
                        <i class="fas fa-sign-in-alt"></i>
                        Sign In
                    </button>
                </form>
                
                <div class="demo-users">
                    <div class="demo-title">Demo Credentials</div>
                    <div class="demo-buttons">
                        ${demoCredentials.map(cred => `
                            <button class="demo-btn" data-username="${cred.username}" data-password="${cred.password}">
                                ${cred.role}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--color-border); text-align: center; font-size: 12px; color: var(--color-text-muted);">
                    <p style="margin-bottom: 8px;">
                        This is a demo with simulated authentication.
                    </p>
                    <p>
                        Use demo credentials to explore different roles.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    appRoot.innerHTML = loginHTML;
    
    // Attach login event listeners
    attachLoginEventListeners();
}

// ==================== SIDEBAR NAVIGATION ====================

/**
 * Render sidebar navigation items
 */
function renderSidebarNavigation() {
    const navContainer = document.getElementById('sidebar-nav');
    
    if (!navContainer) return;
    
    const navItems = getAccessibleNavItems();
    
    navContainer.innerHTML = navItems.map(item => `
        <a class="nav-item" data-view="${item.view}">
            <i class="fas ${item.icon}"></i>
            <span>${item.label}</span>
        </a>
    `).join('');
    
    // Set active nav item based on current view
    updateActiveNavItem();
    
    // Attach click listeners
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            navigateToView(view);
        });
    });
}

/**
 * Update active navigation item styling
 */
function updateActiveNavItem() {
    const activeView = appState.ui.activeView;
    
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.view === activeView) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// ==================== THEME MANAGEMENT ====================

/**
 * Apply current theme to application
 */
function applyTheme() {
    const user = getCurrentUser();
    
    if (!user) return;
    
    const theme = user.preferences.theme || 'dark';
    
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    
    // Update theme toggle button icon
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        const icon = theme === 'light' ? 'fa-sun' : 'fa-moon';
        themeToggleBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }
    
    appState.ui.theme = theme;
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const user = getCurrentUser();
    
    if (!user) return;
    
    const newTheme = user.preferences.theme === 'light' ? 'dark' : 'light';
    
    updateUserPreferences({ theme: newTheme });
    applyTheme();
    
    showToast(`Switched to ${newTheme} mode`, 'success');
}

// ==================== VIEW NAVIGATION ====================

/**
 * Navigate to a specific view
 */
function navigateToView(viewName) {
    // Check if user has permission to access this view
    const permission = canAccessFeature(viewName);
    
    if (!permission) {
        showToast('You do not have permission to access this view', 'error');
        return;
    }
    
    // Update active view
    setActiveView(viewName);
    
    // Hide all views
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show requested view
    const viewElement = document.getElementById(`${viewName}-view`);
    if (viewElement) {
        viewElement.classList.add('active');
    }
    
    // Update active nav item
    updateActiveNavItem();
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
        appState.ui.sidebarOpen = false;
        sidebarEl.classList.remove('open');
    }
    
    console.log(`✓ Navigated to view: ${viewName}`);
}

/**
 * Render all view containers (Dashboard, Kanban, Settings, etc.)
 */
function renderViewContainers() {
    if (!contentAreaEl) return;
    
    const user = getCurrentUser();
    
    let viewsHTML = '';
    
    // Dashboard view
    if (canAccessFeature('dashboard')) {
        viewsHTML += `<div id="dashboard-view" class="view-container active">
            <!-- Dashboard content populated by dashboard.js -->
        </div>`;
    }
    
    // Kanban view
    if (canAccessFeature('kanban')) {
        viewsHTML += `<div id="kanban-view" class="view-container">
            <!-- Kanban board populated by kanban.js -->
        </div>`;
    }
    
    // Settings view
    if (canAccessFeature('settings')) {
        viewsHTML += `<div id="settings-view" class="view-container">
            <!-- Settings populated by settings.js -->
        </div>`;
    }
    
    // User Management view (Admin only)
    if (canAccessFeature('users')) {
        viewsHTML += `<div id="users-view" class="view-container">
            <!-- User management populated by users.js -->
        </div>`;
    }
    
    // Reports view (Admin only)
    if (canAccessFeature('reports')) {
        viewsHTML += `<div id="reports-view" class="view-container">
            <!-- Reports populated by reports.js -->
        </div>`;
    }
    
    contentAreaEl.innerHTML = viewsHTML;
}

// ==================== EVENT LISTENERS ====================

/**
 * Attach event listeners to layout elements
 */
function attachLayoutEventListeners() {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            appState.ui.sidebarOpen = !appState.ui.sidebarOpen;
            sidebarEl.classList.toggle('open');
        });
    }
    
    // Theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Notifications button
    const notificationsBtn = document.getElementById('notifications-btn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', () => {
            showToast('No new notifications', 'info');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebarEl.contains(e.target) && 
                !document.getElementById('menu-toggle').contains(e.target)) {
                appState.ui.sidebarOpen = false;
                sidebarEl.classList.remove('open');
            }
        }
    });
}

/**
 * Attach event listeners to login form
 */
function attachLoginEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Demo credential buttons
    document.querySelectorAll('.demo-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const username = btn.dataset.username;
            const password = btn.dataset.password;
            
            handleLogin(username, password);
        });
    });
}

// ==================== HANDLERS ====================

/**
 * Handle login form submission
 */
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Clear error messages
    document.getElementById('login-error').textContent = '';
    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    
    // Validate
    if (!username) {
        document.getElementById('username-error').textContent = 'Username is required';
        return;
    }
    
    if (!password) {
        document.getElementById('password-error').textContent = 'Password is required';
        return;
    }
    
    // Attempt login
    handleLogin(username, password);
}

/**
 * Handle user login
 */
function handleLogin(username, password) {
    const user = authenticateUser(username, password);
    
    if (user) {
        showToast(`Welcome back, ${user.name}!`, 'success');
        
        // Re-render the entire app
        setTimeout(() => {
            renderMainLayout();
            renderViewContainers();
            renderDashboard();
        }, 100);
    } else {
        document.getElementById('login-error').textContent = 
            'Invalid username or password. Please try again.';
        showToast('Login failed', 'error');
    }
}

/**
 * Handle user logout
 */
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        logoutUser();
        renderLoginView();
        showToast('You have been logged out', 'info');
    }
}

// ==================== TOAST NOTIFICATIONS ====================

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    if (!toastContainerEl) return;
    
    const toastId = `toast-${Date.now()}`;
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const toastHTML = `
        <div class="toast ${type}" id="${toastId}">
            <i class="fas ${icons[type]} toast-icon"></i>
            <span>${message}</span>
        </div>
    `;
    
    toastContainerEl.insertAdjacentHTML('beforeend', toastHTML);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.style.animation = 'slideIn 0.2s ease reverse';
            setTimeout(() => toast.remove(), 200);
        }
    }, 4000);
}

// ==================== RESPONSIVE BEHAVIOR ====================

/**
 * Handle window resize for responsive behavior
 */
function setupResponsiveListener() {
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            appState.ui.sidebarOpen = true;
            if (sidebarEl) {
                sidebarEl.classList.remove('open');
            }
        }
    });
}

// ==================== INITIALIZATION ====================

/**
 * Initialize UI layout on page load
 */
function initializeUILayout() {
    console.log('Initializing UI layout...');
    
    // Initialize DOM references
    initializeDOMReferences();
    
    // Setup responsive listener
    setupResponsiveListener();
    
    // Render appropriate view based on auth status
    if (isAuthenticated()) {
        renderMainLayout();
        renderViewContainers();
    } else {
        renderLoginView();
    }
    
    console.log('✓ UI layout initialized');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeDOMReferences,
        renderMainLayout,
        renderLoginView,
        renderSidebarNavigation,
        updateActiveNavItem,
        applyTheme,
        toggleTheme,
        navigateToView,
        renderViewContainers,
        attachLayoutEventListeners,
        attachLoginEventListeners,
        handleLoginSubmit,
        handleLogin,
        handleLogout,
        showToast,
        setupResponsiveListener,
        initializeUILayout
    };
}
