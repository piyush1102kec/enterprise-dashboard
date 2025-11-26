/* ==================== STATE MANAGEMENT MODULE ==================== */

/**
 * Global Application State
 * Manages all data models, localStorage persistence, and state initialization
 */

// ==================== DATA MODELS ====================

const users = [
    {
        id: 'user-1',
        username: 'admin@example.com',
        password: 'admin123',
        role: 'Admin',
        name: 'Sarah Anderson',
        email: 'sarah.anderson@enterprise.com',
        phone: '+1-555-0101',
        avatar: 'SA',
        preferences: {
            theme: 'dark',
            layoutDensity: 'normal',
            advancedMetrics: true
        },
        createdAt: new Date('2024-01-01'),
        lastLogin: new Date('2024-01-15')
    },
    {
        id: 'user-2',
        username: 'user@example.com',
        password: 'user123',
        role: 'User',
        name: 'Michael Chen',
        email: 'michael.chen@enterprise.com',
        phone: '+1-555-0102',
        avatar: 'MC',
        preferences: {
            theme: 'dark',
            layoutDensity: 'normal',
            advancedMetrics: false
        },
        createdAt: new Date('2024-01-05'),
        lastLogin: new Date('2024-01-16')
    },
    {
        id: 'user-3',
        username: 'sales@example.com',
        password: 'sales123',
        role: 'Sales',
        name: 'Jessica Rivera',
        email: 'jessica.rivera@enterprise.com',
        phone: '+1-555-0103',
        avatar: 'JR',
        preferences: {
            theme: 'dark',
            layoutDensity: 'normal',
            advancedMetrics: false
        },
        createdAt: new Date('2024-01-10'),
        lastLogin: new Date('2024-01-14')
    }
];

const tasks = [
    {
        id: 'task-1',
        title: 'Complete Q1 Budget Review',
        description: 'Review and finalize all Q1 budget allocations across departments',
        status: 'In Progress',
        tag: 'Admin',
        priority: 'high',
        ownerRole: 'Admin',
        assignedUser: 'user-1',
        createdAt: new Date('2024-01-10'),
        dueDate: new Date('2024-02-01')
    },
    {
        id: 'task-2',
        title: 'Update User Documentation',
        description: 'Revise API documentation with latest endpoints and authentication methods',
        status: 'To Do',
        tag: 'General',
        priority: 'medium',
        ownerRole: 'User',
        assignedUser: 'user-2',
        createdAt: new Date('2024-01-12'),
        dueDate: new Date('2024-02-05')
    },
    {
        id: 'task-3',
        title: 'Contact Top 10 Leads',
        description: 'Reach out to qualified leads for initial product demonstration',
        status: 'Backlog',
        tag: 'Sales',
        priority: 'high',
        ownerRole: 'Sales',
        assignedUser: 'user-3',
        createdAt: new Date('2024-01-08'),
        dueDate: new Date('2024-01-25')
    },
    {
        id: 'task-4',
        title: 'Review System Permissions',
        description: 'Audit and update user access levels across all modules',
        status: 'To Do',
        tag: 'Admin',
        priority: 'high',
        ownerRole: 'Admin',
        assignedUser: 'user-1',
        createdAt: new Date('2024-01-13'),
        dueDate: new Date('2024-02-03')
    },
    {
        id: 'task-5',
        title: 'Quarterly Sales Report',
        description: 'Compile and analyze sales performance metrics for Q4 2023',
        status: 'In Progress',
        tag: 'Sales',
        priority: 'high',
        ownerRole: 'Sales',
        assignedUser: 'user-3',
        createdAt: new Date('2024-01-11'),
        dueDate: new Date('2024-01-31')
    },
    {
        id: 'task-6',
        title: 'Feature Implementation Sprint',
        description: 'Complete development tasks for the new dashboard widgets module',
        status: 'In Progress',
        tag: 'General',
        priority: 'medium',
        ownerRole: 'User',
        assignedUser: 'user-2',
        createdAt: new Date('2024-01-09'),
        dueDate: new Date('2024-02-08')
    },
    {
        id: 'task-7',
        title: 'Database Performance Optimization',
        description: 'Optimize slow queries and implement caching strategies',
        status: 'To Do',
        tag: 'General',
        priority: 'medium',
        ownerRole: 'User',
        assignedUser: 'user-2',
        createdAt: new Date('2024-01-14'),
        dueDate: new Date('2024-02-10')
    },
    {
        id: 'task-8',
        title: 'Client Onboarding Process',
        description: 'Define and document the new client onboarding workflow',
        status: 'Backlog',
        tag: 'Sales',
        priority: 'medium',
        ownerRole: 'Sales',
        assignedUser: 'user-3',
        createdAt: new Date('2024-01-07'),
        dueDate: new Date('2024-02-15')
    },
    {
        id: 'task-9',
        title: 'Implement Error Logging',
        description: 'Set up comprehensive error logging and monitoring system',
        status: 'Done',
        tag: 'Admin',
        priority: 'high',
        ownerRole: 'Admin',
        assignedUser: 'user-1',
        createdAt: new Date('2024-01-05'),
        dueDate: new Date('2024-01-20')
    },
    {
        id: 'task-10',
        title: 'Enterprise License Renewal',
        description: 'Process annual software license renewals and budget allocation',
        status: 'Done',
        tag: 'Admin',
        priority: 'high',
        ownerRole: 'Admin',
        assignedUser: 'user-1',
        createdAt: new Date('2024-01-01'),
        dueDate: new Date('2024-01-15')
    }
];

