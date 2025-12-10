/* ==================== SETTINGS MODULE ==================== */

/**
 * User settings and preferences management
 */

// ==================== SETTINGS RENDERING ====================

/**
 * Render the settings view
 */
function renderSettings() {
    const settingsView = document.getElementById('settings-view');
    
    if (!settingsView) return;
    
    const user = getCurrentUser();
    
    let settingsHTML = `
        <div class="section-header">
            <h1 class="section-title">
                <i class="fas fa-cog"></i>
                Settings & Preferences
            </h1>
            <p class="section-subtitle">Manage your account and application preferences</p>
        </div>
        
        <div class="settings-grid">
            <!-- Profile Section -->
            ${renderProfileSettings(user)}
            
            <!-- Preferences Section -->
            ${renderPreferenceSettings(user)}
        </div>
    `;
    
    if (user.role === 'Admin') {
        settingsHTML += `
            <div style="margin-top: 2rem;">
                ${renderAdvancedSettings(user)}
            </div>
        `;
    }
    
    settingsView.innerHTML = settingsHTML;
    
    // Attach event listeners
    attachSettingsEventListeners();
}

// ==================== PROFILE SETTINGS ====================

/**
 * Render profile settings section
 */
function renderProfileSettings(user) {
    const avatarOptions = ['SA', 'MC', 'JR', 'AB'];
    
    return `
        <div class="settings-section">
            <h3 class="settings-title">
                <i class="fas fa-user"></i>
                Profile Information
            </h3>
            
            <form id="profile-form">
                <!-- Avatar Selection -->
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">Avatar</label>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
                        ${avatarOptions.map(avatar => `
                            <label style="display: flex; align-items: center; cursor: pointer; padding: 0.75rem; border: 2px solid var(--color-border); border-radius: var(--radius-md); transition: all var(--transition-base); ${user.avatar === avatar ? 'border-color: var(--color-primary); background-color: var(--color-primary-soft);' : 'hover:border-color: var(--color-primary);'}">
                                <input 
                                    type="radio" 
                                    name="avatar" 
                                    value="${avatar}" 
                                    ${user.avatar === avatar ? 'checked' : ''}
                                    style="margin-right: 0.5rem;"
                                />
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                                    ${avatar}
                                </div>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Name -->
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input 
                        type="text" 
                        id="profile-name" 
                        name="name"
                        class="form-input" 
                        value="${user.name}"
                        required
                    />
                    <div class="form-error" id="name-error"></div>
                </div>
                
                <!-- Email (readonly) -->
                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input 
                        type="email" 
                        class="form-input" 
                        value="${user.email}"
                        disabled
                        style="background-color: var(--color-surface-alt); cursor: not-allowed;"
                    />
                    <div style="font-size: 12px; color: var(--color-text-muted); margin-top: 0.5rem;">
                        <i class="fas fa-lock"></i>
                        Email is managed by administrators
                    </div>
                </div>
                
                <!-- Phone -->
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input 
                        type="tel" 
                        id="profile-phone" 
                        name="phone"
                        class="form-input" 
                        value="${user.phone}"
                        pattern="[\\d\\-+() ]+"
                    />
                    <div class="form-error" id="phone-error"></div>
                </div>
                
                <!-- Role (readonly) -->
                <div class="form-group">
                    <label class="form-label">Role</label>
                    <input 
                        type="text" 
                        class="form-input" 
                        value="${user.role}"
                        disabled
                        style="background-color: var(--color-surface-alt); cursor: not-allowed;"
                    />
                    <div style="font-size: 12px; color: var(--color-text-muted); margin-top: 0.5rem;">
                        <i class="fas fa-lock"></i>
                        Role is assigned by administrators
                    </div>
                </div>
                
                <!-- Account Info -->
                <div style="background-color: var(--color-bg); padding: 1rem; border-radius: var(--radius-md); margin-top: 1rem; font-size: 12px; color: var(--color-text-muted);">
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Account Created:</strong> ${new Date(user.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                        <strong>Last Login:</strong> ${new Date(user.lastLogin).toLocaleDateString()}
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">
                    <i class="fas fa-save"></i>
                    Save Profile Changes
                </button>
            </form>
        </div>
    `;
}

// ==================== PREFERENCE SETTINGS ====================

/**
 * Render preference settings section
 */
function renderPreferenceSettings(user) {
    const theme = user.preferences.theme || 'dark';
    const density = user.preferences.layoutDensity || 'normal';
    
    return `
        <div class="settings-section">
            <h3 class="settings-title">
                <i class="fas fa-sliders-h"></i>
                Preferences
            </h3>
            
            <form id="preferences-form">
                <!-- Theme -->
                <div class="settings-item" style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
                    <div>
                        <div class="settings-label">Theme</div>
                        <div class="settings-description">Choose between light and dark theme</div>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input 
                                type="radio" 
                                name="theme" 
                                value="light"
                                ${theme === 'light' ? 'checked' : ''}
                                style="margin-right: 0.5rem;"
                            />
                            <span><i class="fas fa-sun"></i> Light</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input 
                                type="radio" 
                                name="theme" 
                                value="dark"
                                ${theme === 'dark' ? 'checked' : ''}
                                style="margin-right: 0.5rem;"
                            />
                            <span><i class="fas fa-moon"></i> Dark</span>
                        </label>
                    </div>
                </div>
                
                <!-- Layout Density -->
                <div class="settings-item" style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
                    <div>
                        <div class="settings-label">Layout Density</div>
                        <div class="settings-description">Adjust spacing and element sizes</div>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input 
                                type="radio" 
                                name="layoutDensity" 
                                value="compact"
                                ${density === 'compact' ? 'checked' : ''}
                                style="margin-right: 0.5rem;"
                            />
                            <span>Compact</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input 
                                type="radio" 
                                name="layoutDensity" 
                                value="normal"
                                ${density === 'normal' ? 'checked' : ''}
                                style="margin-right: 0.5rem;"
                            />
                            <span>Normal</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input 
                                type="radio" 
                                name="layoutDensity" 
                                value="spacious"
                                ${density === 'spacious' ? 'checked' : ''}
                                style="margin-right: 0.5rem;"
                            />
                            <span>Spacious</span>
                        </label>
                    </div>
                </div>
                
                <!-- Advanced Metrics (visible to all users) -->
                <div class="settings-item" style="border-bottom: none; padding-bottom: 1.5rem;">
                    <div>
                        <div class="settings-label">Advanced Metrics</div>
                        <div class="settings-description">Show detailed analytics on dashboard</div>
                    </div>
                    <label class="toggle-switch">
                        <input 
                            type="checkbox" 
                            id="advanced-metrics-toggle"
                            ${user.preferences.advancedMetrics ? 'checked' : ''}
                        />
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">
                    <i class="fas fa-save"></i>
                    Save Preferences
                </button>
            </form>
        </div>
    `;
}

// ==================== ADVANCED SETTINGS (ADMIN ONLY) ====================

/**
 * Render advanced settings section (Admin only)
 */
function renderAdvancedSettings(user) {
    if (user.role !== 'Admin') return '';
    
    return `
        <div class="settings-section">
            <h3 class="settings-title">
                <i class="fas fa-shield-alt"></i>
                Advanced Settings
            </h3>
            <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 1rem;">
                Administrative options for system management
            </p>
            
            <div class="settings-item" style="border-bottom: 1px solid var(--color-border); padding: 1rem 0;">
                <div>
                    <div class="settings-label">System Notifications</div>
                    <div class="settings-description">Receive alerts for critical system events</div>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" checked />
                    <span class="toggle-slider"></span>
                </label>
            </div>
            
            <div class="settings-item" style="border-bottom: 1px solid var(--color-border); padding: 1rem 0;">
                <div>
                    <div class="settings-label">Audit Logging</div>
                    <div class="settings-description">Log all user actions for compliance</div>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" checked />
                    <span class="toggle-slider"></span>
                </label>
            </div>
            
            <div class="settings-item" style="border-bottom: none; padding: 1rem 0;">
                <div>
                    <div class="settings-label">Maintenance Mode</div>
                    <div class="settings-description">Restrict access to perform maintenance</div>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" />
                    <span class="toggle-slider"></span>
                </label>
            </div>
            
            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
                <button class="btn btn-ghost" id="export-data-btn">
                    <i class="fas fa-download"></i>
                    Export System Data
                </button>
                <button class="btn btn-danger" style="margin-left: 1rem;" id="clear-cache-btn">
                    <i class="fas fa-trash"></i>
                    Clear Cache
                </button>
            </div>
        </div>
    `;
}

// ==================== EVENT LISTENERS ====================

/**
 * Attach event listeners to settings form
 */
function attachSettingsEventListeners() {
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileFormSubmit);
    }
    
    // Preferences form
    const preferencesForm = document.getElementById('preferences-form');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', handlePreferencesFormSubmit);
    }
    
    // Advanced settings buttons
    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExportData);
    }
    
    const clearCacheBtn = document.getElementById('clear-cache-btn');
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', handleClearCache);
    }
}

/**
 * Handle profile form submission
 */
function handleProfileFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('profile-name').value.trim();
    const phone = document.getElementById('profile-phone').value.trim();
    const avatar = document.querySelector('input[name="avatar"]:checked').value;
    
    // Clear error messages
    document.getElementById('name-error').textContent = '';
    document.getElementById('phone-error').textContent = '';
    
    // Validation
    if (!name) {
        document.getElementById('name-error').textContent = 'Name is required';
        return;
    }
    
    if (name.length < 3) {
        document.getElementById('name-error').textContent = 'Name must be at least 3 characters';
        return;
    }
    
    if (phone && phone.length < 10) {
        document.getElementById('phone-error').textContent = 'Phone must be at least 10 characters';
        return;
    }
    
    // Update user
    const user = getCurrentUser();
    user.name = name;
    user.phone = phone;
    user.avatar = avatar;
    
    // Save to state
    setCurrentUser(user);
    
    // Update the user in users array
    const userIndex = appState.users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        appState.users[userIndex] = user;
    }
    
    saveStateToLocalStorage();
    
    // Update UI
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = user.name;
    }
    
    const userAvatarElement = document.getElementById('user-avatar');
    if (userAvatarElement) {
        userAvatarElement.textContent = user.avatar;
    }
    
    showToast('Profile updated successfully', 'success');
}

/**
 * Handle preferences form submission
 */
function handlePreferencesFormSubmit(e) {
    e.preventDefault();
    
    const theme = document.querySelector('input[name="theme"]:checked').value;
    const layoutDensity = document.querySelector('input[name="layoutDensity"]:checked').value;
    const advancedMetrics = document.getElementById('advanced-metrics-toggle').checked;
    
    // Update preferences
    updateUserPreferences({
        theme,
        layoutDensity,
        advancedMetrics
    });
    
    // Apply theme change
    applyTheme();
    
    showToast('Preferences updated successfully', 'success');
}

/**
 * Handle export data button
 */
function handleExportData() {
    const exportData = {
        exportDate: new Date().toISOString(),
        currentUser: getCurrentUser(),
        users: appState.users,
        tasks: appState.tasks
    };
    
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-export-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    showToast('Data exported successfully', 'success');
}

/**
 * Handle clear cache button
 */
function handleClearCache() {
    if (confirm('Are you sure you want to clear the cache? This will reload the application.')) {
        localStorage.clear();
        showToast('Cache cleared', 'success');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderSettings,
        renderProfileSettings,
        renderPreferenceSettings,
        renderAdvancedSettings,
        attachSettingsEventListeners,
        handleProfileFormSubmit,
        handlePreferencesFormSubmit,
        handleExportData,
        handleClearCache
    };
}
