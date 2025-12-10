# Enterprise Dashboard - Role-Based Control Center

A production-quality, enterprise-grade role-based dashboard application built with **vanilla HTML, CSS, and JavaScript (ES6+)**. No frameworks, no bundlers, no external dependencies.

## 🚀 Features

### Core Functionality
- **Role-Based Access Control (RBAC)** - Three distinct roles with granular permissions
  - **Admin** - Full system access, user management, reports, audit logs
  - **User** - Task management (own tasks only), basic dashboard
  - **Sales** - Sales-focused dashboard, pipeline management
- **Authentication System** - Frontend session management with localStorage persistence
- **Advanced Kanban Board** - Drag-and-drop task management with filtering and search
- **Dashboard Home** - KPI cards, charts, analytics, recent activity
- **Settings & Preferences** - Profile management, theme customization, advanced options
- **Dark/Light Theme** - Persistent theme preference with smooth transitions
- **Responsive Design** - Mobile-first approach with collapsible sidebar

### Technical Highlights
- **Modular Architecture** - Separate JS modules for clean separation of concerns
- **State Management** - Global application state with localStorage persistence
- **Drag-and-Drop** - HTML5 native drag-drop with permission checking
- **Permission System** - Granular task-level permissions
- **Toast Notifications** - Non-intrusive user feedback system
- **Modal Dialogs** - Forms and confirmations for task management
- **LocalStorage Persistence** - All user data and preferences automatically saved

## 📁 Project Structure

```
enterprise-dashboard/
├── index.html                    # Main application entry point
├── assets/
│   ├── css/
│   │   └── styles.css           # Complete enterprise styling
│   └── js/
│       ├── state.js             # State management & data models
│       ├── auth.js              # Authentication & RBAC
│       ├── ui-layout.js         # Main layout rendering
│       ├── dashboard.js         # Dashboard view
│       ├── kanban.js            # Kanban board
│       ├── settings.js          # Settings & preferences
│       └── app.js               # Application orchestrator
└── README.md                     # This file
```

## 🏃 Getting Started

### Requirements
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser
- No build process or dependencies to install

### Quick Start

1. **Open the application**
   ```
   Simply open index.html in a web browser
   ```

2. **Login with demo credentials**
   - **Admin Role**: admin@example.com / admin123
   - **User Role**: user@example.com / user123
   - **Sales Role**: sales@example.com / sales123

3. **Explore the dashboard**
   - Click the demo buttons on login page for quick access
   - Navigate using the sidebar menu
   - Try different features and roles

## 👥 User Roles & Permissions

### Admin Role
- Full access to all features
- User management capabilities
- System reports and analytics
- Audit logging access
- Advanced metrics viewing
- Can move tasks between any status
- Can delete any task

### User Role
- Dashboard access with personal metrics
- Kanban board with own tasks only
- Task creation (own tasks only)
- Cannot move to "Review" or "Done" status
- Cannot delete tasks created by others
- Settings access
- Profile customization

### Sales Role
- Sales-focused dashboard
- Kanban board with Sales-tagged tasks only
- Sales pipeline metrics
- Cannot move to "Review" or "Done" status
- Limited task management
- Settings access

## 🎨 Styling System

### CSS Variables
The application uses a comprehensive CSS variable system for consistent theming:

```css
/* Colors */
--color-bg              /* Background */
--color-surface         /* Surface */
--color-primary         /* Primary brand color */
--color-success         /* Success state */
--color-warning         /* Warning state */
--color-danger          /* Danger state */
--color-text            /* Text color */
--color-text-muted      /* Muted text */
--color-border          /* Border color */

/* Spacing */
--spacing-xs through --spacing-2xl

/* Sizing */
--radius-sm, --radius-md, --radius-lg

/* Effects */
--shadow-sm, --shadow-md, --shadow-lg
--transition-fast, --transition-base, --transition-slow
```

### Theme Support
- **Dark Mode** (default) - Professional dark theme
- **Light Mode** - Clean, bright interface
- Toggle theme in Settings > Preferences

## 📊 Data Models

### User Model
```javascript
{
    id: string,
    username: string,
    password: string,
    role: 'Admin' | 'User' | 'Sales',
    name: string,
    email: string,
    phone: string,
    avatar: string,
    preferences: {
        theme: 'light' | 'dark',
        layoutDensity: 'compact' | 'normal' | 'spacious',
        advancedMetrics: boolean
    },
    createdAt: Date,
    lastLogin: Date
}
```

### Task Model
```javascript
{
    id: string,
    title: string,
    description: string,
    status: 'Backlog' | 'To Do' | 'In Progress' | 'Review' | 'Done',
    tag: 'General' | 'Admin' | 'Sales',
    priority: 'low' | 'medium' | 'high',
    ownerRole: 'Admin' | 'User' | 'Sales',
    assignedUser: string,
    createdAt: Date,
    dueDate: Date
}
```

