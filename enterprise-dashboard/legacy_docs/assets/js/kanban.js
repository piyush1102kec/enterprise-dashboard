/* ==================== KANBAN BOARD MODULE ==================== */

/**
 * Advanced Kanban board with drag-and-drop, filtering, and role-based permissions
 */

// ==================== KANBAN COLUMNS ====================

const kanbanColumns = [
    { id: 'backlog', title: 'Backlog', icon: 'fa-inbox' },
    { id: 'todo', title: 'To Do', icon: 'fa-circle-notch' },
    { id: 'inprogress', title: 'In Progress', icon: 'fa-spinner' },
    { id: 'review', title: 'Review', icon: 'fa-eye' },
    { id: 'done', title: 'Done', icon: 'fa-check-circle' }
];

// ==================== KANBAN RENDERING ====================

/**
 * Render the Kanban board view
 */
function renderKanbanBoard() {
    const kanbanView = document.getElementById('kanban-view');
    
    if (!kanbanView) return;
    
    let kanbanHTML = `
        <div class="section-header">
            <h1 class="section-title">
                <i class="fas fa-kanban"></i>
                Kanban Board
            </h1>
            <p class="section-subtitle">Manage and track your tasks</p>
        </div>
        
        <!-- Kanban Controls -->
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
            <div style="display: flex; gap: 0.5rem; align-items: center;">
                <label style="font-size: 13px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
                    Filter by Tag:
                </label>
                <select id="tag-filter" class="form-input" style="padding: 0.5rem; font-size: 13px;">
                    <option value="all">All Tags</option>
                    <option value="General">General</option>
                    <option value="Admin">Admin</option>
                    <option value="Sales">Sales</option>
                </select>
            </div>
            
            <div style="display: flex; gap: 0.5rem; align-items: center;">
                <label style="font-size: 13px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
                    Filter by Priority:
                </label>
                <select id="priority-filter" class="form-input" style="padding: 0.5rem; font-size: 13px;">
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            
            <div style="display: flex; gap: 0.5rem; align-items: center; flex: 1; min-width: 200px;">
                <label style="font-size: 13px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
                    Search:
                </label>
                <input 
                    type="text" 
                    id="kanban-search" 
                    class="form-input" 
                    placeholder="Search tasks..."
                    style="padding: 0.5rem; font-size: 13px; flex: 1;"
                />
            </div>
            
            <button class="btn btn-primary btn-small" id="add-task-btn">
                <i class="fas fa-plus"></i>
                New Task
            </button>
        </div>
        
        <!-- Kanban Container -->
        <div class="kanban-container" id="kanban-container">
            <!-- Columns populated by JavaScript -->
        </div>
    `;
    
    kanbanView.innerHTML = kanbanHTML;
    
    // Populate kanban columns
    renderKanbanColumns();
    
    // Attach event listeners
    attachKanbanEventListeners();
}

/**
 * Render all kanban columns
 */
function renderKanbanColumns() {
    const container = document.getElementById('kanban-container');
    
    if (!container) return;
    
    let columnsHTML = '';
    
    kanbanColumns.forEach(column => {
        columnsHTML += renderKanbanColumn(column);
    });
    
    container.innerHTML = columnsHTML;
    
    // Setup drag and drop for all columns
    setupDragAndDrop();
}

/**
 * Render a single kanban column
 */
function renderKanbanColumn(column) {
    const tasks = getFilteredTasks().filter(t => {
        const status = t.status.toLowerCase().replace(/\s+/g, '');
        return status === column.id;
    });
    
    const columnTitle = column.title;
    const taskCount = tasks.length;
    
    let columnHTML = `
        <div class="kanban-column" data-column="${column.id}">
            <div class="column-header">
                <div class="column-title">
                    <i class="fas ${column.icon}"></i>
                    ${columnTitle}
                </div>
                <span class="column-count">${taskCount}</span>
            </div>
            
            <div class="tasks-list" data-column="${column.id}">
    `;
    
    tasks.forEach(task => {
        columnHTML += renderTaskCard(task);
    });
    
    columnHTML += `
            </div>
        </div>
    `;
    
    return columnHTML;
}

/**
 * Render a task card
 */
