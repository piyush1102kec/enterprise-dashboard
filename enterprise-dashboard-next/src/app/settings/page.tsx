export default function SettingsPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
                <p className="text-gray-500">Manage your preferences and notifications.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" defaultValue="Alex Morgan"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" defaultValue="alex.morgan@enterprise.io"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <button
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
                    Save Changes
                </button>
            </div>
        </div>
    );
}