// ==================== APPLICATION STATE ====================

const appState = {
    // Current authenticated user
    currentUser: null,
    
    // All users in the system
    users: users,
    
    // All tasks in the system
    tasks: tasks,
    
    // UI state
    ui: {
        // Current active view: 'login', 'dashboard', 'kanban', 'settings', 'users', 'reports'
        activeView: 'login',
        
        // Sidebar open/close state
        sidebarOpen: window.innerWidth > 768,
        
        // Current theme
        theme: 'dark',
        
        // Modal state
        modalOpen: false,
        modalType: null,
        modalData: null,
        
        // Kanban filters
        kanbanFilters: {
            tag: 'all',
            priority: 'all'
        }
    },
    
    // Notification/activity log
    notifications: []
};

// ==================== LOCALSTORAGE UTILITIES ====================

/**
 * Save entire application state to localStorage
 */
function saveStateToLocalStorage() {
    try {
        const stateToSave = {
            currentUser: appState.currentUser,
            tasks: appState.tasks,
            users: appState.users.map(user => ({
                ...user,
                preferences: user.preferences
            })),
            ui: appState.ui
        };
        
        localStorage.setItem('appState', JSON.stringify(stateToSave));
        console.log('✓ State saved to localStorage');
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
}

/**
 * Load application state from localStorage
 */
function loadStateFromLocalStorage() {
    try {
        const savedState = localStorage.getItem('appState');
        
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            
            // Restore current user if session exists
            if (parsedState.currentUser) {
                appState.currentUser = parsedState.currentUser;
                appState.ui.activeView = 'dashboard';
            }
            
            // Restore tasks
            if (parsedState.tasks) {
                appState.tasks = parsedState.tasks;
            }
            
            // Restore user preferences
            if (parsedState.users) {
                appState.users = parsedState.users;
            }
            
            // Restore UI state
            if (parsedState.ui) {
                appState.ui = {
                    ...appState.ui,
                    ...parsedState.ui
                };
            }
            
            console.log('✓ State loaded from localStorage');
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return false;
    }
}

/**
 * Clear all stored data (logout)
 */
function clearLocalStorage() {
    localStorage.removeItem('appState');
    appState.currentUser = null;
    appState.ui.activeView = 'login';
    console.log('✓ LocalStorage cleared');
}

// ==================== STATE QUERIES ====================

/**
 * Get current user object
 */
function getCurrentUser() {
    return appState.currentUser;
}

/**
 * Get user by ID
 */
function getUserById(userId) {
    return appState.users.find(u => u.id === userId);
}

/**
 * Get user by username
 */
function getUserByUsername(username) {
    return appState.users.find(u => u.username === username);
}

/**
 * Get all tasks for current user
 */
function getCurrentUserTasks() {
    if (!appState.currentUser) return [];
    
    const role = appState.currentUser.role;
    
    // Admin: see all tasks
    if (role === 'Admin') {
        return appState.tasks;
    }
    
    // User: see only own tasks
    if (role === 'User') {
        return appState.tasks.filter(t => t.assignedUser === appState.currentUser.id);
    }
    
    // Sales: see only Sales-tagged tasks
    if (role === 'Sales') {
        return appState.tasks.filter(t => t.tag === 'Sales');
    }
    
    return [];
}

/**
 * Get tasks by status
 */
function getTasksByStatus(status) {
    return getCurrentUserTasks().filter(t => t.status === status);
}

/**
 * Get task by ID
 */
function getTaskById(taskId) {
    return appState.tasks.find(t => t.id === taskId);
}

/**
 * Get task counts for KPI cards
 */
function getTaskCounts() {
    const userTasks = getCurrentUserTasks();
    
    return {
        total: userTasks.length,
        backlog: userTasks.filter(t => t.status === 'Backlog').length,
        todo: userTasks.filter(t => t.status === 'To Do').length,
        inProgress: userTasks.filter(t => t.status === 'In Progress').length,
        done: userTasks.filter(t => t.status === 'Done').length
    };
}

/**
 * Get recent tasks (for dashboard preview)
 */
function getRecentTasks(limit = 5) {
    return getCurrentUserTasks()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
}

// ==================== STATE MUTATIONS ====================

/**
 * Update current user
 */
function setCurrentUser(user) {
    appState.currentUser = user;
    appState.ui.activeView = 'dashboard';
    saveStateToLocalStorage();
}

/**
 * Update user preferences
 */
function updateUserPreferences(preferences) {
    if (appState.currentUser) {
        appState.currentUser.preferences = {
            ...appState.currentUser.preferences,
            ...preferences
        };
        
        // Also update in users array
        const userIndex = appState.users.findIndex(u => u.id === appState.currentUser.id);
        if (userIndex !== -1) {
            appState.users[userIndex].preferences = appState.currentUser.preferences;
        }
        
        saveStateToLocalStorage();
    }
}

/**
 * Add new task
 */
function addTask(taskData) {
    const newTask = {
        id: `task-${Date.now()}`,
        createdAt: new Date(),
        ...taskData
    };
    
    appState.tasks.push(newTask);
    saveStateToLocalStorage();
    return newTask;
}

/**
 * Update existing task
 */
function updateTask(taskId, updates) {
    const taskIndex = appState.tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
        appState.tasks[taskIndex] = {
            ...appState.tasks[taskIndex],
            ...updates
        };
        saveStateToLocalStorage();
        return appState.tasks[taskIndex];
    }
    
    return null;
}