function renderTaskCard(task) {
    const canEdit = canEditTask(task);
    const canDelete = canDeleteTask(task);
    
    const statusMap = {
        'Backlog': 'backlog',
        'To Do': 'todo',
        'In Progress': 'inprogress',
        'Review': 'review',
        'Done': 'done'
    };
    
    const columnId = statusMap[task.status] || 'backlog';
    
    const taskHTML = `
        <div class="task-card" draggable="${canEdit}" data-task-id="${task.id}" data-column="${columnId}">
            <div class="task-id">#${task.id}</div>
            <div class="task-title">${task.title}</div>
            ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
            
            <div class="task-meta">
                <span class="task-tag">${task.tag}</span>
                <span class="task-priority priority-${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>
            </div>
            
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                ${canEdit ? `
                    <button class="btn btn-ghost btn-small edit-task-btn" data-task-id="${task.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                ` : ''}
                ${canDelete ? `
                    <button class="btn btn-ghost btn-small delete-task-btn" data-task-id="${task.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return taskHTML;
}

// ==================== FILTERING ====================

/**
 * Get filtered tasks based on current filter settings
 */
function getFilteredTasks() {
    let tasks = getCurrentUserTasks();
    
    // Apply tag filter
    const tagFilter = appState.ui.kanbanFilters.tag;
    if (tagFilter !== 'all') {
        tasks = tasks.filter(t => t.tag === tagFilter);
    }
    
    // Apply priority filter
    const priorityFilter = appState.ui.kanbanFilters.priority;
    if (priorityFilter !== 'all') {
        tasks = tasks.filter(t => t.priority === priorityFilter);
    }
    
    // Apply search filter
    const searchTerm = document.getElementById('kanban-search')?.value?.toLowerCase() || '';
    if (searchTerm) {
        tasks = tasks.filter(t => 
            t.title.toLowerCase().includes(searchTerm) || 
            t.description.toLowerCase().includes(searchTerm) ||
            t.id.toLowerCase().includes(searchTerm)
        );
    }
    
    return tasks;
}

/**
 * Update kanban view when filters change
 */
function updateKanbanFilters() {
    renderKanbanColumns();
}

// ==================== DRAG AND DROP ====================

/**
 * Setup drag and drop functionality
 */
function setupDragAndDrop() {
    // Drag events for task cards
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('dragstart', handleTaskDragStart);
        card.addEventListener('dragend', handleTaskDragEnd);
    });
    
    // Drop events for task lists
    document.querySelectorAll('.tasks-list').forEach(list => {
        list.addEventListener('dragover', handleTaskDragOver);
        list.addEventListener('drop', handleTaskDrop);
        list.addEventListener('dragleave', handleTaskDragLeave);
    });
}

/**
 * Handle task drag start
 */
function handleTaskDragStart(e) {
    const taskId = this.dataset.taskId;
    const task = getTaskById(taskId);
    
    // Check permission
    if (!canMoveTask(task, task.status)) {
        e.preventDefault();
        showToast('You do not have permission to move this task', 'warning');
        return;
    }
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
    
    this.classList.add('dragging');
}

/**
 * Handle task drag end
 */
function handleTaskDragEnd(e) {
    this.classList.remove('dragging');
    
    document.querySelectorAll('.tasks-list').forEach(list => {
        list.classList.remove('drag-over');
    });
}

/**
 * Handle task drag over
 */
function handleTaskDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    this.classList.add('drag-over');
}

/**
 * Handle task drag leave
 */
function handleTaskDragLeave(e) {
    if (e.target === this) {
        this.classList.remove('drag-over');
    }
}

/**
 * Handle task drop
 */
function handleTaskDrop(e) {
    e.preventDefault();
    
    this.classList.remove('drag-over');
    
    const taskId = e.dataTransfer.getData('text/plain');
    const targetColumn = this.dataset.column;
    
    if (!taskId || !targetColumn) return;
    
    const task = getTaskById(taskId);
    
    if (!task) return;
    
    // Map column ID to status
    const columnToStatusMap = {
        'backlog': 'Backlog',
        'todo': 'To Do',
        'inprogress': 'In Progress',
        'review': 'Review',
        'done': 'Done'
    };
    
    const newStatus = columnToStatusMap[targetColumn];
    
    if (!newStatus) return;
    
    // Check permission
    if (!canMoveTask(task, newStatus)) {
        showToast(`You cannot move tasks to ${newStatus} status`, 'warning');
        return;
    }
    
    // Check if status actually changed
    if (task.status === newStatus) {
        return;
    }
    
    // Update task status
    updateTask(taskId, { status: newStatus });
    
    showToast(`Task moved to ${newStatus}`, 'success');
    
    // Refresh kanban board
    renderKanbanColumns();
}

// ==================== TASK MODAL ====================

/**
 * Open task editing modal
 */
function openTaskModal(taskId = null) {
    const modalContainer = document.getElementById('modal-container');
    
    if (!modalContainer) return;
    
    let task = null;
    let isNewTask = !taskId;
    
    if (taskId) {
        task = getTaskById(taskId);
        if (!task) {
            showToast('Task not found', 'error');
            return;
        }
        
        // Check edit permission
        if (!canEditTask(task)) {
            showToast('You do not have permission to edit this task', 'warning');
            return;
        }
    }
    
    const title = isNewTask ? 'Create New Task' : 'Edit Task';
    const allowedStatuses = getAllowedTaskStatuses();
    
    let modalHTML = `
        <div class="modal-container">
            <div class="modal-overlay" id="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${title}</h2>
                </div>
                
                <div class="modal-body">
                    <form id="task-form">
                        <div class="form-group">
                            <label class="form-label">Task Title *</label>
                            <input 
                                type="text" 
                                id="task-title" 
                                class="form-input" 
                                value="${task?.title || ''}"
                                placeholder="Enter task title"
                                required
                            />
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea 
                                id="task-description" 
                                class="form-input" 
                                rows="3"
                                placeholder="Enter task description"
                                style="resize: vertical;"
                            >${task?.description || ''}</textarea>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="form-group">
                                <label class="form-label">Tag *</label>
                                <select id="task-tag" class="form-input" required>
                                    <option value="">Select Tag</option>
                                    <option value="General" ${task?.tag === 'General' ? 'selected' : ''}>General</option>
                                    <option value="Admin" ${task?.tag === 'Admin' ? 'selected' : ''}>Admin</option>
                                    <option value="Sales" ${task?.tag === 'Sales' ? 'selected' : ''}>Sales</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Priority *</label>
                                <select id="task-priority" class="form-input" required>
                                    <option value="low" ${task?.priority === 'low' ? 'selected' : ''}>Low</option>
                                    <option value="medium" ${task?.priority === 'medium' ? 'selected' : ''}>Medium</option>
                                    <option value="high" ${task?.priority === 'high' ? 'selected' : ''}>High</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Status *</label>
                            <select id="task-status" class="form-input" required>
                                ${allowedStatuses.map(status => `
                                    <option value="${status}" ${task?.status === status ? 'selected' : ''}>
                                        ${status}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                    </form>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="close-modal-btn">Cancel</button>
                    <button class="btn btn-primary" id="save-task-btn">
                        <i class="fas fa-save"></i>
                        ${isNewTask ? 'Create Task' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modalContainer.innerHTML = modalHTML;
    appState.ui.modalOpen = true;
    appState.ui.modalData = { taskId, isNewTask };
    
    // Attach modal event listeners
    attachTaskModalEventListeners(taskId, isNewTask);
}

/**
 * Close task modal
 */
function closeTaskModal() {
    const modalContainer = document.getElementById('modal-container');
    
    if (modalContainer) {
        modalContainer.innerHTML = '';
    }
    
    appState.ui.modalOpen = false;
    appState.ui.modalData = null;
}

/**
 * Attach event listeners to task modal
 */
function attachTaskModalEventListeners(taskId, isNewTask) {
    const closeBtn = document.getElementById('close-modal-btn');
    const saveBtn = document.getElementById('save-task-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (closeBtn) closeBtn.addEventListener('click', closeTaskModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeTaskModal);
    if (saveBtn) saveBtn.addEventListener('click', () => handleTaskSave(taskId, isNewTask));
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && appState.ui.modalOpen) {
            closeTaskModal();
        }
    });
}

/**
 * Handle task save
 */
function handleTaskSave(taskId, isNewTask) {
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();
    const tag = document.getElementById('task-tag').value;
    const priority = document.getElementById('task-priority').value;
    const status = document.getElementById('task-status').value;
    
    // Validation
    if (!title) {
        showToast('Task title is required', 'warning');
        return;
    }
    
    if (!tag) {
        showToast('Please select a tag', 'warning');
        return;
    }
    
    if (isNewTask) {
        // Create new task
        const newTask = addTask({
            title,
            description,
            tag,
            priority,
            status,
            ownerRole: getCurrentUserRole(),
            assignedUser: getCurrentUser().id
        });
        
        showToast('Task created successfully', 'success');
    } else {
        // Update existing task
        updateTask(taskId, {
            title,
            description,
            tag,
            priority,
            status
        });
        
        showToast('Task updated successfully', 'success');
    }
    
    closeTaskModal();
    renderKanbanColumns();
}

/**
 * Handle task delete
 */
function handleTaskDelete(taskId) {
    const task = getTaskById(taskId);
    
    if (!task) return;
    
    if (!canDeleteTask(task)) {
        showToast('You do not have permission to delete this task', 'warning');
        return;
    }
    
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
        deleteTask(taskId);
        showToast('Task deleted successfully', 'success');
        renderKanbanColumns();
    }
}

// ==================== EVENT LISTENERS ====================

/**
 * Attach event listeners to kanban board
 */
function attachKanbanEventListeners() {
    // Add task button
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => openTaskModal());
    }
    
    // Edit task buttons
    document.querySelectorAll('.edit-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const taskId = btn.dataset.taskId;
            openTaskModal(taskId);
        });
    });
    
    // Delete task buttons
    document.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const taskId = btn.dataset.taskId;
            handleTaskDelete(taskId);
        });
    });
    
    // Filter change listeners
    const tagFilter = document.getElementById('tag-filter');
    const priorityFilter = document.getElementById('priority-filter');
    const searchInput = document.getElementById('kanban-search');
    
    if (tagFilter) {
        tagFilter.addEventListener('change', (e) => {
            setKanbanFilters({ tag: e.target.value });
            updateKanbanFilters();
        });
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', (e) => {
            setKanbanFilters({ priority: e.target.value });
            updateKanbanFilters();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            updateKanbanFilters();
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderKanbanBoard,
        renderKanbanColumns,
        renderKanbanColumn,
        renderTaskCard,
        getFilteredTasks,
        updateKanbanFilters,
        setupDragAndDrop,
        handleTaskDragStart,
        handleTaskDragEnd,
        handleTaskDragOver,
        handleTaskDragLeave,
        handleTaskDrop,
        openTaskModal,
        closeTaskModal,
        attachTaskModalEventListeners,
        handleTaskSave,
        handleTaskDelete,
        attachKanbanEventListeners
    };
}