## 🔌 Module Documentation

### state.js
Global state management and data models
- User and task data
- Application state
- LocalStorage utilities
- State queries and mutations

### auth.js
Authentication and permission management
- User login/logout
- Role-based access control
- Task-level permissions
- Feature permissions

### ui-layout.js
Main layout rendering
- Header with user profile
- Responsive sidebar navigation
- Theme management
- Modal and toast systems

### dashboard.js
Dashboard home view
- KPI cards with role-specific metrics
- Chart rendering
- Recent tasks preview
- Analytics visualization

### kanban.js
Advanced Kanban board
- Drag-and-drop functionality
- Task filtering and search
- Modal task creation/editing
- Permission-based UI elements

### settings.js
User settings and preferences
- Profile editing
- Preference management
- Theme selection
- Advanced settings (Admin only)

### app.js
Application orchestrator
- Initialization and bootstrapping
- Global event delegation
- Navigation coordination
- Error handling

## 🛠 Development & Testing

### Console Commands (Development)
Type these in the browser console for debugging:

```javascript
// Get application state
AppDebug.getState()

// Get current user
AppDebug.getCurrentUser()

// Get all users
AppDebug.getUsers()

// Get all tasks
AppDebug.getTasks()

// Get permission summary
AppDebug.getPermissions()

// Quick login
AppDebug.login('admin@example.com', 'admin123')

// Quick logout
AppDebug.logout()

// Export data
AppDebug.exportData()

// Clear all data
AppDebug.clearAll()

// Show all commands
AppDebug.help()
```

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px - Full layout with visible sidebar
- **Tablet**: 768px - 1024px - Optimized layout
- **Mobile**: < 768px - Collapsible sidebar, touch-friendly

## 💾 Data Persistence

All application data is stored in browser's localStorage:
- Current user session
- All tasks and modifications
- User preferences
- Application UI state

Data persists across browser sessions. Clear browser cache to reset.

## 🔐 Security Notes

This is a **frontend demonstration application**:
- Authentication is simulated (no real backend)
- Passwords are not encrypted
- Session is stored in localStorage (not httpOnly)
- For production use, implement proper backend authentication

## 🎯 Best Practices Implemented

- ✅ Semantic HTML5
- ✅ Responsive CSS Grid/Flexbox
- ✅ ES6+ JavaScript (arrow functions, destructuring, template literals)
- ✅ Modular code organization
- ✅ DRY principle (Don't Repeat Yourself)
- ✅ Single Responsibility Principle
- ✅ Clean, readable, well-commented code
- ✅ Progressive enhancement
- ✅ Accessible components
- ✅ Consistent naming conventions

## 🚀 Performance Optimizations

- Minimal DOM manipulation
- Event delegation for efficient event handling
- CSS transitions for smooth animations
- Optimized reflows and repaints
- Efficient array operations and filtering
- No unnecessary re-renders

## 🌍 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 Example Workflows

### Create a New Task (User)
1. Navigate to Kanban board
2. Click "New Task" button
3. Fill in title, description, tag, priority
4. Select status from allowed options
5. Click "Create Task"
6. Task appears on Kanban board

### Assign Task to Column (Admin)
1. Go to Kanban board
2. Click on task to edit
3. Change status to desired column
4. Click "Save Changes"
5. Task moves to new column

### Change Theme
1. Go to Settings
2. Under Preferences > Theme
3. Select "Light" or "Dark"
4. Click "Save Preferences"
5. Theme applies immediately

### Export Data (Admin)
1. Go to Settings
2. Click "Export System Data" button
3. JSON file downloads with all system data
4. Import data for backup or analysis

## 🤝 Support & Debugging

If the application doesn't work:

1. **Clear browser cache**: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
2. **Hard refresh**: Ctrl+F5 (or Cmd+Shift+R on Mac)
3. **Check console**: F12 to open Developer Tools
4. **Reset data**: Use AppDebug.clearAll() in console
5. **Check file structure**: Ensure all files are in correct paths

## 📄 License

This is a demonstration application for learning purposes.

## 🎓 Learning Resources

This project demonstrates:
- Modern HTML5 markup
- Professional CSS architecture
- Vanilla JavaScript best practices
- State management patterns
- Permission/authorization systems
- Responsive design techniques
- Browser APIs (localStorage, drag-drop)
- Event handling and delegation
- Modal and notification patterns

## 👨‍💻 Author Notes

This enterprise dashboard is built to production standards using only:
- ✅ HTML5
- ✅ CSS3
- ✅ Vanilla JavaScript ES6+

No frameworks, no libraries, no build tools - just clean, organized code that demonstrates modern web development practices suitable for enterprise applications.

---

**Ready to explore?** Open `index.html` in your browser and login with one of the demo credentials!
