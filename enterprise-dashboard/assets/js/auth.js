/* ==================== AUTHENTICATION MODULE ==================== */

/**
 * Handles all authentication logic including login, logout, and permission checking
 */

// ==================== AUTHENTICATION FUNCTIONS ====================

/**
 * Authenticate user with username and password
 * @param {string} username - Username/email
 * @param {string} password - Password
 * @returns {object|null} - Authenticated user object or null if failed
 */
function authenticateUser(username, password) {
    // Find user by username
    const user = getUserByUsername(username);
    
    // Validate credentials
    if (!user || user.password !== password) {
        console.warn('❌ Authentication failed: Invalid credentials');
        return null;
    }
    
    // Update last login
    user.lastLogin = new Date();
    
    // Set as current user in state
    setCurrentUser({
        ...user,
        // Don't expose password in current user
        password: undefined
    });
    
    console.log(`✓ User authenticated: ${user.name} (${user.role})`);
    return user;
}

/**
 * Logout current user
 */
function logoutUser() {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        console.log(`✓ User logged out: ${currentUser.name}`);
    }
    
    // Clear state
    clearLocalStorage();
    appState.ui.activeView = 'login';
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return getCurrentUser() !== null && getCurrentUser() !== undefined;
}

/**
 * Get current user's role
 */
function getCurrentUserRole() {
    const user = getCurrentUser();
    return user ? user.role : null;
}

// ==================== ROLE-BASED ACCESS CONTROL ====================

/**
 * Check if current user has specific role
 * @param {string} requiredRole - Role to check (Admin, User, Sales)
 * @returns {boolean}
 */
function hasRole(requiredRole) {
    const userRole = getCurrentUserRole();
    
    if (!userRole) return false;
    
    // Admin has access to everything
    if (userRole === 'Admin') return true;
    
    return userRole === requiredRole;
}

/**
 * Check if user can access a feature based on role
 * @param {string} feature - Feature name (dashboard, kanban, settings, users, reports)
 * @returns {boolean}
 */
function canAccessFeature(feature) {
    const role = getCurrentUserRole();
    
    if (!role) return false;
    
    const featurePermissions = {
        // Everyone can access these
        'dashboard': ['Admin', 'User', 'Sales'],
        'kanban': ['Admin', 'User', 'Sales'],
        'settings': ['Admin', 'User', 'Sales'],
        
        // Admin only
        'users': ['Admin'],
        'reports': ['Admin'],
        'audit': ['Admin']
    };
    
    const allowedRoles = featurePermissions[feature] || [];
    return allowedRoles.includes(role);
}

/**
 * Get accessible navigation items for current user role
 */
function getAccessibleNavItems() {
    const role = getCurrentUserRole();
    
    const baseItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', view: 'dashboard' },
        { id: 'kanban', label: 'Kanban', icon: 'fa-kanban', view: 'kanban' },
        { id: 'settings', label: 'Settings', icon: 'fa-cog', view: 'settings' }
    ];
    
    if (role === 'Admin') {
        return [
            ...baseItems,
            { id: 'users', label: 'User Management', icon: 'fa-users', view: 'users' },
            { id: 'reports', label: 'Reports', icon: 'fa-chart-bar', view: 'reports' }
        ];
    }
    
    return baseItems;
}

// ==================== TASK PERMISSIONS ====================

/**
 * Check if current user can view a task
 * @param {object} task - Task object
 * @returns {boolean}
 */
function canViewTask(task) {
    const user = getCurrentUser();
    
    if (!user) return false;
    
    // Admin can view all tasks
    if (user.role === 'Admin') return true;
    
    // User can view only their own tasks
    if (user.role === 'User') {
        return task.assignedUser === user.id;
    }
    
    // Sales can view only Sales-tagged tasks
    if (user.role === 'Sales') {
        return task.tag === 'Sales';
    }
    
    return false;
}

/**
 * Check if current user can edit a task
 * @param {object} task - Task object
 * @returns {boolean}
 */
function canEditTask(task) {
    const user = getCurrentUser();
    
    if (!user) return false;
    
    // Admin can edit all tasks
    if (user.role === 'Admin') return true;
    
    // User can edit only their own tasks
    if (user.role === 'User') {
        return task.assignedUser === user.id;
    }
    
    // Sales can edit only their own Sales tasks
    if (user.role === 'Sales') {
        return task.tag === 'Sales' && task.assignedUser === user.id;
    }
    
    return false;
}

/**
 * Check if current user can delete a task
 * @param {object} task - Task object
 * @returns {boolean}
 */
function canDeleteTask(task) {
    const user = getCurrentUser();
    
    if (!user) return false;
    
    // Admin can delete all tasks
    if (user.role === 'Admin') return true;
    
    // User can delete only their own tasks
    if (user.role === 'User') {
        return task.assignedUser === user.id;
    }
    
    // Sales can delete only their own Sales tasks
    if (user.role === 'Sales') {
        return task.tag === 'Sales' && task.assignedUser === user.id;
    }
    
    return false;
}

/**
 * Check if current user can move a task to different status
 * @param {object} task - Task object
 * @param {string} newStatus - New status to move to
 * @returns {boolean}
 */