/**
 * Delete task
 */
function deleteTask(taskId) {
    const index = appState.tasks.findIndex(t => t.id === taskId);
    
    if (index !== -1) {
        appState.tasks.splice(index, 1);
        saveStateToLocalStorage();
        return true;
    }
    
    return false;
}

/**
 * Update UI state
 */
function updateUIState(uiUpdates) {
    appState.ui = {
        ...appState.ui,
        ...uiUpdates
    };
    saveStateToLocalStorage();
}

/**
 * Switch active view
 */
function setActiveView(viewName) {
    appState.ui.activeView = viewName;
    saveStateToLocalStorage();
}

/**
 * Toggle sidebar
 */
function toggleSidebar() {
    appState.ui.sidebarOpen = !appState.ui.sidebarOpen;
    saveStateToLocalStorage();
}

/**
 * Update kanban filters
 */
function setKanbanFilters(filters) {
    appState.ui.kanbanFilters = {
        ...appState.ui.kanbanFilters,
        ...filters
    };
    updateUIState(appState.ui);
}

// ==================== INITIALIZATION ====================

/**
 * Initialize application state
 */
function initializeAppState() {
    console.log('Initializing application state...');
    
    // Try to restore from localStorage
    const hasSession = loadStateFromLocalStorage();
    
    // Default theme
    if (appState.currentUser) {
        appState.ui.theme = appState.currentUser.preferences.theme || 'dark';
    } else {
        appState.ui.activeView = 'login';
    }
    
    console.log('✓ Application state initialized');
    console.log('Current view:', appState.ui.activeView);
    console.log('Current user:', appState.currentUser?.name || 'Not logged in');
    
    return appState;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        appState,
        users,
        tasks,
        // Utilities
        saveStateToLocalStorage,
        loadStateFromLocalStorage,
        clearLocalStorage,
        // Queries
        getCurrentUser,
        getUserById,
        getUserByUsername,
        getCurrentUserTasks,
        getTasksByStatus,
        getTaskById,
        getTaskCounts,
        getRecentTasks,
        // Mutations
        setCurrentUser,
        updateUserPreferences,
        addTask,
        updateTask,
        deleteTask,
        updateUIState,
        setActiveView,
        toggleSidebar,
        setKanbanFilters,
        // Init
        initializeAppState
    };
}