function canMoveTask(task, newStatus) {
    const user = getCurrentUser();
    
    if (!user) return false;
    
    // Must be able to edit to move
    if (!canEditTask(task)) return false;
    
    // User cannot move tasks to 'Done' status
    if (user.role === 'User' && newStatus === 'Done') {
        return false;
    }
    
    // Sales cannot move tasks to 'Review' or 'Done'
    if (user.role === 'Sales' && (newStatus === 'Review' || newStatus === 'Done')) {
        return false;
    }
    
    return true;
}

/**
 * Check if current user can create new tasks
 * @returns {boolean}
 */
function canCreateTask() {
    const role = getCurrentUserRole();
    
    // All authenticated users can create tasks
    return role !== null;
}

/**
 * Get allowed task statuses for current user role
 */
function getAllowedTaskStatuses() {
    const role = getCurrentUserRole();
    
    const allStatuses = ['Backlog', 'To Do', 'In Progress', 'Review', 'Done'];
    
    if (role === 'Admin') {
        return allStatuses;
    }
    
    if (role === 'User') {
        // Users cannot create 'Review' or 'Done' tasks
        return ['Backlog', 'To Do', 'In Progress'];
    }
    
    if (role === 'Sales') {
        // Sales cannot create 'Review' or 'Done' tasks
        return ['Backlog', 'To Do', 'In Progress'];
    }
    
    return [];
}

// ==================== USER MANAGEMENT PERMISSIONS ====================

/**
 * Check if current user can manage users (view, edit, delete)
 * @returns {boolean}
 */
function canManageUsers() {
    return hasRole('Admin');
}

/**
 * Check if current user can view user details
 * @param {string} userId - User ID to check
 * @returns {boolean}
 */
function canViewUserDetails(userId) {
    const user = getCurrentUser();
    
    if (!user) return false;
    
    // Admin can view all user details
    if (user.role === 'Admin') return true;
    
    // Users can only view their own details
    if (user.id === userId) return true;
    
    return false;
}

/**
 * Check if current user can edit user details
 * @param {string} userId - User ID to check
 * @returns {boolean}
 */
function canEditUserDetails(userId) {
    const user = getCurrentUser();
    
    if (!user) return false;
    
    // Admin can edit all users
    if (user.role === 'Admin') return true;
    
    // Users can only edit their own details
    if (user.id === userId) return true;
    
    return false;
}

// ==================== REPORTING & AUDIT ====================

/**
 * Check if current user can view reports
 * @returns {boolean}
 */
function canViewReports() {
    return hasRole('Admin');
}

/**
 * Check if current user can view audit logs
 * @returns {boolean}
 */
function canViewAuditLogs() {
    return hasRole('Admin');
}

/**
 * Check if current user can view advanced metrics
 * @returns {boolean}
 */
function canViewAdvancedMetrics() {
    const user = getCurrentUser();
    
    if (!user) return false;
    
    // Admin always has access
    if (user.role === 'Admin') return true;
    
    // Others if they enabled it in preferences
    return user.preferences && user.preferences.advancedMetrics === true;
}

// ==================== PERMISSION SUMMARY ====================

/**
 * Get comprehensive permission summary for current user
 */
function getPermissionSummary() {
    const user = getCurrentUser();
    
    if (!user) {
        return {
            authenticated: false,
            role: null,
            permissions: {}
        };
    }
    
    return {
        authenticated: true,
        userId: user.id,
        role: user.role,
        name: user.name,
        permissions: {
            // Features
            canAccessDashboard: canAccessFeature('dashboard'),
            canAccessKanban: canAccessFeature('kanban'),
            canAccessSettings: canAccessFeature('settings'),
            canAccessUsers: canAccessFeature('users'),
            canAccessReports: canAccessFeature('reports'),
            
            // Task management
            canCreateTask: canCreateTask(),
            canViewReports: canViewReports(),
            canViewAuditLogs: canViewAuditLogs(),
            canManageUsers: canManageUsers(),
            canViewAdvancedMetrics: canViewAdvancedMetrics(),
            
            // Navigation
            navItems: getAccessibleNavItems()
        }
    };
}

// ==================== DEMO CREDENTIALS ====================

/**
 * Get demo credentials for login hints
 */
function getDemoCredentials() {
    return [
        {
            role: 'Admin',
            username: 'admin@example.com',
            password: 'admin123',
            description: 'Full system access'
        },
        {
            role: 'User',
            username: 'user@example.com',
            password: 'user123',
            description: 'Task management only'
        },
        {
            role: 'Sales',
            username: 'sales@example.com',
            password: 'sales123',
            description: 'Sales focused access'
        }
    ];
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Auth
        authenticateUser,
        logoutUser,
        isAuthenticated,
        getCurrentUserRole,
        // RBAC
        hasRole,
        canAccessFeature,
        getAccessibleNavItems,
        // Task permissions
        canViewTask,
        canEditTask,
        canDeleteTask,
        canMoveTask,
        canCreateTask,
        getAllowedTaskStatuses,
        // User management
        canManageUsers,
        canViewUserDetails,
        canEditUserDetails,
        // Reporting
        canViewReports,
        canViewAuditLogs,
        canViewAdvancedMetrics,
        // Summary
        getPermissionSummary,
        // Demo
        getDemoCredentials
    };
}
